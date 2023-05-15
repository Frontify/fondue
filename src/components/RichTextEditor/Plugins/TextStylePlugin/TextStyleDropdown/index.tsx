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
        key,
    } = useTextStyleDropdown(editorId);

    let activeLabel = 'Mixed';
    for (const style of textStyles) {
        if (style.id === key && style.props?.label) {
            activeLabel = style.props?.label;
        }
    }

    return (
        <>
            <DropdownTrigger label={activeLabel} open={isOpen} onClick={toggle} ref={triggerRef} />
            {isOpen && (
                <div
                    className="tw-divide-y tw-divide-line tw-bg-base tw-shadow-md tw-border tw-border-line tw-z-[1000] tw-overflow-auto tw-min-h-[40px]"
                    ref={dropdownRef}
                    {...dropdownProps}
                >
                    {textStyles.map((style) => (
                        <DropdownItem editor={editor} type={style} key={style.id}>
                            <span style={getTextStyleCssProperties(style.id)}>{style.props?.label}</span>
                        </DropdownItem>
                    ))}
                </div>
            )}
        </>
    );
};
