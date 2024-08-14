import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import mockRouter from 'next-router-mock';
import LoginForm from '../../components/LoginForm';
import { vi } from 'vitest';

// Create a mock router
const createMockRouter = (router) => ({
    ...router,
    push: vi.fn(),
    prefetch: vi.fn(() => Promise.resolve()),
    replace: vi.fn(),
    route: '/',
    pathname: '/',
    query: {},
    asPath: '/',
    basePath: '',
    events: {
        on: vi.fn(),
        off: vi.fn(),
        emit: vi.fn(),
    },
    isFallback: false,
});

test('renders login form', () => {
    const router = createMockRouter(mockRouter);
    render(
        <RouterContext.Provider value={router}>
            <LoginForm onSwitchToSignup={() => { }} />
        </RouterContext.Provider>
    );
    expect(screen.getByText(/login/i)).toBeInTheDocument();
});

test('shows login fields when login button is clicked', () => {
    const router = createMockRouter(mockRouter);
    render(
        <RouterContext.Provider value={router}>
            <LoginForm onSwitchToSignup={() => { }} />
        </RouterContext.Provider>
    );
    fireEvent.click(screen.getByText(/login/i));
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
});
