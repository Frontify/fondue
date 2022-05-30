/* (c) Copyright Frontify Ltd., all rights reserved. */

export enum Validation {
    Default = 'Default',
    Loading = 'Loading',
    Success = 'Success',
    Error = 'Error',
}

export const validationClassMap: Record<Validation, string> = {
    [Validation.Default]: 'tw-border-black-20',
    [Validation.Loading]: 'tw-border-black-10',
    [Validation.Success]: 'tw-border-green-50',
    [Validation.Error]: 'tw-border-red-60',
};
