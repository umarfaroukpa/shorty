import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import UrlShortener from '../../components/UrlShortener';
import { SessionProvider } from 'next-auth/react';

// Define a complete mock session object
const mockSession = {
    user: {
        id: '1',
        name: 'Test User',
        email: 'test@example.com',
        image: 'https://example.com/test-user.jpg',
    },
    expires: '1',
};

test('shows error message for unauthenticated users after 5 shortens', async () => {
    render(
        <SessionProvider session={null}>
            <UrlShortener />
        </SessionProvider>
    );

    const shortenButton = screen.getByText(/shorten now!/i);

    for (let i = 0; i < 5; i++) {
        fireEvent.click(shortenButton);
    }

    await waitFor(() => {
        // Use a function matcher
        expect(screen.getByText((content, element) => content.includes('please register'))).toBeInTheDocument();
    });
});

test('renders form elements', () => {
    render(
        <SessionProvider session={mockSession}>
            <UrlShortener />
        </SessionProvider>
    );
    expect(screen.getByPlaceholderText(/enter url/i)).toBeInTheDocument();
    expect(screen.getByText(/shorten now!/i)).toBeInTheDocument();
});

test('shows error message for unauthenticated users after 5 shortens (second case)', async () => {
    render(
        <SessionProvider session={null}>
            <UrlShortener />
        </SessionProvider>
    );

    const shortenButton = screen.getByText(/shorten now!/i);

    for (let i = 0; i < 5; i++) {
        fireEvent.click(shortenButton);
    }

    fireEvent.click(shortenButton); // Trigger one more click

    // Use a function matcher
    expect(await screen.findByText((content, element) => content.includes('please register'))).toBeInTheDocument();
});
