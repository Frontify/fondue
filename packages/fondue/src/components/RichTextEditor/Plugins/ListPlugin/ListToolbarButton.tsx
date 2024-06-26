/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ELEMENT_UL, useListToolbarButton, useListToolbarButtonState } from '@udecode/plate-list';
import { type ReactNode, forwardRef } from 'react';

import { ToolbarButton } from '@components/RichTextEditor/components/Toolbar/ToolbarButton';

export const ListToolbarButton = forwardRef<
    HTMLButtonElement,
    {
        nodeType?: string;
        tooltip?: ReactNode;
        children?: ReactNode;
    }
>(({ nodeType = ELEMENT_UL, tooltip, ...rootProps }, ref) => {
    const state = useListToolbarButtonState({ nodeType });
    const { props } = useListToolbarButton(state);

    return <ToolbarButton tooltip={tooltip} ref={ref} {...props} {...rootProps} />;
});

ListToolbarButton.displayName = 'ListToolbarButton';
