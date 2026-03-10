import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import AppointmentsPage from '@/features/appointments/ui/appointments-page';
import { renderWithProviders } from '@/shared/lib/testing/render-with-providers';

describe('AppointmentsPage integration', () => {
  it('adds appointment cards when user clicks new appointment', async () => {
    const user = userEvent.setup();
    renderWithProviders(<AppointmentsPage />);

    const addButton = screen.getByRole('button', { name: 'New appointment' });

    await user.click(addButton);
    expect(screen.getAllByLabelText('Start date')).toHaveLength(1);

    await user.click(addButton);
    expect(screen.getAllByLabelText('Start date')).toHaveLength(2);
  });
});
