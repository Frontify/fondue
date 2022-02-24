import { MouseEvent, ReactElement, ReactNode } from "react";
export enum ButtonRounding {
    Medium = "Medium",
    Full = "Full",
}
export enum ButtonStyle {
    Default = "Default",
    Positive = "Positive",
    Negative = "Negative",
    Danger = "Danger",
    // DEPRECATING
    Primary = "Primary",
    Secondary = "Secondary",
}

export enum ButtonSize {
    Small = "Small",
    Medium = "Medium",
    Large = "Large",
}

export enum ButtonType {
    Button = "Button",
    Submit = "Submit",
    Reset = "Reset",
}

export enum ButtonEmphasis {
    Default = "Default",
    Weak = "Weak",
    Strong = "Strong",
}

export type ButtonElements = {
    button: string;
    icon: string;
    text: string;
};

export type ButtonProps = {
    type?: ButtonType;
    style?: ButtonStyle;
    emphasis?: ButtonEmphasis;
    hideLabel?: boolean;
    size?: ButtonSize;
    rounding?: ButtonRounding;
    solid?: boolean;
    inverted?: boolean;
    disabled?: boolean;
    icon?: ReactElement;
    children?: ReactNode;
    onClick?: (event?: MouseEvent<HTMLButtonElement>) => void;
    hugWidth?: boolean;
    "aria-label"?: string;
};
