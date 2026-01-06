/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ReactElement } from 'react';

/**
 * @deprecated This type is deprecated and will be removed in the next major version.
 */
export type InputActionCallbacks = {
    text?: () => void;
    textarea?: () => void;
    password?: () => void;
    increment?: () => void;
    clearable?: () => void;
};

/**
 * @deprecated This type is deprecated and will be removed in the next major version.
 */
export type InputActionsProps = {
    clearable?: boolean;
    obfuscated?: boolean;
    isObfuscated?: boolean;
    increment?: boolean;
    disabled?: boolean;
    callbacks: InputActionCallbacks;
    dataTestId?: string;
};

/**
 * @deprecated This type is deprecated and will be removed in the next major version.
 */
export type ExtraAction = {
    icon: ReactElement;
    title: string;
    callback: () => void;
};

/**
 * @deprecated This type is deprecated and will be removed in the next major version.
 */
export type InputExtraActionsProps = {
    actions: ExtraAction[];
    disabled?: boolean;
    dataTestId?: string;
};
