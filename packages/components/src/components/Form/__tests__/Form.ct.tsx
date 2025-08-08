/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';
import sinon from 'sinon';
import { object, string } from 'yup';

import { Button } from '#/components/Button/Button';
import { Flex } from '#/components/Flex/Flex';
import { TextInput } from '#/components/TextInput/TextInput';

import { Form } from '../Form';

const TEST_ID_FORM = 'fondue-form';
const TEST_ID_EMAIL = 'fondue-form-email';
const TEST_ID_NAME = 'fondue-form-name';
const TEST_ID_SUBMIT = 'fondue-form-submit';
const TEST_ID_RESET = 'fondue-form-reset';

// Define reusable schemas
const emailSchema = object({
    email: string().required('Required').email('Invalid email'),
});

const fullSchema = object({
    email: string().required('Required').email('Invalid email'),
    name: string().required('Required').min(3, 'Too short'),
});

const emptySchema = object({});

/******************************************************************************/
/* Unfortunately it seems playwright is not able to render components as from */
/* props. So all those tests should work but don't                            */
/******************************************************************************/

test.skip('should submit valid form data', async ({ mount }) => {
    const onSubmit = sinon.spy();
    const component = await mount(
        <Form<{ email: string; name: string }> onSubmit={onSubmit} schema={fullSchema} data-test-id={TEST_ID_FORM}>
            <Flex gap={2} direction="column">
                <Form.Control name="email">
                    {({ field }) => <TextInput {...field} data-test-id={TEST_ID_EMAIL} value="test" />}
                </Form.Control>
                <Form.Control name="name">
                    {({ field }) => <TextInput {...field} data-test-id={TEST_ID_NAME} />}
                </Form.Control>
            </Flex>
            <Button type="submit" data-test-id={TEST_ID_SUBMIT}>
                Submit
            </Button>
        </Form>,
    );

    await component.locator(`[data-test-id="${TEST_ID_EMAIL}"]`).waitFor();
    await expect(component).toBeVisible();
    await expect(component.getByTestId(TEST_ID_EMAIL)).toBeVisible();

    await component.getByTestId(TEST_ID_EMAIL).fill('test@example.com');
    await component.getByTestId(TEST_ID_NAME).fill('John Doe');
    await component.getByTestId(TEST_ID_SUBMIT).click();

    expect(onSubmit.calledOnce).toBe(true);
    expect(onSubmit.firstCall.args[0]).toEqual({
        email: 'test@example.com',
        name: 'John Doe',
    });
});

test.skip('should show validation errors', async ({ mount }) => {
    const onSubmit = sinon.spy();
    const component = await mount(
        <Form<{ email: string }> onSubmit={onSubmit} schema={emailSchema}>
            <Form.Control name="email">
                {({ field }) => <TextInput {...field} data-test-id={TEST_ID_EMAIL} />}
            </Form.Control>
            <Button type="submit" data-test-id={TEST_ID_SUBMIT}>
                Submit
            </Button>
        </Form>,
    );

    await component.getByTestId(TEST_ID_EMAIL).fill('invalid');
    await component.getByTestId(TEST_ID_SUBMIT).click();

    expect(onSubmit.notCalled).toBe(true);
    await expect(component.getByTestId(TEST_ID_EMAIL)).toHaveAttribute('aria-invalid', 'true');
});

test.skip('should reset form values', async ({ mount }) => {
    const component = await mount(
        <Form<{ email: string }>
            initialValues={{ email: 'initial@test.com' }}
            schema={emailSchema}
            data-test-id={TEST_ID_FORM}
        >
            {({ reset }) => (
                <>
                    <Form.Control name="email">
                        {({ field }) => <TextInput {...field} data-test-id={TEST_ID_EMAIL} />}
                    </Form.Control>
                    <Button onPress={() => reset()} data-test-id={TEST_ID_RESET}>
                        Reset
                    </Button>
                </>
            )}
        </Form>,
    );

    await component.getByTestId(TEST_ID_EMAIL).fill('updated@test.com');
    await component.getByTestId(TEST_ID_RESET).click();

    await expect(component.getByTestId(TEST_ID_EMAIL)).toHaveValue('initial@test.com');
});

test.skip('should debounce field validation', async ({ mount }) => {
    const onValidFieldChange = sinon.spy();
    const component = await mount(
        <Form<{ email: string }> onValidFieldChange={onValidFieldChange} schema={emailSchema} debounceInMs={100}>
            <Form.Control name="email">
                {({ field }) => <TextInput {...field} data-test-id={TEST_ID_EMAIL} />}
            </Form.Control>
        </Form>,
    );

    await component.getByTestId(TEST_ID_EMAIL).fill('test@example.com');
    await new Promise((resolve) => setTimeout(resolve, 150));

    expect(onValidFieldChange.calledOnce).toBe(true);
    expect(onValidFieldChange.firstCall.args[1]).toBe('test@example.com');
});

