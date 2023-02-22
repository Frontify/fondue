/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ReactChild } from 'react';

export type ToastProps = {
    isOpen: boolean;
    style: ToastStyles;
    icon: ReactChild;
    children?: ReactChild;
};

export enum ToastStyles {
    Information = 'Information',
    Warning = 'Warning',
    Tip = 'Tip',
    Note = 'Note',
}

export const toastStylesBackgroundColorsMap: Record<ToastStyles, string> = {
    [ToastStyles.Information]: 'tw-bg-violet-60',
    [ToastStyles.Warning]: 'tw-bg-red-60',
    [ToastStyles.Tip]: 'tw-bg-green-60',
    [ToastStyles.Note]: 'tw-bg-yellow-60',
};
