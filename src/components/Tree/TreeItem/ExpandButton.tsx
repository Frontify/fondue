/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { MouseEvent } from 'react';

import { merge } from '@utilities/merge';
import { FOCUS_VISIBLE_STYLE } from '@utilities/focusStyle';

export type ExpandButtonProps = {
    onClick?: (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void;
    expanded?: boolean;
    disabled?: boolean;
};

export const ExpandButton = ({ onClick, expanded, disabled }: ExpandButtonProps) => {
    return (
        <button
            tabIndex={0}
            disabled={disabled}
            onClick={onClick}
            data-test-id="tree-item-toggle"
            className={`tw-p-1.5 first:tw-ml-2 tw-min-h-[20px] tw-min-w-[20px] tw-h-5 tw-w-5 tw-text-text disabled:tw-text-[var(--text-color-weak)] disabled:tw-opacity-40 tw-flex tw-justify-center tw-rounded-sm ${FOCUS_VISIBLE_STYLE}`}
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
