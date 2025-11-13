/* (c) Copyright Frontify Ltd., all rights reserved. */

/**
 * @deprecated Please use updated button component from `@frontify/fondue/components` instead. Also check {@link https://github.com/Frontify/fondue/blob/main/packages/components/MIGRATING.md#button the migration guide}.
 */
export enum ButtonRounding {
    Medium = 'Medium',
    Full = 'Full',
}

/**
 * @deprecated Please use updated button component from `@frontify/fondue/components` instead. Also check {@link https://github.com/Frontify/fondue/blob/main/packages/components/MIGRATING.md#button the migration guide}.
 */
export enum ButtonStyle {
    Default = 'Default',
    Positive = 'Positive',
    Negative = 'Negative',
    Danger = 'Danger',
    Loud = 'Loud',
    /** @deprecated use ButtonStyle.Default and ButtonEmphasis.Strong */
    Primary = 'Primary',
    /** @deprecated use ButtonStyle.Default and ButtonEmphasis.Default */
    Secondary = 'Secondary',
}

/**
 * @deprecated Please use updated button component from `@frontify/fondue/components` instead. Also check {@link https://github.com/Frontify/fondue/blob/main/packages/components/MIGRATING.md#button the migration guide}.
 */
export enum UpdatedButtonStyle {
    Default = 'Default',
    Positive = 'Positive',
    Negative = 'Negative',
    Danger = 'Danger',
    Loud = 'Loud',
}

/**
 * @deprecated Please use updated button component from `@frontify/fondue/components` instead. Also check {@link https://github.com/Frontify/fondue/blob/main/packages/components/MIGRATING.md#button the migration guide}.
 */
export enum ButtonSize {
    Small = 'Small',
    Medium = 'Medium',
    Large = 'Large',
}

/**
 * @deprecated Please use updated button component from `@frontify/fondue/components` instead. Also check {@link https://github.com/Frontify/fondue/blob/main/packages/components/MIGRATING.md#button the migration guide}.
 */
export enum ButtonType {
    Button = 'Button',
    Submit = 'Submit',
    Reset = 'Reset',
}

/**
 * @deprecated Please use updated button component from `@frontify/fondue/components` instead. Also check {@link https://github.com/Frontify/fondue/blob/main/packages/components/MIGRATING.md#button the migration guide}.
 */
export enum ButtonEmphasis {
    Default = 'Default',
    Weak = 'Weak',
    Strong = 'Strong',
}

/**
 * @deprecated Please use updated button component from `@frontify/fondue/components` instead. Also check {@link https://github.com/Frontify/fondue/blob/main/packages/components/MIGRATING.md#button the migration guide}.
 */
export type ButtonElements = {
    button: string;
    icon: string;
    text: string;
};
