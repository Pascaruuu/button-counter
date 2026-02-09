import { render, screen, fireEvent } from '@testing-library/svelte';
import { describe, it, expect, vi } from 'vitest';
import Page from '../../src/routes/+page.svelte';

// 1. Mock the SvelteKit specific imports
vi.mock('$app/forms', () => ({
    enhance: vi.fn(() => ({
        destroy: () => {}
    }))
}));

// Mock the Odometer component if it has complex internals, 
// or let it render if it's simple.
vi.mock('$lib/components/Odometer.svelte', () => ({
    default: ({ value }: { value: number }) => `<div data-testid="odometer">${value}</div>`
}));

describe('Counter Page Integration', () => {
    const mockData = {
        count: {
            counter: 10,
            last_clicked: '2026-02-09T10:30:00'
        }
    };

    it('displays the initial count and formatted timestamp', () => {
        render(Page, { data: mockData });

        // Check Odometer (mocked)
        expect(screen.getByTestId('odometer').textContent).toBe('10');
        
        // Check Timestamp (Formatted by your function)
        // Note: The specific string depends on your local timezone
        expect(screen.getByText(/Last clicked:/)).toBeTruthy();
    });

    it('updates the counter optimistically when button is clicked', async () => {
        const { component } = render(Page, { data: mockData });

        const button = screen.getByRole('button', { name: /click me/i });
        
        // Simulate click
        await fireEvent.click(button);

        // Verify optimistic update: 10 + 1 = 11
        // (This tests that your use:enhance logic actually incremented data.count.counter)
        expect(screen.getByTestId('odometer').textContent).toBe('11');
    });
});