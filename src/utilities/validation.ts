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
