import { UseVirtualFloatingOptions, flip, offset, useVirtualFloating } from '@udecode/plate-floating';

export const useVirtualFloatingButton = (floatingOptions?: UseVirtualFloatingOptions) => {
    return useVirtualFloating({
        placement: 'bottom-start',
        middleware: [
            offset(12),
            flip({
                padding: 96,
            }),
        ],
        ...floatingOptions,
    });
};
