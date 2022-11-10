/* (c) Copyright Frontify Ltd., all rights reserved. */

import { usePlateEditorState } from '@udecode/plate';
import React, { useState } from 'react';
import { useRichTextEditorContext } from '../../../context/RichTextEditorContext';
import { defaultTextStyles } from '../TextStyles/defaultTextStyles';
import { textStyleTitle } from '../TextStyles';
import { DropdownItem } from './DropdownItem';
import { DropdownTrigger } from './DropdownTrigger';
import { TextStyleDropdownProps } from './types';
import { DesignTokens } from '@components/RichTextEditor/types';
import { useTextStyleDropdown } from './useTextStyleDropdown';

export const TextStyleDropdown = ({ editorId, textStyles = defaultTextStyles }: TextStyleDropdownProps) => {
    const [triggerElement, setTriggerElement] = useState<HTMLButtonElement | null>(null);
    const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);
    const editor = usePlateEditorState(editorId)!;
    const { designTokens } = useRichTextEditorContext();

    const { state, dropdownProps, dropdownOptions } = useTextStyleDropdown(triggerElement, popperElement, textStyles);

    return (
        <>
            <DropdownTrigger editor={editor} open={state.isOpen} onClick={state.toggle} ref={setTriggerElement} />
            {state.isOpen && (
                <div
                    className="tw-divide-y tw-divide-line tw-bg-base tw-shadow-md tw-border tw-border-line tw-z-[1000] tw-overflow-auto tw-min-h-[40px]"
                    ref={setPopperElement}
                    {...dropdownProps}
                >
                    {dropdownOptions.map((style) => (
                        <DropdownItem editor={editor} type={style} key={style}>
                            <span style={designTokens[style as keyof DesignTokens]}>{textStyleTitle[style]}</span>
                        </DropdownItem>
                    ))}
                </div>
            )}
        </>
    );
};
