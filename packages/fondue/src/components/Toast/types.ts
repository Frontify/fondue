/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ReactNode } from 'react';

/**
 * @deprecated This component is deprecated and will be removed in the next major version.
 */
export type ToastProps = {
    isOpen: boolean;
    style: ToastStyle;
    icon: ReactNode;
    animationDirection?: ToastAnimationDirection;
    children?: ReactNode;
    theme?: ToastTheme;
    enableExitAnimation?: boolean;
    'data-test-id'?: string;
};

/**
 * @deprecated This component is deprecated and will be removed in the next major version.
 */
export enum ToastAnimationDirection {
    BottomToTop = 'BottomToTop',
    TopToBottom = 'TopToBottom',
}

/**
 * @deprecated This component is deprecated and will be removed in the next major version.
 */
export enum ToastStyle {
    Loud = 'Loud',
    Danger = 'Danger',
    Success = 'Success',
    Warning = 'Warning',
}

/**
 * @deprecated This component is deprecated and will be removed in the next major version.
 */
export const toastStylesBackgroundColorsMap: Record<ToastStyle, string> = {
    [ToastStyle.Loud]: 'tw-bg-box-selected-strong',
    [ToastStyle.Danger]: 'tw-bg-box-negative-strong-pressed',
    [ToastStyle.Success]: 'tw-bg-box-positive-strong-pressed',
    [ToastStyle.Warning]: 'tw-bg-box-warning-strong',
};

/**
 * @deprecated This component is deprecated and will be removed in the next major version.
 */
export type ToastTheme = 'light' | 'dark';
