/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { ReactElement } from 'react';
import { merge } from '@utilities/merge';
import { IconCross } from '@foundation/Icon/Generated';
import { Text } from '@typography/Text';

export type DialogHeaderProps = {
    title: string;
    size?: DialogHeaderSize;
    collapseBottom?: boolean;
    close?: boolean;
    onClose?: () => void;
    icon?: ReactElement;
    badge?: ReactElement;
};

export enum DialogHeaderSize {
    Default = 'Default',
    Large = 'Large',
}

export const DialogHeader = ({
    title,
    collapseBottom = false,
    size = DialogHeaderSize.Default,
    close = false,
    onClose,
    icon,
    badge,
}: DialogHeaderProps) => {
    return (
        <div
            data-test-id="fondue-dialog-header"
            className={merge([
                'tw-px-6 tw-flex tw-items-center tw-border-b tw-border-b-line',
                size === DialogHeaderSize.Large ? 'tw-py-6' : 'tw-py-4',
                collapseBottom && 'tw-pb-0 tw-border-none',
            ])}
        >
            <div className="tw-flex tw-items-center">
                {icon && <span className="tw-mr-1.5">{icon}</span>}
                <Text weight="x-strong" size={size === DialogHeaderSize.Large ? 'large' : 'medium'}>
                    {title}
                </Text>
                <span className="tw-ml-1.5">{badge}</span>
            </div>
            {close && (
                <button onClick={onClose} className="tw-absolute tw-right-12">
                    <IconCross />
                </button>
            )}
        </div>
    );
};

DialogHeader.displayName = 'FondueDialogHeader';
