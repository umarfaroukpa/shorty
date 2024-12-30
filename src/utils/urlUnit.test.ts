// urlUnit.test.ts
import { someUtilityFunction } from './urlUnit';

test('returns correct output for valid input', () => {
    expect(someUtilityFunction('input')).toBe('Processed: input');
});

test('throws error for invalid input', () => {
    expect(() => someUtilityFunction(null)).toThrow('Invalid input');
});
