import { UseVirtualFloatingOptions, flip, offset, useVirtualFloating } from '@udecode/plate-floating';

const OFFSET = 12;
const PADDING = 96;

export const useVirtualFloatingButton = (floatingOptions?: UseVirtualFloatingOptions) =>
    useVirtualFloating({
        placement: 'bottom-start',
        middleware: [
            offset(OFFSET),
            flip({
                padding: PADDING,
            }),
        ],
        ...floatingOptions,
    });
