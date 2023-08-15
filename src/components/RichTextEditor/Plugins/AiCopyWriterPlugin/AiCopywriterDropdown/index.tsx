/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { DropdownItem } from './DropdownItem';
import { AiCopywriterDropdownProps } from './types';
import { useAiCopyWriterDropdown } from './useAiCopyWriterDropdown';

export const AiCopywriterDropdown = ({ editorId, aiCopywriters = [] }: AiCopywriterDropdownProps) => {
    const { editor, dropdownProps, dropdownRef } = useAiCopyWriterDropdown(editorId);

    return (
        <div
            className="tw-divide-y tw-divide-line tw-bg-base tw-shadow-md tw-border tw-border-line tw-z-[1000] tw-overflow-auto tw-min-h-[40px]"
            ref={dropdownRef}
            {...dropdownProps}
        >
            {aiCopywriters.map((aiCopywriter) => (
                <DropdownItem editor={editor} key={aiCopywriter.label} onClick={aiCopywriter.function}>
                    <span>{aiCopywriter.label}</span>
                </DropdownItem>
            ))}
        </div>
    );
};
