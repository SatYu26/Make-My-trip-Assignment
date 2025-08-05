const assert = require('assert');

describe('SeatService', () => {
    it('should check seat availability', () => {
        const seatService = new SeatService();
        const availability = seatService.checkAvailability('A1');
        assert.strictEqual(availability, true);
    });

    it('should book a seat', () => {
        const seatService = new SeatService();
        const bookingResult = seatService.bookSeat('A1');
        assert.strictEqual(bookingResult.success, true);
        assert.strictEqual(bookingResult.seatNumber, 'A1');
    });
});