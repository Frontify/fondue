import { render, screen } from '@testing-library/react';
import typist from '@testing-library/user-event';
import { userEvent as ue } from '@testing-library/user-event';

let user: ReturnType<typeof ue.setup>;
let typer: ReturnType<typeof typist.setup>;

beforeEach(() => {
    user = ue.setup();
    typer = typist.setup();
});

it('types at the surface through assigned and aliased instances', async () => {
    render(<Editor />);
    const surface = screen.getByRole('textbox');

    await user.type(surface, 'Hello');
    await typer.keyboard('{Enter}');
    await ue.type(surface, 'World');
    await typist.type(surface, '!');
});
