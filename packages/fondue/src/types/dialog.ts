/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type PopperProps } from '@components/Popper/types';

/**
 * @deprecated This object is deprecated and will be removed in the next major version.
 */
export const overlayShadowMap: Record<string, string> = {
    none: 'tw-shadow-none',
    small: 'tw-shadow',
    medium: 'tw-shadow-mid',
    large: 'tw-shadow-big',
};

/**
 * @deprecated This object is deprecated and will be removed in the next major version.
 */
export const overlayBorderRadius: Record<string, string> = {
    small: 'tw-rounded',
    large: 'tw-rounded-lg',
};

/**
 * @deprecated This enum is deprecated and will be removed in the next major version.
 */
export enum Modality {
    NonModal = 'non-modal',
    BlockingModal = 'blocking-modal',
}

/**
 * @deprecated This type is deprecated and will be removed in the next major version.
 */
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

/**
 * @deprecated This type is deprecated and will be removed in the next major version.
 */
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
