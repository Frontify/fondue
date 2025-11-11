/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useEditorRef } from '@udecode/plate-core';
import { useLinkToolbarButton, useLinkToolbarButtonState } from '@udecode/plate-link';
import { focusEditor } from '@udecode/slate-react';
import { type ReactNode, forwardRef } from 'react';

import { ToolbarButton } from '@components/RichTextEditor/components/Toolbar/ToolbarButton';
import IconLink16 from '@foundation/Icon/Generated/IconLink16';

import { IconStylingWrapper } from '../helper';

export const LinkToolbarButton = forwardRef<HTMLButtonElement, { disabled: boolean; tooltip: ReactNode }>(
    (rootProps, ref) => {
        const editor = useEditorRef();
        const state = useLinkToolbarButtonState();
        const { props } = useLinkToolbarButton(state);

        return (
            <ToolbarButton
                onMouseDown={(event) => {
                    event.preventDefault();
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
