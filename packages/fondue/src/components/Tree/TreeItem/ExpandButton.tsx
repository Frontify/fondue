/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ButtonHTMLAttributes, type DetailedHTMLProps } from 'react';

import { FOCUS_VISIBLE_STYLE } from '@utilities/focusStyle';
import { merge } from '@utilities/merge';

export type ExpandButtonProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
    expanded?: boolean;
    active?: boolean;
};

export const ExpandButton = ({ active, onClick, expanded, disabled, className, ...otherProps }: ExpandButtonProps) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            aria-label="expand item"
            tabIndex={disabled ? -1 : 0}
            data-test-id="tree-item-toggle"
            className={merge([
                'tw-p-1.5 first:tw-ml-2 tw-min-h-[20px] tw-min-w-[20px] tw-h-5 tw-w-5 tw-flex tw-justify-center tw-rounded-sm disabled:tw-invisible',
                active ? 'tw-text-white tw-text-opacity-50' : 'tw-text-line-x-strong',
                FOCUS_VISIBLE_STYLE,
                className,
            ])}
            {...otherProps}
        >
            <div
                className={merge([
                    'tw-transition-transform tw-w-0 tw-h-0 tw-font-normal tw-border-t-4 tw-border-t-transparent tw-border-b-4 tw-border-b-transparent tw-border-l-4 tw-border-l-x-strong',
                    expanded && 'tw-rotate-90',
                ])}
            />
        </button>
    );
};

ExpandButton.displayName = 'FondueExpandButton';
