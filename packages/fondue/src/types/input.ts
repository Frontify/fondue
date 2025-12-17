/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type AriaAttributes, type ReactElement } from 'react';

import { type Validation } from '@utilities/validation';

/**
 * @deprecated This type is deprecated and will be removed in the next major version.
 */
export type InputSharedBaseProps = {
    autocomplete?: boolean;
    clearable?: boolean;
    decorator?: ReactElement;
    extraActions?: ExtraAction[];
    hugWidth?: boolean;
    id?: string;
    status?: Validation;
    'data-test-id'?: string;
} & AriaAttributes;

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
