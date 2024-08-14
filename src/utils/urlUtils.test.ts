import { isValidUrl } from './urlUtils';

test('validates correct URLs', () => {
    expect(isValidUrl('https://www.example.com')).toBe(true);
});

test('invalidates incorrect URLs', () => {
    expect(isValidUrl('not a url')).toBe(false);
});
