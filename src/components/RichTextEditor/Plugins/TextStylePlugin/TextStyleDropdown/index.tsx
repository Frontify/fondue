/* (c) Copyright Frontify Ltd., all rights reserved. */

import { usePlateEditorState } from '@udecode/plate';
import React, { useCallback, useEffect, useState } from 'react';
import { usePopper } from 'react-popper';
import { useRichTextEditorContext } from '../../../context/RichTextEditorContext';
import { TextStyles, textStyleTitle } from '../TextStyles';
import { DropdownItem } from './DropdownItem';
import { DropdownTrigger } from './DropdownTrigger';
import { TextStyleDropdownProps } from './types';

export const TextStyleDropdown = ({ editorId }: TextStyleDropdownProps) => {
    const [triggerElement, setTriggerElement] = useState<HTMLButtonElement | null>(null);
    const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);
    const [open, setOpen] = useState(false);
    const editor = usePlateEditorState(editorId)!;
    const { designTokens } = useRichTextEditorContext();

    const onToggle = useCallback(() => {
        setOpen(!open);
    }, [open, setOpen]);

    const popperInstance = usePopper(triggerElement, popperElement, {
        placement: 'bottom-start',
        strategy: 'absolute',
        modifiers: [
            {
                name: 'offset',
                options: {
                    offset: [0, 5],
                },
            },
            {
                name: 'flip',
                enabled: true,
            },
        ],
    });

    useEffect(() => {
        const listener = (event: Event) => {
            if (open) {
                const target = event.currentTarget as HTMLElement;
                if (popperElement && target.contains(popperElement)) {
                    return;
                }
                if (triggerElement && target.contains(triggerElement)) {
                    return;
                }

                setOpen(false);
            }
        };
        document.body.addEventListener('mousedown', listener);
        return () => {
            document.body.removeEventListener('mousedown', listener);
        };
    }, [open, popperElement, setOpen, triggerElement]);

    return (
        <>
            <DropdownTrigger editor={editor} open={open} onClick={onToggle} ref={setTriggerElement} />
            {open && (
                <div
                    className="tw-divide-y tw-divide-line tw-bg-base tw-shadow-md tw-border tw-border-line tw-z-[1000] tw-overflow-auto tw-min-h-[40px]"
                    ref={setPopperElement}
                    style={popperInstance.styles.popper}
                    {...popperInstance.attributes.popper}
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
