/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ReactElement, ReactNode } from 'react';
import { IconProps } from '@foundation/Icon';
import { BadgeProps } from '@components/Badge';
import { ButtonProps } from '@components/Button';
import { PopperProps } from '@components/Popper/types';

export type DialogSize = 'small' | 'medium' | 'large';
export const DIALOG_SIZE = ['small', 'medium', 'large']; // To be used in Stories

export const dialogPaddingMap: Record<DialogSize, string> = {
    small: 'tw-p-4',
    medium: 'tw-p-6',
    large: 'tw-p-10',
};

export type DialogHeaderProps = {
    title: string;
    size?: DialogSize;
    collapseBottom?: boolean;
    onClose?: () => void;
    icon?: ReactElement<IconProps>;
    badge?: ReactElement<BadgeProps>;
    'data-test-id'?: string;
};

export type DialogBodyProps = {
    children: ReactNode;
    maxHeight?: number | string;
    padding?: DialogSize;
    'data-test-id'?: string;
};

export type DialogFooterProps = {
    children?: ReactNode;
    actionButtons: ButtonProps[];
    backButton?: Omit<ButtonProps, 'emphasis' | 'icon' | 'size'>;
    padding?: DialogSize;
    'data-test-id'?: string;
};

export enum Modality {
    Modal = 'modal',
    NonModal = 'non-modal',
    BlockingModal = 'blocking-modal',
}

export type BaseDialogProps = {
    modality?: Modality;
    maxWidth?: string | number;
    maxHeight?: string | number;
    minWidth?: string | number;
    minHeight?: string | number;
    handleClose?: () => void;
    /** @description This property enable a full screen gray underlay only for modal and blocking-modal options. */
    darkUnderlay?: boolean;
    /** @description If enabled, any value assigned to the maxHeight property won't have any effect.
     * autoHeight will set the maxHeight of the dialog Component automatically calculating the available space in the viewport. */
    autoHeight?: boolean;
};

export type OverlayProps = PopperProps & {
    open: boolean;
    'data-test-id'?: string;
    role?: string;
};
