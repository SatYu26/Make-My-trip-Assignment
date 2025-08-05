const AuthService = require('../AuthService');

test('should authenticate user with valid credentials', () => {
    const user = { username: 'testuser', password: 'testpass' };
    const result = AuthService.authenticate(user);
    expect(result).toBe(true);
});

test('should not authenticate user with invalid credentials', () => {
    const user = { username: 'testuser', password: 'wrongpass' };
    const result = AuthService.authenticate(user);
    expect(result).toBe(false);
});

test('should authorize user with valid token', () => {
    const token = 'validToken';
    const result = AuthService.authorize(token);
    expect(result).toBe(true);
});

test('should not authorize user with invalid token', () => {
    const token = 'invalidToken';
    const result = AuthService.authorize(token);
    expect(result).toBe(false);
});