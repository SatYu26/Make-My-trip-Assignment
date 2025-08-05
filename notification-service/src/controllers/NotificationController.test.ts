const NotificationController = require('../NotificationController');

test('should send notification successfully', () => {
	const result = NotificationController.sendNotification('test@example.com', 'Hello World');
	expect(result).toBe('Notification sent to test@example.com');
});

test('should fail to send notification with invalid email', () => {
	const result = NotificationController.sendNotification('invalid-email', 'Hello World');
	expect(result).toBe('Invalid email address');
});