/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type BaseSyntheticEvent } from 'react';
import { type Control, type FieldValues, type UseFormReturn } from 'react-hook-form';

export type FormContextType<T extends FieldValues = FieldValues> = Omit<
    UseFormReturn<T>,
    'handleSubmit' | 'register' | 'unregister' | 'trigger' | 'setFocus' | 'control' | 'subscribe'
> & {
    submitForm: (event?: BaseSyntheticEvent<object> | undefined) => Promise<void>;
    /** @private
     * Use FormControllerWrap to sync component with FormState,
     * rather than accessing control directly.
     */
    control: Control<T>;
};
