import { DiscountController } from '../controllers/DiscountController';
import { jest } from '@jest/globals';

describe('DiscountController', () => {
    let discountController;

    beforeEach(() => {
        discountController = new DiscountController();
    });

    test('should apply discount correctly', () => {
        const originalPrice = 100;
        const discount = 20;
        const expectedPrice = 80;

        const result = discountController.applyDiscount(originalPrice, discount);
        expect(result).toBe(expectedPrice);
    });

    test('should return discount information', () => {
        const discountId = 1;
        const expectedDiscount = { id: 1, amount: 20 };

        const result = discountController.getDiscount(discountId);
        expect(result).toEqual(expectedDiscount);
    });
});