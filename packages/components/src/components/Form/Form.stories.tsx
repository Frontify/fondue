/* (c) Copyright Frontify Ltd., all rights reserved. */

import { action } from '@storybook/addon-actions';
import { type StoryFn, type Meta } from '@storybook/react';
import { array, boolean, object, string } from 'yup';

import { Button } from '../Button/Button';
import { Checkbox } from '../Checkbox/Checkbox';
import { Divider } from '../Divider/Divider';
import { Flex } from '../Flex/Flex';
import { Label } from '../Label/Label';
import { Switch } from '../Switch/Switch';
import { TextInput } from '../TextInput/TextInput';

import { Form } from './Form';

export default {
    title: 'Components/Form',
    component: Form,
    args: {
        onSubmit: action('on-submit'),
    },
    argTypes: {
        initialValues: {
            table: {
                disable: true,
            },
        },
        schema: {
            table: {
                disable: true,
            },
        },
        onSubmit: {
            table: {
                disable: true,
            },
        },
        keepHiddenValues: {
            table: {
                disable: true,
            },
        },
    },
} as Meta;

const onSubmitDefault = (arg: unknown) => alert(JSON.stringify(arg));
const onValidFieldChange = (name: unknown, value: unknown) => alert(JSON.stringify({ name, value }));

interface FormStoryProp {
    onSubmitTrigger?: typeof onSubmitDefault;
    onValidFieldChangeTrigger?: typeof onValidFieldChange;
}

export const BasicFormSubmit: StoryFn<FormStoryProp> = (args) => {
    const VALIDATION_SCHEMA = object({ surname: string() });

    return (
        <Form {...args} schema={VALIDATION_SCHEMA}>
            <div className="tw-grid tw-gap-y-2.5 tw-mx-8 tw-my-4">
                <Form.Control name="surname">
                    {({ field }) => <TextInput {...field} name="surname" placeholder={'Set your surname'} />}
                </Form.Control>
                <Button type="submit">Update Name</Button>
            </div>
        </Form>
    );
};

export const BasicFormSubmitWithBasicValidation: StoryFn<FormStoryProp> = (args) => {
    const VALIDATION_SCHEMA = object({ surname: string().min(5).required() });

    return (
        <Form {...args} schema={VALIDATION_SCHEMA}>
            <div className="tw-grid tw-gap-y-2.5 tw-mx-8 tw-my-4">
                <Form.Control name="surname">
                    {({ field, fieldState: { error: { message: errorMessage } = {} } }) => (
                        <Flex gap={2} direction="column">
                            <Label htmlFor="surname" required>
                                Surname
                            </Label>
                            <TextInput
                                {...field}
                                status={errorMessage ? 'error' : 'neutral'}
                                name="surname"
                                id="surname"
                                placeholder={'Set your surname'}
                            />
                        </Flex>
                    )}
                </Form.Control>
                <Button type="submit">Update Name</Button>
            </div>
        </Form>
    );
};

export const BasicFormSubmitWithCustomErrorText: StoryFn<FormStoryProp> = ({
    onSubmitTrigger = onSubmitDefault,
}: FormStoryProp) => {
    const VALIDATION_SCHEMA = object({
        surname: string().min(5, 'Custom Validation Error Message').required('Custom Required Error Message'),
    });

    return (
        <Form onSubmit={onSubmitTrigger} schema={VALIDATION_SCHEMA}>
            <div className="tw-grid tw-gap-y-2.5 tw-mx-8 tw-my-4">
                <Form.Control name="surname">
                    {({ field, fieldState: { error: { message: errorMessage } = {} } }) => (
                        <Flex gap={2} direction="column">
                            <Label htmlFor="surname" required>
                                Surname
                            </Label>
                            <TextInput
                                {...field}
                                name="surname"
                                status={errorMessage ? 'error' : 'neutral'}
                                id="surname"
                                placeholder={'Set your surname'}
                            />
                        </Flex>
                    )}
                </Form.Control>
                <Button type="submit">Update Name</Button>
            </div>
        </Form>
    );
};

export const BasicOnChangeWithValidation: StoryFn<FormStoryProp> = ({
    onValidFieldChangeTrigger = onValidFieldChange,
}: FormStoryProp) => {
    const VALIDATION_SCHEMA = object({ surname: string().min(2).required() });

    return (
        <Form onValidFieldChange={onValidFieldChangeTrigger} schema={VALIDATION_SCHEMA}>
            <Form.Control name="surname">
                {({ field }) => <TextInput {...field} name="surname" placeholder={'Set your surname'} />}
            </Form.Control>
        </Form>
    );
};

export const BasicOnChangeWithValidationCustomErrorText: StoryFn<FormStoryProp> = ({
    onValidFieldChangeTrigger = onValidFieldChange,
}: FormStoryProp) => {
    const VALIDATION_SCHEMA = object({
        surname: string().min(3, 'This is a Custom error Message').required(),
    });

    return (
        <Form onValidFieldChange={onValidFieldChangeTrigger} schema={VALIDATION_SCHEMA}>
            <Form.Control name="surname">
                {({ field }) => <TextInput {...field} name="surname" placeholder={'Set your surname'} />}
            </Form.Control>
        </Form>
    );
};

