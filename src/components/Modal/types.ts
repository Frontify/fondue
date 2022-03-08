/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ReactElement } from "react";
import { PatternDesign, PatternTheme } from "@foundation/Pattern";
import { ScrollWrapperDirection } from "@components/ScrollWrapper/types";

export type ModalButton = {
    label: string;
    action: () => void;
};

export type ModalVisualProps = {
    pattern?: PatternDesign;
    foregroundColor?: PatternTheme;
};

export enum ModalHeaderVariant {
    Default = "Default",
    Informative = "Informative",
    Negative = "Negative",
    Positive = "Positive",
    Warning = "Warning",
}

export const modalHeaderVariants: Record<ModalHeaderVariant, string> = {
    [ModalHeaderVariant.Default]: "tw-text-grey-80",
    [ModalHeaderVariant.Informative]: "tw-text-violet-bright",
    [ModalHeaderVariant.Negative]: "tw-text-red-bright",
    [ModalHeaderVariant.Positive]: "tw-text-green-bright",
    [ModalHeaderVariant.Warning]: "tw-text-yellow-bright",
};

export type ModalHeaderProps = {
    title?: string;
    leadText?: string;
    decorator?: ReactElement;
    variant?: ModalHeaderVariant;
};

type ModalBodyChildren = ReactElement | ReactElement[];

export type ModalBodyProps = {
    direction?: ScrollWrapperDirection;
    children?: ModalBodyChildren;
};

export type ModalFooterProps = {
    buttons?: [ModalButton] | [ModalButton, ModalButton];
};

export type ModalProps = {
    visual?: ModalVisualProps;
    header?: ReactElement;
    footer?: ReactElement;
    children?: ModalBodyChildren;
};
