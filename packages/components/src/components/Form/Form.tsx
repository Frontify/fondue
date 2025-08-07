/* (c) Copyright Frontify Ltd., all rights reserved. */

import { yupResolver } from '@hookform/resolvers/yup';
import debounce from 'lodash/debounce';
import get from 'lodash/get';
import { type ReactElement, useCallback, useEffect, useMemo, useRef } from 'react';
import {
    Controller,
    type ControllerRenderProps,
    useForm,
    type FieldValues,
    type Path,
    type ControllerFieldState,
    type UseFormStateReturn,
    FormProvider,
} from 'react-hook-form';
import { object } from 'yup';

import { FormContext, useFormContext } from './Context/FormContext';
import { type FormContextType } from './Context/types';
import { type DebouceCatalogue, type FormProps } from './types';

const Form = <T extends FieldValues>({
    onValidFieldChange,
    initialValues,
    schema = object(),
    onSubmit = () => ({}),
    children,
    keepHiddenValues = false,
    resetOnInitialValueChange = true,
    debounceInMs = 500,
    id,
    className,
    ...otherProps
}: FormProps<T>) => {
    const formData = useForm<T>({
        resolver: yupResolver(schema),
        mode: 'onSubmit',
        defaultValues: initialValues,
        shouldUnregister: !keepHiddenValues,
    });

    const {
        clearErrors,
        control,
        formState,
        getFieldState,
        getValues,
        handleSubmit,
        reset,
        resetField,
        setError,
        setValue,
        trigger,
        watch,
    } = formData;

    const debounceCatalogue = useRef<DebouceCatalogue<T>>({} as DebouceCatalogue<T>);

    const validateField: (...args: Parameters<NonNullable<typeof onValidFieldChange>>) => Promise<void> = useCallback(
        async (name, value, state) => {
            const isValid = await trigger(name);

            if (isValid && onValidFieldChange) {
                onValidFieldChange(name, value, state);
            }
        },
        [trigger, onValidFieldChange],
    );

    useEffect(() => {
        const catalogue = debounceCatalogue.current;
        const shouldDebounce = !!debounceInMs;

        const subscription = watch((state, { name }) => {
            if (name) {
                if (shouldDebounce) {
                    const debouncedValidation = debounce(validateField, debounceInMs);
                    if (catalogue[name]) {
                        catalogue[name].cancel();
                    }
                    catalogue[name] = debouncedValidation;
                    // eslint-disable-next-line @typescript-eslint/no-floating-promises
                    debouncedValidation(name, get(state, name), state);
                } else {
                    // eslint-disable-next-line @typescript-eslint/no-floating-promises
                    validateField(name, get(state, name), state);
                }
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, trigger, validateField, debounceInMs]);

    useEffect(() => {
        if (resetOnInitialValueChange) {
            reset(initialValues);
        }
    }, [initialValues, reset, resetOnInitialValueChange]);

    const submitForm = handleSubmit(onSubmit);

    const contextualFormControls: FormContextType<T> = useMemo(
        () => ({
            clearErrors,
            control,
            formState,
            getFieldState,
            getValues,
            reset,
            resetField,
            setError,
            setValue,
            submitForm,
            watch,
        }),
        [
            clearErrors,
            control,
            formState,
            getFieldState,
            getValues,
            reset,
            resetField,
            setError,
            setValue,
            submitForm,
            watch,
        ],
    );

    return (
        <FormProvider {...formData}>
            <FormContext.Provider value={contextualFormControls as FormContextType}>
                <form id={id} onSubmit={submitForm} className={className} {...otherProps}>
                    {typeof children === 'function' ? children(contextualFormControls) : children}
                </form>
            </FormContext.Provider>
        </FormProvider>
    );
};

type FormControllerWrapState<TFieldValues extends FieldValues = FieldValues> = {
    field: ControllerRenderProps<TFieldValues, Path<TFieldValues>>;
    fieldState: ControllerFieldState;
    formState: UseFormStateReturn<TFieldValues>;
};

type FormControlProps<TFieldValues extends FieldValues = FieldValues> = {
    name: Path<TFieldValues>;
    children: (state: FormControllerWrapState<TFieldValues>) => ReactElement;
};

const FormControl = <TFieldValues extends FieldValues = FieldValues>({
    children,
    name,
}: FormControlProps<TFieldValues>) => {
    const { control } = useFormContext<TFieldValues>();

    return <Controller control={control} name={name} render={(state) => children(state)} />;
};

Form.Control = FormControl;

export { Form };
