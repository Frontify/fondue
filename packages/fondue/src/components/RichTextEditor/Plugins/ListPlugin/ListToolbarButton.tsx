/* (c) Copyright Frontify Ltd., all rights reserved. */

import { withRef } from '@udecode/cn';
import { ELEMENT_UL, useListToolbarButton, useListToolbarButtonState } from '@udecode/plate';

import { ToolbarButton } from '@components/RichTextEditor/components/Toolbar/ToolbarButton';

export const ListToolbarButton = withRef<
    typeof ToolbarButton,
    {
        nodeType?: string;
    }
>(({ nodeType = ELEMENT_UL, tooltip, ...rest }, ref) => {
    const state = useListToolbarButtonState({ nodeType });
    const { props } = useListToolbarButton(state);

    return <ToolbarButton tooltip={tooltip} ref={ref} {...props} {...rest} />;
});
