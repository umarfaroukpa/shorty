import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { SessionProvider } from 'next-auth/react';
import Plan from '../../components/plan';  // Make sure this path is correct

test('renders pricing plans', () => {
    render(
        <SessionProvider session={null}>
            <Plan />
        </SessionProvider>
    );
    expect(screen.getByText(/pro/i)).toBeInTheDocument();
    expect(screen.getByText(/bulk 100k/i)).toBeInTheDocument();
    expect(screen.getByText(/enterprise/i)).toBeInTheDocument();
});

test('toggles billing cycle', () => {
    render(
        <SessionProvider session={null}>
            <Plan />
        </SessionProvider>
    );
    const monthlyButton = screen.getByText(/monthly/i);
    const annualButton = screen.getByText(/annual/i);
    fireEvent.click(annualButton);
    expect(screen.getByText(/\$8.99/i)).toBeInTheDocument();
    fireEvent.click(monthlyButton);
    expect(screen.getByText(/\$9.99/i)).toBeInTheDocument();
});
