/* (c) Copyright Frontify Ltd., all rights reserved. */

import { getVerticalPositioning } from '@components/Flyout/helpers/getVerticalPositioning';
import { Modifier } from 'react-popper';

const OFFSET = 6;
const VIEWPORT_PADDING = 10;

export const verticalPositionModifier: Partial<Modifier<'vertical-positioning'>> = {
    name: 'vertical-positioning',
    phase: 'read',
    fn: ({ state, name }) => {
        if (state.modifiersData[name]._skip) {
            return;
        }
        const { position, maxHeight } = getVerticalPositioning(
            { current: state.elements.reference as HTMLElement },
            state.rects.popper.height,
            OFFSET + VIEWPORT_PADDING,
            0,
        );
        if (position === 'top') {
            state.placement = 'top-start';
        }
        state.styles.popper = { maxHeight: `${maxHeight}px` };
        state.reset = true;
        state.modifiersData[name]._skip = true;
    },
    enabled: true,
};
