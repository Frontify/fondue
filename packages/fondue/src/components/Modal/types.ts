/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AriaOverlayProps } from '@react-aria/overlays';
import { AriaDialogProps } from '@react-types/dialog';
import { PatternDesign, PatternTheme } from '@foundation/Pattern';
import { ScrollWrapperDirection } from '@components/ScrollWrapper/types';
import { ReactElement, ReactNode } from 'react';
import { ButtonProps } from '..';

export type ModalButton = Omit<ButtonProps, 'size'>;

export type ModalVisualProps = {
    pattern?: PatternDesign;
    foregroundColor?: PatternTheme;
};

export enum ModalHeaderVariant {
    Default = 'Default',
    Informative = 'Informative',
    Negative = 'Negative',
    Positive = 'Positive',
    Warning = 'Warning',
}

export const modalHeaderVariants: Record<ModalHeaderVariant, string> = {
    [ModalHeaderVariant.Default]: 'tw-text-grey-80',
    [ModalHeaderVariant.Informative]: 'tw-text-violet-60',
    [ModalHeaderVariant.Negative]: 'tw-text-red-60',
    [ModalHeaderVariant.Positive]: 'tw-text-green-60',
    [ModalHeaderVariant.Warning]: 'tw-text-yellow-60',
};

export type ModalHeaderProps = {
    title?: string;
    leadText?: ReactNode;
    decorator?: ReactElement;
    variant?: ModalHeaderVariant;
};

type ModalBodyChildren = ReactElement | ReactElement[];

export type ModalBodyProps = {
    direction?: ScrollWrapperDirection;
    children?: ModalBodyChildren;
    horizontalPadding?: boolean;
};

export type ModalFooterProps = {
    buttons: [ModalButton] | [ModalButton, ModalButton];
};

export enum ModalWidth {
    Default = 'Default',
    Small = 'Small',
    Large = 'Large',
}

export type ModalPadding = {
    [key: string]: { top: string; horizontal: string; bottom: string };
};

export type ModalProps = {
    visual?: ModalVisualProps;
    width?: ModalWidth;
    children?: ModalBodyChildren;
    isOpen: boolean;
    onClose?: () => void;
    isDismissable?: boolean;
    zIndex?: number;
    compact?: boolean;
} & Omit<AriaOverlayProps, 'isOpen'> &
    AriaDialogProps;
