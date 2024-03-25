/* (c) Copyright Frontify Ltd., all rights reserved. */

import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Tag } from '../Tag';

describe('Tag', () => {
    it('should render', () => {
        const { getByTestId } = render(<Tag>Tag</Tag>);
        expect(getByTestId('fondue-tag')).toBeInTheDocument();
    });
});
