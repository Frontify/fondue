/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ToolbarDropdown, usePlateEditorState } from '@udecode/plate';
import React, { useCallback, useState } from 'react';
import { useRichTextEditorContext } from '../../../../context/RichTextEditorContext';
import { TextStyles, textStyleTitle } from '../TextStyles';
import { DropdownItem } from './DropdownItem';
import { DropdownTrigger } from './DropdownTrigger';
import { TextStyleDropdownProps } from './types';

export const TextStyleDropdown = ({ editorId }: TextStyleDropdownProps) => {
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
                <DropdownItem editor={editor} type={TextStyles.ELEMENT_HEADING1}>
                    <span style={designTokens.heading1}>{textStyleTitle[TextStyles.ELEMENT_HEADING1]}</span>
                </DropdownItem>
                <DropdownItem editor={editor} type={TextStyles.ELEMENT_HEADING2}>
                    <span style={designTokens.heading2}>{textStyleTitle[TextStyles.ELEMENT_HEADING2]}</span>
                </DropdownItem>
                <DropdownItem editor={editor} type={TextStyles.ELEMENT_HEADING3}>
                    <span style={designTokens.heading3}>{textStyleTitle[TextStyles.ELEMENT_HEADING3]}</span>
                </DropdownItem>
                <DropdownItem editor={editor} type={TextStyles.ELEMENT_HEADING4}>
                    <span style={designTokens.heading4}>{textStyleTitle[TextStyles.ELEMENT_HEADING4]}</span>
                </DropdownItem>
                <DropdownItem editor={editor} type={TextStyles.ELEMENT_CUSTOM1}>
                    <span style={designTokens.custom1}>{textStyleTitle[TextStyles.ELEMENT_CUSTOM1]}</span>
                </DropdownItem>
                <DropdownItem editor={editor} type={TextStyles.ELEMENT_CUSTOM2}>
                    <span style={designTokens.custom2}>{textStyleTitle[TextStyles.ELEMENT_CUSTOM2]}</span>
                </DropdownItem>
                <DropdownItem editor={editor} type={TextStyles.ELEMENT_CUSTOM3}>
                    <span style={designTokens.custom3}>{textStyleTitle[TextStyles.ELEMENT_CUSTOM3]}</span>
                </DropdownItem>
                <DropdownItem editor={editor} type={TextStyles.ELEMENT_PARAGRAPH}>
                    <span>{textStyleTitle[TextStyles.ELEMENT_PARAGRAPH]}</span>
                </DropdownItem>
            </div>
        </ToolbarDropdown>
    );
};
