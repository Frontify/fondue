/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { DropdownItem } from './DropdownItem';
import { DropdownTrigger } from './DropdownTrigger';
import { TextStyleDropdownProps } from './types';
import { useTextStyleDropdown } from './useTextStyleDropdown';
import { DEFAULT_TEXT_STYLE_VALUE } from '../types';

export const TextStyleDropdown = ({ editorId, textStyles = [] }: TextStyleDropdownProps) => {
    const {
        state: { editor, toggle, isOpen },
        dropdownProps,
        triggerRef,
        dropdownRef,
        key,
    } = useTextStyleDropdown(editorId);

    let activeLabel = DEFAULT_TEXT_STYLE_VALUE;
    const textStyle = textStyles.find((style) => style.id === key && style.props?.label);
    if (textStyle) {
        activeLabel = textStyle.props?.label || DEFAULT_TEXT_STYLE_VALUE;
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
                    {textStyles.map((stylePlugin) => (
                        <DropdownItem editor={editor} type={stylePlugin} key={stylePlugin.id}>
                            <span style={stylePlugin.styles ?? {}}>{stylePlugin.props?.label}</span>
                        </DropdownItem>
                    ))}
                </div>
            )}
        </>
    );
};
