/* (c) Copyright Frontify Ltd., all rights reserved. */

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import * as yup from 'yup';

import { useFormContext } from '../Context/FormContext';
import { Form } from '../Form';

const InputField = ({ name }: { name: string }) => (
    <Form.Control name={name}>
        {({ field, fieldState: { error: { message: errorMessage } = {} } }) => (
            <>
                <input {...field} data-test-id={name} />
                {errorMessage ? <div data-test-id="errorMessage">{errorMessage}</div> : null}
            </>
        )}
    </Form.Control>
);

describe('Form Component', () => {
    const mockSubmit = vi.fn();
    const mockFieldChange = vi.fn();

    const requiredSchema = yup.object({
        username: yup.string().required('Username is required'),
        email: yup.string().email('Invalid email').required('Email is required'),
    });

    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.clearAllMocks();
        vi.useRealTimers();
    });

    it.skip('validates fields using Yup schema', async () => {
        render(
            <Form schema={requiredSchema} onSubmit={mockSubmit}>
                <InputField name="username" />
                <InputField name="email" />
                <button type="submit">Submit</button>
            </Form>,
        );

        await waitFor(() => expect(screen.getByText('Submit')).toBeInTheDocument());

        fireEvent.click(screen.getByText('Submit'));

        await waitFor(() => expect(screen.getByText('Username is required')).toBeInTheDocument());
        await waitFor(() => expect(screen.getByText('Email is required')).toBeInTheDocument());
        await waitFor(() => expect(mockSubmit).not.toHaveBeenCalled());
    });

    it.skip('triggers debounced field validation with schema', async () => {
        render(
            <Form onValidFieldChange={mockFieldChange} debounceInMs={500} schema={requiredSchema}>
                <InputField name="username" />
            </Form>,
        );

        // Valid value
        fireEvent.change(screen.getByTestId('username'), {
            target: { value: 'valid-username' },
        });

        vi.advanceTimersByTime(500);
        await waitFor(() => {
            expect(mockFieldChange).toHaveBeenCalledWith('username', 'valid-username', expect.any(Object));
        });

        // Invalid value
        mockFieldChange.mockClear();
        fireEvent.change(screen.getByTestId('username'), {
            target: { value: '' },
        });

        vi.advanceTimersByTime(500);
        await waitFor(() => {
            expect(mockFieldChange).not.toHaveBeenCalled();
        });
    });

    it('resets form with schema when initialValues change', () => {
        const { rerender } = render(
            <Form schema={requiredSchema} initialValues={{ username: 'initial' }} onSubmit={mockSubmit}>
                <InputField name="username" />
            </Form>,
        );

        // Change value
        fireEvent.change(screen.getByTestId('username'), {
            target: { value: 'changed' },
        });

        // Rerender with new initialValues
        rerender(
            <Form schema={requiredSchema} initialValues={{ username: 'new-initial' }} onSubmit={mockSubmit}>
                <InputField name="username" />
            </Form>,
        );

        expect(screen.getByTestId('username')).toHaveValue('new-initial');
    });

    it.skip('handles schema changes dynamically', async () => {
        const simpleSchema = yup.object({ field: yup.string() });
        const complexSchema = yup.object({
            field: yup.string().min(5, 'Min 5 characters'),
        });

        const { rerender } = render(
            <Form schema={simpleSchema} onSubmit={mockSubmit}>
                <InputField name="field" />
                <button type="submit">Submit</button>
            </Form>,
        );

        // Should submit with invalid value under simple schema
        fireEvent.change(screen.getByTestId('field'), { target: { value: 'a' } });
        fireEvent.click(screen.getByText('Submit'));
        await waitFor(() => expect(mockSubmit).toHaveBeenCalled());

        // Update to complex schema
        mockSubmit.mockClear();
        rerender(
            <Form schema={complexSchema} onSubmit={mockSubmit}>
                <InputField name="field" />
                <button type="submit">Submit</button>
            </Form>,
        );

        // Should fail validation with same value under new schema
        fireEvent.click(screen.getByText('Submit'));
        await waitFor(() => {
            expect(screen.getByText('Min 5 characters')).toBeInTheDocument();
            expect(mockSubmit).not.toHaveBeenCalled();
        });
    });

    it.skip('provides schema validation through form context', async () => {
        const ContextConsumer = () => {
            const { formState } = useFormContext();
            return (
                <div>
                    <div data-testid="errors">{JSON.stringify(formState.errors)}</div>
                    <InputField name="testField" />
                </div>
            );
        };

        const testSchema = yup.object({
            testField: yup.string().required('Context error'),
        });

        render(
            <Form schema={testSchema}>
                <ContextConsumer />
                <button type="submit">Submit</button>
            </Form>,
        );

        fireEvent.click(screen.getByText('Submit'));
        await waitFor(() => {
            const errors = screen.getByTestId('errors').textContent;
            expect(errors).toContain('Context error');
        });
    });
});
