/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ReactElement } from "react";
import { Color } from "../../types";
import { PatternDesign, PatternTheme } from "@foundation/Pattern";

export type ModalButton = {
    label: string;
    action: () => void;
};

export type ModalVisualProps = {
    pattern: PatternDesign;
    foregroundColor?: PatternTheme;
    backgroundColor?: PatternTheme | Color;
};

export type ModalHeaderProps = {
    title?: string;
    leadText?: string;
    decorator?: ReactElement;
    variant?: "Negative" | "Positive" | "Warning" | "Informative";
};

export type ModalBodyProps = {
    children?: ReactElement;
};

export type ModalFooterProps = {
    buttons?: [ModalButton] | [ModalButton, ModalButton];
};

export type ModalProps = {
    visual?: PatternDesign;
    foregroundColor?: PatternTheme;
    children?: ReactElement;
};
