const BookingService = require('../BookingService');

test('create booking', () => {
	const bookingData = { /* booking details */ };
	const result = BookingService.createBooking(bookingData);
	expect(result).toEqual(expect.objectContaining(bookingData));
});

test('update booking', () => {
	const bookingId = 1;
	const updatedData = { /* updated booking details */ };
	const result = BookingService.updateBooking(bookingId, updatedData);
	expect(result).toEqual(expect.objectContaining(updatedData));
});

test('delete booking', () => {
	const bookingId = 1;
	const result = BookingService.deleteBooking(bookingId);
	expect(result).toBe(true);
});