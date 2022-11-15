/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { useRichTextEditorContext } from '../../../context/RichTextEditorContext';
import { defaultTextStyles } from '../TextStyles/defaultTextStyles';
import { textStyleTitle } from '../TextStyles';
import { DropdownItem } from './DropdownItem';
import { DropdownTrigger } from './DropdownTrigger';
import { TextStyleDropdownProps } from './types';
import { DesignTokens } from '@components/RichTextEditor/types';
import { useTextStyleDropdown } from './useTextStyleDropdown';

export const TextStyleDropdown = ({ editorId, textStyles = defaultTextStyles }: TextStyleDropdownProps) => {
    const { designTokens } = useRichTextEditorContext();
    const { state, dropdownProps, triggerRef, dropdownRef } = useTextStyleDropdown(editorId);
    const { editor, toggle, isOpen } = state;

    return (
        <>
            <DropdownTrigger editor={editor} open={isOpen} onClick={toggle} ref={triggerRef} />
            {isOpen && (
                <div
                    className="tw-divide-y tw-divide-line tw-bg-base tw-shadow-md tw-border tw-border-line tw-z-[1000] tw-overflow-auto tw-min-h-[40px]"
                    ref={dropdownRef}
                    {...dropdownProps}
                >
                    {textStyles.map((style) => (
                        <DropdownItem editor={editor} type={style} key={style}>
                            <span style={designTokens[style as keyof DesignTokens]}>{textStyleTitle[style]}</span>
                        </DropdownItem>
                    ))}
                </div>
            )}
        </>
    );
};