export const MultipleOnChangeWithValidationAndCustomErrorText: StoryFn<FormStoryProp> = ({
    onSubmitTrigger = onSubmitDefault,
    onValidFieldChangeTrigger = onValidFieldChange,
}: FormStoryProp) => {
    const schema = object({
        name: string().defined(),
        lastname: string().optional(),
        address: string().min(5).required(),
        city: string().min(3, 'This is a Custom error Message').required(),
        website: string().url().nullable(),
        email: string().email(),
    });

    return (
        <Form onSubmit={onSubmitTrigger} onValidFieldChange={onValidFieldChangeTrigger} schema={schema}>
            <Flex gap={2} direction="column" mb={2}>
                <Form.Control name="name">
                    {({ field, fieldState: { error: { message: errorMessage } = {} } }) => (
                        <>
                            <Label htmlFor="name">Name</Label>
                            <TextInput
                                {...field}
                                status={errorMessage ? 'error' : 'neutral'}
                                name="name"
                                placeholder={'Set your Name'}
                            />
                        </>
                    )}
                </Form.Control>

                <Form.Control name="lastname">
                    {({ field, fieldState: { error: { message: errorMessage } = {} } }) => (
                        <>
                            <Label htmlFor="lastname">Lastname</Label>
                            <TextInput
                                {...field}
                                status={errorMessage ? 'error' : 'neutral'}
                                name="lastname"
                                placeholder={'Set your lastname'}
                            />
                        </>
                    )}
                </Form.Control>

                <Form.Control name="address">
                    {({ field }) => (
                        <>
                            <Label htmlFor="address">Address</Label>
                            <textarea {...field} name="address" placeholder={'Set your address'} />
                        </>
                    )}
                </Form.Control>

                <Form.Control name="city">
                    {({ field, fieldState: { error: { message: errorMessage } = {} } }) => (
                        <>
                            <Label htmlFor="city">City</Label>
                            <TextInput
                                {...field}
                                status={errorMessage ? 'error' : 'neutral'}
                                name="city"
                                placeholder={'Set your city'}
                            />
                        </>
                    )}
                </Form.Control>

                <Form.Control name="website">
                    {({ field, fieldState: { error: { message: errorMessage } = {} } }) => (
                        <>
                            <Label htmlFor="website">Website</Label>
                            <TextInput
                                {...field}
                                status={errorMessage ? 'error' : 'neutral'}
                                name="website"
                                placeholder={'Add your Website'}
                            />
                        </>
                    )}
                </Form.Control>

                <Form.Control name="email">
                    {({ field, fieldState: { error: { message: errorMessage } = {} } }) => (
                        <>
                            <Label htmlFor="email">Email</Label>
                            <TextInput
                                {...field}
                                status={errorMessage ? 'error' : 'neutral'}
                                name="email"
                                placeholder={'Email'}
                            />
                        </>
                    )}
                </Form.Control>
            </Flex>

            <Button type="submit">Update Form</Button>
        </Form>
    );
};

export const AllTheFormElements: StoryFn<FormStoryProp> = ({
    onSubmitTrigger = onSubmitDefault,
    onValidFieldChangeTrigger = onValidFieldChange,
}: FormStoryProp) => {
    const schema = object({
        name: string().defined(),
        lastname: string().optional(),
        switch: boolean(),
        segmentedControls: string(),
        richText: string(),
        multiselect: array().of(string()),
        dropdown: string(),
        FormColorPicker: string(),
        Checklist: array().of(string()),
        tags: array().of(string()).min(1),
    });

    return (
        <Form onSubmit={onSubmitTrigger} onValidFieldChange={onValidFieldChangeTrigger} schema={schema}>
            <div className="tw-grid tw-gap-y-4 tw-mx-8 tw-my-4 tw-gap-m">
                <Form.Control name="name">
                    {({ field, fieldState: { error: { message: errorMessage } = {} } }) => (
                        <>
                            <Label htmlFor="name">TextInput</Label>
                            <TextInput
                                {...field}
                                status={errorMessage ? 'error' : 'neutral'}
                                name="name"
                                placeholder={'Set your Name'}
                            />
                        </>
                    )}
                </Form.Control>

                <Form.Control name="address">
                    {({ field }) => (
                        <>
                            <Label htmlFor="address">Textarea</Label>
                            <textarea {...field} name="address" placeholder={'Set your address'} />
                        </>
                    )}
                </Form.Control>

                <Divider />

                <Form.Control name="switch">
                    {({ field }) => (
                        <>
                            <Label htmlFor="switch" id="switch-label">
                                Switch
                            </Label>
                            <Switch {...field} name="switch" aria-labelledby="switch-label" />
                        </>
                    )}
                </Form.Control>

                <Divider />

                <Form.Control name="Checkbox">
                    {({ field }) => (
                        <Label htmlFor="Checkbox">
                            <Checkbox {...field} name="Checkbox" />
                            Checkbox
                        </Label>
                    )}
                </Form.Control>

                <Divider />

                <Button type="submit">Trigger onSubmit</Button>
            </div>
        </Form>
    );
};
