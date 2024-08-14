import { calculateDiscount } from './calculateDiscount';

test('calculates discount correctly', () => {
    expect(calculateDiscount(100, 10)).toBe(90);
    expect(calculateDiscount(200, 25)).toBe(150);
});
