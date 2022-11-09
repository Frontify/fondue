/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ToolbarDropdown, usePlateEditorState } from '@udecode/plate';
import React, { useCallback, useState } from 'react';
import { useRichTextEditorContext } from '../../../context/RichTextEditorContext';
import { defaultSelectableStyles } from '../defaultSelectableStyles';
import { TextStyles, textStyleTitle } from '../TextStyles';
import { DropdownItem } from './DropdownItem';
import { DropdownTrigger } from './DropdownTrigger';
import { TextStyleDropdownProps } from './types';

export const TextStyleDropdown = ({ editorId, selectableStyles = defaultSelectableStyles }: TextStyleDropdownProps) => {
    const [open, setOpen] = useState(false);
    const editor = usePlateEditorState(editorId)!;
    const { designTokens } = useRichTextEditorContext();

    const onToggle = useCallback(() => {
        setOpen(!open);
    }, [open, setOpen]);

    return (
        <ToolbarDropdown
            control={<DropdownTrigger editor={editor} open={open} />}
            open={open}
            onOpen={onToggle}
            onClose={onToggle}
        >
            <div className="tw-divide-y tw-divide-line">
                {[...selectableStyles, TextStyles.ELEMENT_PARAGRAPH].map((style) => (
                    <DropdownItem editor={editor} type={style} key={style}>
                        <span style={designTokens[style]}>{textStyleTitle[style]}</span>
                    </DropdownItem>
                ))}
            </div>
        </ToolbarDropdown>
    );
};
