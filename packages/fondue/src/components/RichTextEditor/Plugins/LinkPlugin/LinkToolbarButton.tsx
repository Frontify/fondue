/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useLinkToolbarButton, useLinkToolbarButtonState } from '@udecode/plate-link';

import { IconStylingWrapper } from '@components/RichTextEditor/Plugins';
import IconLink16 from '@foundation/Icon/Generated/IconLink16';
import { ToolbarButton } from '@components/RichTextEditor/components/Toolbar/ToolbarButton';
import { ReactNode, forwardRef } from 'react';

export const LinkToolbarButton = forwardRef<HTMLButtonElement, { disabled: boolean; tooltip: ReactNode }>(
    (rootProps, ref) => {
        const state = useLinkToolbarButtonState();
        const { props } = useLinkToolbarButton(state);

        return (
            <ToolbarButton ref={ref} {...props} {...rootProps}>
                <IconStylingWrapper icon={<IconLink16 />} />
            </ToolbarButton>
        );
    },
);

LinkToolbarButton.displayName = 'LinkToolbarButton';
