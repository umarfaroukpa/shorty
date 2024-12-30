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
            <LoginForm onSwitchToSignup={() => { }} activeForm='Login' />
        </RouterContext.Provider>
    );

    // Target the heading element specifically using role 'heading'
    expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();

    // Target the login button specifically using role 'button'
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
});

test('shows login fields when login button is clicked', () => {
    const router = createMockRouter(mockRouter);
    render(
        <RouterContext.Provider value={router}>
            <LoginForm onSwitchToSignup={() => { }} activeForm='Login' />
        </RouterContext.Provider>
    );

    // Click on the login button by targeting it specifically
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    // Ensure the email and password fields appear after clicking the login button
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
});
