import { AuthService } from './AuthService.js';
import { pool } from '../config/db.js';
import bcrypt from 'bcrypt';
import * as JwtUtil from '../utils/Jwt.js';

jest.mock('../config/db.js', () => ({
    pool: {
        query: jest.fn()
    }
}));

jest.mock('bcrypt', () => ({
    hash: jest.fn(),
    compare: jest.fn()
}));

jest.mock('../utils/Jwt.js', () => ({
    generateToken: jest.fn()
}));

describe('AuthService', () => {
    const testEmail = 'testuser@example.com';
    const testPassword = 'testpassword';
    const testUserId = 42;
    const testToken = 'mocked-token';

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should signup a new user and return token and userId', async () => {
        (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword');
        (pool.query as jest.Mock).mockResolvedValue({ rows: [ { id: testUserId } ] });
        (JwtUtil.generateToken as jest.Mock).mockReturnValue(testToken);

        const { token, userId } = await AuthService.signup(testEmail, testPassword);

        expect(bcrypt.hash).toHaveBeenCalledWith(testPassword, 10);
        expect(pool.query).toHaveBeenCalledWith(
            `INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id`,
            [ testEmail, 'hashedPassword' ]
        );
        expect(JwtUtil.generateToken).toHaveBeenCalledWith(testUserId);
        expect(token).toBe(testToken);
        expect(userId).toBe(testUserId);
    });

    it('should login an existing user and return token and userId', async () => {
        const fakeUser = {
            id: testUserId,
            password: 'hashedPassword'
        };

        (pool.query as jest.Mock).mockResolvedValue({ rows: [ fakeUser ] });
        (bcrypt.compare as jest.Mock).mockResolvedValue(true);
        (JwtUtil.generateToken as jest.Mock).mockReturnValue(testToken);

        const { token, userId } = await AuthService.login(testEmail, testPassword);

        expect(pool.query).toHaveBeenCalledWith(
            `SELECT * FROM users WHERE email = $1`,
            [ testEmail ]
        );
        expect(bcrypt.compare).toHaveBeenCalledWith(testPassword, fakeUser.password);
        expect(JwtUtil.generateToken).toHaveBeenCalledWith(fakeUser.id);
        expect(token).toBe(testToken);
        expect(userId).toBe(testUserId);
    });

    it('should throw error for invalid login', async () => {
        const fakeUser = {
            id: testUserId,
            password: 'hashedPassword'
        };

        (pool.query as jest.Mock).mockResolvedValue({ rows: [ fakeUser ] });
        (bcrypt.compare as jest.Mock).mockResolvedValue(false);

        await expect(AuthService.login(testEmail, 'wrongpassword')).rejects.toThrow('Invalid credentials');
    });

    it('should throw error when user not found during login', async () => {
        (pool.query as jest.Mock).mockResolvedValue({ rows: [] });

        await expect(AuthService.login('ghost@example.com', 'nopass')).rejects.toThrow('User not found');
    });
});
