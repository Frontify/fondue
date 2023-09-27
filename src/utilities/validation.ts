/* (c) Copyright Frontify Ltd., all rights reserved. */

export enum Validation {
    Default = 'Default',
    Loading = 'Loading',
    Success = 'Success',
    Error = 'Error',
    Warning = 'Warning',
}

export const validationClassMap: Record<Validation, string> = {
    [Validation.Default]: 'tw-border-line-strong',
    [Validation.Loading]: 'tw-border-line',
    [Validation.Success]: 'tw-border-text-positive',
    [Validation.Error]: 'tw-border-text-negative',
    [Validation.Warning]: 'tw-border-text-warning',
};

export const validationTextClassMap: Record<Validation, string> = {
    [Validation.Default]: 'tw-text-text',
    [Validation.Loading]: 'tw-text-text-disabled',
    [Validation.Success]: 'tw-text-text-positive',
    [Validation.Error]: 'tw-text-text-negative',
    [Validation.Warning]: 'tw-text-text-warning',
};
