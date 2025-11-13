/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useMarkToolbarButton, useMarkToolbarButtonState } from '@udecode/plate-utils';
import { type ReactNode, forwardRef } from 'react';

import { ToolbarButton } from '../../components/Toolbar/ToolbarButton';

export const MarkToolbarButton = forwardRef<
    HTMLButtonElement,
    {
        nodeType: string;
        clear?: string | string[];
        children: ReactNode;
        tooltip: ReactNode;
    }
>(({ clear, nodeType, ...rootProps }, ref) => {
    const state = useMarkToolbarButtonState({ clear, nodeType });
    const { props } = useMarkToolbarButton(state);

    return <ToolbarButton ref={ref} {...props} {...rootProps} />;
});

MarkToolbarButton.displayName = 'MarkToolbarButton';
