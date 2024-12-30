export const createMockRouter = (router) => ({
    ...router,
    push: jest.fn(),
    prefetch: jest.fn(() => Promise.resolve()),
    replace: jest.fn(),
    //... other properties
});
