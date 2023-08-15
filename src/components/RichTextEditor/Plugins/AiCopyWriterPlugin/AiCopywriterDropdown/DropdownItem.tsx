/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { DropdownItemProps } from './types';

export const DropdownItem = ({ editor, children, onClick }: DropdownItemProps) => {
    return (
        <button
            data-test-id="ai-copywriter-option"
            type="button"
            className="tw-block tw-w-full tw-text-left tw-px-3 tw-py-2 tw-outline-none tw-cursor-pointer tw-truncate hover:tw-bg-box-neutral-hover hover:w-text-box-neutral-inverse-hover tw-max-h-20 tw-max-w-[15rem] tw-min-h-[2.25rem]"
            onClick={() => {
                onClick && onClick(editor);
            }}
        >
            {children}
        </button>
    );
};
