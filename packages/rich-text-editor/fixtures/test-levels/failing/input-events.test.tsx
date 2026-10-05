import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

it('types at the surface', async () => {
    const { container } = render(<Editor />);
    const surface = screen.getByRole('textbox');
    const editable = container.querySelector('[contenteditable]');
    const user = userEvent.setup();

    await userEvent.type(surface, 'Hello');
    await user.type(editable, 'Hello');
    await userEvent.keyboard('{Enter}');
    fireEvent.input(screen.getByRole('textbox'), { data: 'a' });
    fireEvent.paste(editable, { clipboardData: {} });
});
