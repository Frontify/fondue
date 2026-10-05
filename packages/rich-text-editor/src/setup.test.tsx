/* (c) Copyright Frontify Ltd., all rights reserved. */

import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('Vitest setup', () => {
    it('SPEC-rich-text/AC-082 finds an element by data-test-id with a jest-dom matcher', () => {
        render(<p data-test-id="setup-probe">Probe</p>);

        expect(screen.getByTestId('setup-probe')).toBeInTheDocument();
    });

    it('SPEC-rich-text/AC-082 removes what an earlier test rendered', () => {
        expect(screen.queryByTestId('setup-probe')).toBeNull();
    });
});
