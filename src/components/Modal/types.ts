import { Color } from "../../types";
import { ReactElement } from "react";

export enum ModalVisualPattern {
    Typography = "Typography",
    Assets = "Assets",
    Imagery = "Imagery",
    Sound = "Sound",
}

export enum ThemeColor {
    Default = "Default",
    Positive = "Positive",
    Negative = "Negative",
}

export type ModalButton = {
    label: string;
    action: () => void;
};

export type ModalVisualProps = {
    pattern?: ModalVisualPattern;
    foregroundColor?: ThemeColor | Color;
    backgroundColor?: ThemeColor | Color;
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
    visual?: ModalVisualPattern;
    children?: ReactElement;
};
