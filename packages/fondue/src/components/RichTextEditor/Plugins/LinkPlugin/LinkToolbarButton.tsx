/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useLinkToolbarButton, useLinkToolbarButtonState } from '@udecode/plate-link';

import { IconStylingWrapper } from '@components/RichTextEditor/Plugins';
import IconLink16 from '@foundation/Icon/Generated/IconLink16';
import { ToolbarButton } from '@components/RichTextEditor/components/Toolbar/ToolbarButton';
import { ReactNode, forwardRef } from 'react';
import { focusEditor } from '@udecode/slate-react';
import { useEditorRef } from '@udecode/plate-core';

export const LinkToolbarButton = forwardRef<HTMLButtonElement, { disabled: boolean; tooltip: ReactNode }>(
    (rootProps, ref) => {
        const editor = useEditorRef();
        const state = useLinkToolbarButtonState();
        const { props } = useLinkToolbarButton(state);

        return (
            <ToolbarButton
                onMouseDown={() => {
                    focusEditor(editor, editor.selection ?? editor.prevSelection ?? undefined);
                }}
                ref={ref}
                {...props}
                {...rootProps}
            >
                <IconStylingWrapper icon={<IconLink16 />} />
            </ToolbarButton>
        );
    },
);

LinkToolbarButton.displayName = 'LinkToolbarButton';
