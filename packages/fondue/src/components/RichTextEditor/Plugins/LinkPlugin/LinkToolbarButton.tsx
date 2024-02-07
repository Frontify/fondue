/* (c) Copyright Frontify Ltd., all rights reserved. */

import { withRef } from '@udecode/cn';
import { useLinkToolbarButton, useLinkToolbarButtonState } from '@udecode/plate';

import { IconStylingWrapper } from '@components/RichTextEditor/Plugins';
import IconLink16 from '@foundation/Icon/Generated/IconLink16';
import { ToolbarButton } from '@components/RichTextEditor/components/Toolbar/ToolbarButton';

export const LinkToolbarButton = withRef<typeof ToolbarButton>((rest, ref) => {
    const state = useLinkToolbarButtonState();
    const { props } = useLinkToolbarButton(state);

    return (
        <ToolbarButton ref={ref} {...props} {...rest}>
            <IconStylingWrapper icon={<IconLink16 />} />
        </ToolbarButton>
    );
});