test.skip('should keep hidden field values', async ({ mount }) => {
    const onSubmit = sinon.spy();
    const component = await mount(
        <Form<{ visible: string; hidden: string }> onSubmit={onSubmit} schema={emptySchema} keepHiddenValues={true}>
            {({ watch }) => (
                <>
                    <Form.Control name="visible">
                        {({ field }) => <TextInput {...field} data-test-id="visible" />}
                    </Form.Control>
                    <Form.Control name="hidden">
                        {({ field }) => <TextInput {...field} data-test-id="hidden" />}
                    </Form.Control>
                    <div data-test-id="hidden-value">{watch('hidden')}</div>
                    <Button type="submit" data-test-id={TEST_ID_SUBMIT}>
                        Submit
                    </Button>
                </>
            )}
        </Form>,
    );

    await component.getByTestId('hidden').fill('persisted');
    await component.getByTestId('visible').fill('test');
    await component.getByTestId(TEST_ID_SUBMIT).click();

    expect(onSubmit.firstCall.args[0]).toEqual({
        visible: 'test',
        hidden: 'persisted',
    });
});

test.skip('should reset on initialValues change', async ({ mount }) => {
    const component = await mount(
        <Form<{ email: string }>
            initialValues={{ email: 'first@test.com' }}
            schema={emailSchema}
            resetOnInitialValueChange={true}
            data-test-id={TEST_ID_FORM}
        >
            <Form.Control name="email">
                {({ field }) => <TextInput {...field} data-test-id={TEST_ID_EMAIL} />}
            </Form.Control>
        </Form>,
    );

    await component.update(
        <Form<{ email: string }>
            initialValues={{ email: 'updated@test.com' }}
            schema={emailSchema}
            resetOnInitialValueChange={true}
            data-test-id={TEST_ID_FORM}
        >
            <Form.Control name="email">
                {({ field }) => <TextInput {...field} data-test-id={TEST_ID_EMAIL} />}
            </Form.Control>
        </Form>,
    );

    await expect(component.getByTestId(TEST_ID_EMAIL)).toHaveValue('updated@test.com');
});

test.skip('should provide form context', async ({ mount }) => {
    const component = await mount(
        <Form<{ email: string }> schema={emailSchema}>
            {({ setValue }) => (
                <>
                    <Form.Control name="email">
                        {({ field }) => <TextInput {...field} data-test-id={TEST_ID_EMAIL} />}
                    </Form.Control>
                    <Button onPress={() => setValue('email', 'context@test.com')} data-test-id="context-button">
                        Set Value
                    </Button>
                </>
            )}
        </Form>,
    );

    await component.getByTestId('context-button').click();
    await expect(component.getByTestId(TEST_ID_EMAIL)).toHaveValue('context@test.com');
});

test.skip('should handle form without onValidFieldChange', async ({ mount }) => {
    const onSubmit = sinon.spy();
    const component = await mount(
        <Form<{ email: string }> onSubmit={onSubmit} schema={emailSchema}>
            <Form.Control name="email">
                {({ field }) => <TextInput {...field} data-test-id={TEST_ID_EMAIL} />}
            </Form.Control>
            <Button type="submit" data-test-id={TEST_ID_SUBMIT}>
                Submit
            </Button>
        </Form>,
    );

    await component.getByTestId(TEST_ID_EMAIL).fill('test@example.com');
    await component.getByTestId(TEST_ID_SUBMIT).click();

    expect(onSubmit.calledOnce).toBe(true);
});

test.skip('should handle unregistered fields when keepHiddenValues=false', async ({ mount }) => {
    const onSubmit = sinon.spy();
    const component = await mount(
        <Form<{ visible: string; hidden: string }> onSubmit={onSubmit} schema={emptySchema} keepHiddenValues={false}>
            {() => (
                <>
                    <Form.Control name="visible">
                        {({ field }) => <TextInput {...field} data-test-id="visible" />}
                    </Form.Control>
                    <Button type="submit" data-test-id={TEST_ID_SUBMIT}>
                        Submit
                    </Button>
                </>
            )}
        </Form>,
    );

    await component.getByTestId('visible').fill('test');
    await component.getByTestId(TEST_ID_SUBMIT).click();

    expect(onSubmit.firstCall.args[0]).toEqual({
        visible: 'test',
    });
});
