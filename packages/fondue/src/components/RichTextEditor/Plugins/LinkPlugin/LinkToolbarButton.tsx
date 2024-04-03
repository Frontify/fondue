/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useEditorRef } from '@udecode/plate-core';
import { useLinkToolbarButton, useLinkToolbarButtonState } from '@udecode/plate-link';
import { focusEditor } from '@udecode/slate-react';
import { type ReactNode, forwardRef } from 'react';

import { IconStylingWrapper } from '@components/RichTextEditor/Plugins';
import { ToolbarButton } from '@components/RichTextEditor/components/Toolbar/ToolbarButton';
import IconLink16 from '@foundation/Icon/Generated/IconLink16';

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
