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

test('renders form elements and allows shortening', async () => {
    render(
        <SessionProvider session={mockSession}>
            <UrlShortener />
        </SessionProvider>
    );

    // Check if input field and button are present
    const urlInput = screen.getByPlaceholderText(/enter url/i) as HTMLInputElement;
    const shortenButton = screen.getByText(/shorten now!/i);

    // Simulate entering a valid URL
    fireEvent.change(urlInput, { target: { value: 'https://example.com' } });
    expect(urlInput.value).toBe('https://example.com');

    // Simulate clicking the shorten button
    fireEvent.click(shortenButton);

    await waitFor(() => {
        expect(screen.getByText(/your link is ready/i)).toBeInTheDocument();
    });
});
