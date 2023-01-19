/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { merge } from '@utilities/merge';
import { IconCross } from '@foundation/Icon';

export type DialogHeaderProps = {
    title: string;
    size?: DialogHeaderSize;
    collapseBottom?: boolean;
    close?: boolean;
    onClose?: () => void;
};

export enum DialogHeaderSize {
    Null = 'Null',
    Large = 'Large',
}

export const DialogHeader = ({
    title,
    collapseBottom = false,
    size = DialogHeaderSize.Null,
    close = false,
    onClose,
}: DialogHeaderProps) => {
    return (
        <div
            data-test-id="dialog-header"
            className={merge([
                'tw-px-6 tw-flex tw-items-center',
                size === DialogHeaderSize.Large ? 'tw-py-6' : 'tw-py-4',
                !collapseBottom && 'tw-border-b tw-border-b-line',
            ])}
        >
            <p className={merge(['tw-font-bold', size === DialogHeaderSize.Large ? 'tw-text-md' : 'tw-text-sm'])}>
                {title}
            </p>
            {close && (
                <button onClick={onClose} className="tw-absolute tw-right-12">
                    <IconCross />
                </button>
            )}
        </div>
    );
};
