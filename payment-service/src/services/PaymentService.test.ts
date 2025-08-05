const PaymentService = require('./PaymentService');
const assert = require('assert');

test('should process payment successfully', async () => {
	const result = await PaymentService.processPayment({ amount: 100, currency: 'USD' });
	assert.strictEqual(result.status, 'success');
});

test('should handle payment processing error', async () => {
	try {
		await PaymentService.processPayment({ amount: -100, currency: 'USD' });
	} catch (error) {
		assert.strictEqual(error.message, 'Invalid payment amount');
	}
});