import React from 'react';
import { render, screen } from '@testing-library/react';
import { fireEvent } from '@testing-library/dom';
import Counter from './Counter';

test('increments counter', () => {
    render(<Counter />);
    const button = screen.getByText(/increment/i);
    fireEvent.click(button);
    expect(screen.getByText(/1/i)).toBeInTheDocument();
});
