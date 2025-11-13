/* (c) Copyright Frontify Ltd., all rights reserved. */

/**
 * @deprecated Please use a custom type instead.
 **/
export enum Validation {
    Default = 'Default',
    Loading = 'Loading',
    Success = 'Success',
    Error = 'Error',
    Warning = 'Warning',
}
/**
 * @deprecated Please use a custom function instead.
 **/
export const validationClassMap: Record<Validation, string> = {
    [Validation.Default]: 'tw-border-line dark:tw-border-line',
    [Validation.Loading]: 'tw-border-line dark:tw-border-line',
    [Validation.Success]: 'tw-border-text-positive dark:tw-border-text-positive',
    [Validation.Error]: 'tw-border-text-negative dark:tw-border-text-negative',
    [Validation.Warning]: 'tw-border-text-warning dark:tw-border-text-warning',
};
/**
 * @deprecated Please use a custom function instead.
 **/
export const validationTextClassMap: Record<Validation, string> = {
    [Validation.Default]: 'tw-text-text dark:tw-text-text',
    [Validation.Loading]: 'tw-text-text-disabled dark:tw-text-text-disabled',
    [Validation.Success]: 'tw-text-text-positive dark:tw-text-text-positive',
    [Validation.Error]: 'tw-text-text-negative dark:tw-text-text-negative',
    [Validation.Warning]: 'tw-text-text-warning dark:tw-text-text-warning',
};
