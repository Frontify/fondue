/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type PopperProps } from '@components/Popper/types';

export type DialogPadding = 'none' | 'compact' | 'comfortable' | 'spacious';

export const overlayShadowMap: Record<string, string> = {
    none: 'tw-shadow-none',
    small: 'tw-shadow',
    medium: 'tw-shadow-mid',
    large: 'tw-shadow-big',
};

export const overlayBorderRadius: Record<string, string> = {
    small: 'tw-rounded',
    large: 'tw-rounded-lg',
};

export enum Modality {
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
    width?: string | number;
};

export type OverlayProps = PopperProps & {
    id?: string;
    open: boolean;
    'data-test-id'?: string;
    role?: string;
    theme?: 'light' | 'dark';
    shadow?: 'none' | 'small' | 'medium' | 'large';
    isDialog?: boolean;
    handleClose?: () => void;
};
