/* (c) Copyright Frontify Ltd., all rights reserved. */

// Allowed as it's a type import
// eslint-disable-next-line lodash/import-scope
import { type DebouncedFunc } from 'lodash';
import { type ReactNode } from 'react';
import { type DeepPartial, type DefaultValues, type FieldValues, type Path, type SubmitHandler } from 'react-hook-form';
import { type ObjectSchema } from 'yup';

import { type FormContextType } from './Context/types';

export type FormProps<T extends FieldValues = FieldValues, TSchema extends ObjectSchema<any> = ObjectSchema<any>> = {
    onValidFieldChange?: (key: Path<T>, value: DeepPartial<T>[Path<T>], state: DeepPartial<T>) => void;
    initialValues?: DefaultValues<T>;
    schema: TSchema;
    children: ((form: FormContextType<T>) => JSX.Element) | ReactNode;
    onSubmit?: SubmitHandler<T>;
    keepHiddenValues?: boolean;
    resetOnInitialValueChange?: boolean;
    debounceInMs?: number;
    id?: string;
    'data-test-id'?: string;
    className?: string;
};

export type DebouceCatalogue<T extends FieldValues> = Record<
    Path<T>,
    DebouncedFunc<(name: Path<T>, value: DeepPartial<T>[Path<T>]) => Promise<void>>
>;
