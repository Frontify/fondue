/* (c) Copyright Frontify Ltd., all rights reserved. */

import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Divider } from '../Divider';

const DEFAULT_COLOR_HEX = '#CCC';
const COLOR_HEX = '#4065AE';
const DIVIDER_SELECTOR = 'fondue-divider';
const DIVIDER_LINE_SELECTOR = 'fondue-divider-line';

describe('Divider component', () => {
    it('should loads and displays divider', () => {
        const { getByTestId } = render(<Divider />);
        const divider = getByTestId(DIVIDER_LINE_SELECTOR);

        expect(divider).toHaveStyle({ borderTopColor: DEFAULT_COLOR_HEX });
    });
    it('should have correct color', () => {
        const { getByTestId } = render(<Divider color={COLOR_HEX} />);
        const divider = getByTestId(DIVIDER_LINE_SELECTOR);

        expect(divider).toHaveStyle({ borderTopColor: COLOR_HEX });
    });
    it('should allow for the height to be set to Small', () => {
        const { getByTestId } = render(<Divider height={"small"} />);
        const divider = getByTestId(DIVIDER_SELECTOR);

        expect(divider).toHaveStyle({ height: 36 });
    });

    it('should allow for the height to be set to Medium', () => {
        const { getByTestId } = render(<Divider height={"medium"} />);
        const divider = getByTestId(DIVIDER_SELECTOR);

        expect(divider).toHaveStyle({ height: 60 });
    });

    it('should allow for the height to be set to Large', () => {
        const { getByTestId } = render(<Divider height={"large"} />);
        const divider = getByTestId(DIVIDER_SELECTOR);

        expect(divider).toHaveStyle({ height: 96 });
    });

    it('should allow for the divider border style to be dashed', () => {
        const { getByTestId } = render(<Divider style="dashed" />);
        const divider = getByTestId(DIVIDER_LINE_SELECTOR);

        expect(divider).toHaveClass('tw-border-dashed');
    });

    it('should allow for the divider to have no border', () => {
        const { getByTestId } = render(<Divider style="noline" />);
        const divider = getByTestId(DIVIDER_LINE_SELECTOR);

        expect(divider).toHaveClass('tw-border-none');
    });

    it('should allow for the divider to have solid border', () => {
        const { getByTestId } = render(<Divider style="solid" />);
        const divider = getByTestId(DIVIDER_LINE_SELECTOR);

        expect(divider).toHaveClass('tw-border-solid');
    });

    it('should allow for the divider to have dotted border', () => {
        const { getByTestId } = render(<Divider style="dotted" />);
        const divider = getByTestId(DIVIDER_LINE_SELECTOR);

        expect(divider).toHaveClass('tw-border-dotted');
    });

    it('should allow for the divider to be vertical', () => {
        const { getByTestId } = render(<Divider vertical={true} />);
        const divider = getByTestId(DIVIDER_LINE_SELECTOR);

        expect(divider).toHaveClass('tw-border-r');
    });

    it('should allow for the divider to have a custom test-id', () => {
        const { getByTestId } = render(<Divider data-test-id="custom-divider-test-id" />);
        const divider = getByTestId('custom-divider-test-id');

        expect(divider);
    });
});
