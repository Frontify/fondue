/* (c) Copyright Frontify Ltd., all rights reserved. */

import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('the Vitest setup', () => {
    it('finds an element by data-test-id and matches it with a jest-dom matcher', () => {
        render(<p data-test-id="setup-probe">rendered</p>);

        expect(screen.getByTestId('setup-probe')).toBeInTheDocument();
    });

    it('has removed the element an earlier test rendered', () => {
        expect(screen.queryByTestId('setup-probe')).not.toBeInTheDocument();
    });
});
