/* (c) Copyright Frontify Ltd., all rights reserved. */

export enum Validation {
    Default = 'Default',
    Loading = 'Loading',
    Success = 'Success',
    Error = 'Error',
    Warning = 'Warning',
}

export const validationClassMap: Record<Validation, string> = {
    [Validation.Default]: 'tw-border-line-strong tw-text-black-80',
    [Validation.Loading]: 'tw-border-line',
    [Validation.Success]: 'tw-border-text-positive tw-text-green-60',
    [Validation.Error]: 'tw-border-text-negative tw-text-red-60',
    [Validation.Warning]: 'tw-border-text-warning',
};
