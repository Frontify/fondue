/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ReactElement, ReactNode } from 'react';
import { IconProps } from '@foundation/Icon';
import { BadgeProps } from '@components/Badge';
import { ButtonProps } from '@components/Button';
import { PopperProps } from '@components/Popper/types';

export enum DialogHeaderSize {
    Default = 'Default',
    Large = 'Large',
}

export type DialogHeaderProps = {
    title: string;
    size?: DialogHeaderSize;
    collapseBottom?: boolean;
    onClose?: () => void;
    icon?: ReactElement<IconProps>;
    badge?: ReactElement<BadgeProps>;
    'data-test-id'?: string;
};

export type DialogBodyProps = {
    children: ReactNode;
    maxHeight?: number | string;
    'data-test-id'?: string;
};

export type DialogFooterProps = {
    buttons: ButtonProps[];
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
    /** @Info This property enable a full screen gray underlay only for modal and blocking-modal options. */
    darkUnderlay?: boolean;
    /** @Info If enabled, any value assigned to the maxHeight property won't have any effect.
     * autoHeight will set the maxHeight of the dialog Component automatically calculating the available space in the viewport. */
    autoHeight?: boolean;
};

export type OverlayProps = {
    open: boolean;
    'data-test-id'?: string;
    role?: string;
} & PopperProps;
