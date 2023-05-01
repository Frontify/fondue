/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { ReactElement } from 'react';
import { merge } from '@utilities/merge';
import { IconCross } from '@foundation/Icon/Generated';
import { Text } from '@typography/Text';

export type DialogHeaderProps = {
    title: string;
    size?: DialogHeaderSize;
    collapseBottom?: boolean;
    onClose?: () => void;
    icon?: ReactElement;
    badge?: ReactElement;
    'data-test-id'?: string;
};

export enum DialogHeaderSize {
    Default = 'Default',
    Large = 'Large',
}

export const DialogHeader = ({
    title,
    collapseBottom = false,
    size = DialogHeaderSize.Default,
    onClose,
    icon,
    badge,
    'data-test-id': dataTestId = 'fondue-dialog-header',
}: DialogHeaderProps) => {
    return (
        <div
            data-test-id={dataTestId}
            className={merge([
                'tw-px-6 tw-flex tw-items-center tw-border-b tw-border-b-line',
                size === DialogHeaderSize.Large ? 'tw-py-6' : 'tw-py-4',
                collapseBottom && 'tw-pb-0 tw-border-none',
            ])}
        >
            <div className="tw-flex tw-items-center" data-test-id={`${dataTestId}-title`}>
                {icon && (
                    <span data-test-id={`${dataTestId}-icon`} className="tw-mr-1.5">
                        {icon}
                    </span>
                )}
                <Text weight="x-strong" size={size === DialogHeaderSize.Large ? 'large' : 'medium'}>
                    {title}
                </Text>
                {badge && (
                    <span data-test-id={`${dataTestId}-badge`} className="tw-ml-1.5">
                        {badge}
                    </span>
                )}
            </div>
            {onClose && (
                <button
                    data-test-id={`${dataTestId}-close`}
                    aria-label={`${dataTestId}-close`}
                    onClick={onClose}
                    className="tw-absolute tw-right-12"
                >
                    <IconCross />
                </button>
            )}
        </div>
    );
};

DialogHeader.displayName = 'FondueDialogHeader';
