/* (c) Copyright Frontify Ltd., all rights reserved. */

import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Slider } from '../Slider';

const SLIDER_TEST_ID = 'test-slider';
const SLIDER_TEXT = 'sample slider';

describe('Slider Component', () => {
    it('should render foo text correctly', () => {
        const { getByTestId } = render(<Slider data-test-id={SLIDER_TEST_ID}>{SLIDER_TEXT}</Slider>);
        const component = getByTestId(SLIDER_TEST_ID);
        expect(component).toContain(SLIDER_TEXT);
    });
});
