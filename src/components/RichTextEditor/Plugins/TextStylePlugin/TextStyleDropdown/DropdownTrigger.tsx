/* eslint-disable react/display-name */
/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { ForwardedRef, forwardRef } from 'react';
import { getPreventDefaultHandler } from '@udecode/plate';
import { IconCaretDown, IconSize } from '@foundation/Icon';
import { merge } from '@utilities/merge';
import { DropdownTriggerProps } from './types';
import { useSelectedTextStyles } from './useSelectedTextStyles';
import { AVAILABLE_STYLE_TITLES, DEFAULT_TEXT_STYLE_VALUE } from '../TextStyles';

export const DropdownTriggerComponent = (
    { editor, open, onClick }: DropdownTriggerProps,
    ref: ForwardedRef<HTMLButtonElement>,
) => {
    const selectedTextStyles = useSelectedTextStyles(editor);

    const label =
        selectedTextStyles.length === 1 ? AVAILABLE_STYLE_TITLES[selectedTextStyles[0]] : DEFAULT_TEXT_STYLE_VALUE;

    return (
        <button
            ref={ref}
            data-test-id="textstyle-dropdown-trigger"
            type="button"
            className="tw-cursor-pointer tw-h-8 tw-w-full"
            onMouseDown={getPreventDefaultHandler(onClick)}
        >
            <div
                className={merge([
                    'tw-relative tw-inline-flex tw-flex-row tw-items-center tw-justify-between tw-overflow-hidden tw-text-text tw-rounded tw-gap-1 tw-px-2 hover:tw-text-box-selected-inverse hover:tw-bg-box-selected tw-h-6 tw-w-28',
                    open && 'tw-text-box-selected-inverse tw-bg-box-selected',
                ])}
            >
                <span className="tw-text-xs tw-truncate">{label}</span>
                <div className={merge(['tw-transition-transform', open && 'tw-rotate-180'])}>
                    <IconCaretDown size={IconSize.Size12} />
                </div>
            </div>
        </button>
    );
};

export const DropdownTrigger = forwardRef(DropdownTriggerComponent);
