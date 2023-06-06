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
    scrollShadows?: boolean;
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
    handleClose?: () => void;
};

export type OverlayProps = {
    open: boolean;
    'data-test-id'?: string;
    role?: string;
} & PopperProps;
