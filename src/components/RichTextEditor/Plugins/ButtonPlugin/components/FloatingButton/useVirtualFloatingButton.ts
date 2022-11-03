import { UseVirtualFloatingOptions, flip, offset, useVirtualFloating } from '@udecode/plate-floating';
import { floatingButtonActions } from './floatingButtonStore';

export const useVirtualFloatingButton = (floatingOptions?: UseVirtualFloatingOptions) => {
    return useVirtualFloating({
        placement: 'bottom-start',
        onOpenChange: floatingButtonActions.open,
        middleware: [
            offset(12),
            flip({
                padding: 96,
            }),
        ],
        ...floatingOptions,
    });
};
