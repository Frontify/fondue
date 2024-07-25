/* (c) Copyright Frontify Ltd., all rights reserved. */

import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { ColorPicker } from '../moveToWebApp/ColorChooser';

const COLOR_PICKER_TEST_ID = 'test-color-picker';
const COLOR_PICKER_TEXT = 'sample color-picker';

describe('ColorPicker Component', () => {
    it('should render foo text correctly', () => {
        const { getByTestId } = render(
            <ColorPicker data-test-id={COLOR_PICKER_TEST_ID}>{COLOR_PICKER_TEXT}</ColorPicker>,
        );
        const component = getByTestId(COLOR_PICKER_TEST_ID);
        expect(component).toContain(COLOR_PICKER_TEXT);
    });
});
