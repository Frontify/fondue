/* eslint-disable react/display-name */
/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ForwardedRef, forwardRef } from 'react';
import IconCaretDown12 from '@foundation/Icon/Generated/IconCaretDown12';
import { merge } from '@utilities/merge';
import { DropdownTriggerProps } from './types';

export const DropdownTriggerComponent = (
    { label, open, onClick }: DropdownTriggerProps,
    ref: ForwardedRef<HTMLButtonElement>,
) => (
    <button
        ref={ref}
        data-test-id="textstyle-dropdown-trigger"
        type="button"
        className="tw-cursor-pointer tw-h-8 tw-w-full"
        onMouseDown={(event) => {
            event.preventDefault();
            event.stopPropagation();
            onClick();
        }}
    >
        <div
            className={merge([
                'tw-relative tw-inline-flex tw-flex-row tw-items-center tw-justify-between tw-overflow-hidden tw-text-text tw-rounded tw-gap-1 tw-px-2 hover:tw-text-box-selected-inverse hover:tw-bg-box-selected tw-h-6 tw-w-28',
                open && 'tw-text-box-selected-inverse tw-bg-box-selected',
            ])}
        >
            <span className="tw-text-xs tw-truncate">{label}</span>
            <div className={merge(['tw-transition-transform', open && 'tw-rotate-180'])}>
                <IconCaretDown12 />
            </div>
        </div>
    </button>
);

export const DropdownTrigger = forwardRef(DropdownTriggerComponent);
