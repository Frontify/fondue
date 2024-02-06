/* (c) Copyright Frontify Ltd., all rights reserved. */

import { withRef } from '@udecode/cn';
import { useMarkToolbarButton, useMarkToolbarButtonState } from '@udecode/plate';

import { ToolbarButton } from '../../components/Toolbar/ToolbarButton';

export const MarkToolbarButton = withRef<
    typeof ToolbarButton,
    {
        nodeType: string;
        clear?: string | string[];
    }
>(({ clear, nodeType, ...rest }, ref) => {
    const state = useMarkToolbarButtonState({ clear, nodeType });
    const { props } = useMarkToolbarButton(state);

    return <ToolbarButton ref={ref} {...props} {...rest} />;
});
