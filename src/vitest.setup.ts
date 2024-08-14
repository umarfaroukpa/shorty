import '@testing-library/jest-dom';
import { vi, Mock } from 'vitest'; // Import necessary types

// Define the global jest object with proper typings
(global as any).jest = {
    fn: vi.fn,
    spyOn: vi.spyOn,
    clearAllMocks: vi.clearAllMocks,
    resetAllMocks: vi.resetAllMocks,
    restoreAllMocks: vi.restoreAllMocks,
    autoMockOff: vi.fn,
    autoMockOn: vi.fn,
    createMockFromModule: vi.fn,
    getSeed: vi.fn,
    isMockFunction: vi.fn,
    genMockFromModule: vi.fn,
    resetModules: vi.fn,
    setMock: vi.fn,
    unmock: vi.fn,
    useFakeTimers: vi.useFakeTimers,
    useRealTimers: vi.useRealTimers,
    runAllTicks: vi.fn,
    runAllTimers: vi.runAllTimers,
    runOnlyPendingTimers: vi.runOnlyPendingTimers,
    advanceTimersByTime: vi.advanceTimersByTime,
    clearAllTimers: vi.clearAllTimers,
    getTimerCount: vi.fn,
    now: vi.fn,
    setTimeout: vi.fn,
    getMockImplementation: vi.fn,
    getMockName: vi.fn,
    advanceTimersToNextTimer: vi.fn,
};

declare global {
    namespace jest {
        interface Mock<T = any, Y extends any[] = any, C = any> extends Mock<T, Y, C> { }
    }
}
