import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { paste, typeText } from '#/testing';

it('types through the helpers', async () => {
    const handle = renderEditor();
    typeText(handle, 'Hello');
    paste(handle, { text: 'World' });

    render(<input aria-label="Search" />);
    await userEvent.type(screen.getByRole('searchbox'), 'query');
});
