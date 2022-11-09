/* (c) Copyright Frontify Ltd., all rights reserved. */

import { usePlateEditorState } from '@udecode/plate';
import React, { useState } from 'react';
import { useRichTextEditorContext } from '../../../context/RichTextEditorContext';
import { TextStyles, textStyleTitle } from '../TextStyles';
import { DropdownItem } from './DropdownItem';
import { DropdownTrigger } from './DropdownTrigger';
import { TextStyleDropdownProps } from './types';
import { usePopperDropdown } from './usePopperDropdown';

export const TextStyleDropdown = ({ editorId }: TextStyleDropdownProps) => {
    const [triggerElement, setTriggerElement] = useState<HTMLButtonElement | null>(null);
    const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);
    const editor = usePlateEditorState(editorId)!;
    const { designTokens } = useRichTextEditorContext();

    const { state, positioningProps } = usePopperDropdown(triggerElement, popperElement);

    return (
        <>
            <DropdownTrigger editor={editor} open={state.isOpen} onClick={state.toggle} ref={setTriggerElement} />
            {state.isOpen && (
                <div
                    className="tw-divide-y tw-divide-line tw-bg-base tw-shadow-md tw-border tw-border-line tw-z-[1000] tw-overflow-auto tw-min-h-[40px]"
                    ref={(node) => {
                        console.log(node);
                        setPopperElement(node);
                    }}
                    {...positioningProps}
                >
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
                    <DropdownItem editor={editor} type={TextStyles.ELEMENT_QUOTE}>
                        <span style={designTokens.quote}>{textStyleTitle[TextStyles.ELEMENT_QUOTE]}</span>
                    </DropdownItem>
                    <DropdownItem editor={editor} type={TextStyles.ELEMENT_PARAGRAPH}>
                        <span style={designTokens.p}>{textStyleTitle[TextStyles.ELEMENT_PARAGRAPH]}</span>
                    </DropdownItem>
                </div>
            )}
        </>
    );
};
