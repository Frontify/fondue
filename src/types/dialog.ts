/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ReactElement, ReactNode } from 'react';
import { IconProps } from '@foundation/Icon';
import { BadgeProps } from '@components/Badge';
import { ButtonProps } from '@components/Button';
import { PopperProps } from '@components/Popper/types';

export type DialogPadding = 'none' | 'compact' | 'comfortable' | 'spacious';
export const DIALOG_PADDING = ['compact', 'comfortable', 'spacious']; // To be used in Stories

export const dialogPaddingMap: Record<DialogPadding, string> = {
    none: 'tw-p-0',
    compact: 'tw-p-4',
    comfortable: 'tw-p-6',
    spacious: 'tw-p-10',
};

export const dialogHeadingMap: Record<DialogPadding, string> = {
    none: 'tw-text-heading-large',
    compact: 'tw-text-heading-large',
    comfortable: 'tw-text-heading-x-large',
    spacious: 'tw-text-heading-xx-large',
};

export type DialogHeaderProps = {
    title: string;
    separator?: boolean;
    onClose?: () => void;
    icon?: ReactElement<IconProps>;
    badge?: ReactElement<BadgeProps>;
    children?: ReactNode;
    padding?: 'compact' | 'comfortable' | 'spacious';
    'data-test-id'?: string;
};

export type DialogBodyProps = {
    children: ReactNode;
    maxHeight?: number | string;
    padding?: DialogPadding;
    'data-test-id'?: string;
};

export type DialogFooterProps = {
    children?: ReactNode;
    actionButtons: ButtonProps[];
    backButton?: Omit<ButtonProps, 'emphasis' | 'icon' | 'size'>;
    padding?: DialogPadding;
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
    /** @description This property enable a full screen gray underlay only for modal and blocking-modal options. */
    darkUnderlay?: boolean;
    /** @description If enabled, any value assigned to the maxHeight property won't have any effect.
     * autoHeight will set the maxHeight of the dialog Component automatically calculating the available space in the viewport. */
    autoHeight?: boolean;
    roundedCorners?: boolean;
};

export type OverlayProps = PopperProps & {
    open: boolean;
    'data-test-id'?: string;
    role?: string;
    theme?: 'light' | 'dark';
    handleClose: () => void;
};
