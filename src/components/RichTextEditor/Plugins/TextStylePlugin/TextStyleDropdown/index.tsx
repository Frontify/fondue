/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { DropdownItem } from './DropdownItem';
import { DropdownTrigger } from './DropdownTrigger';
import { TextStyleDropdownProps } from './types';
import { useTextStyleDropdown } from './useTextStyleDropdown';
import { getTextStyleCssProperties } from '../../helper';

export const TextStyleDropdown = ({ editorId, textStyles = [] }: TextStyleDropdownProps) => {
    const {
        state: { editor, toggle, isOpen },
        dropdownProps,
        triggerRef,
        dropdownRef,
        label,
    } = useTextStyleDropdown(editorId);

    return (
        <>
            <DropdownTrigger label={label} open={isOpen} onClick={toggle} ref={triggerRef} />
            {isOpen && (
                <div
                    className="tw-divide-y tw-divide-line tw-bg-base tw-shadow-md tw-border tw-border-line tw-z-[1000] tw-overflow-auto tw-min-h-[40px]"
                    ref={dropdownRef}
                    {...dropdownProps}
                >
                    {textStyles.map((style) => (
                        <DropdownItem editor={editor} type={style} key={style.id}>
                            <span style={getTextStyleCssProperties(style.id)}>{style.id}</span>
                        </DropdownItem>
                    ))}
                </div>
            )}
        </>
    );
};
