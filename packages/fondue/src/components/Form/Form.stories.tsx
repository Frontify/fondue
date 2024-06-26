/* (c) Copyright Frontify Ltd., all rights reserved. */

import { action } from '@storybook/addon-actions';
import { type Meta, type StoryFn } from '@storybook/react';

import { Box } from '@components/Box';
import { Button } from '@components/Button';
import { FormControl } from '@components/FormControl';
import { TextInput } from '@components/TextInput';

import { Form, type FormProps } from './Form';

export default {
    title: 'Components/Form',
    component: Form,
    tags: ['autodocs'],
} as Meta<FormProps>;

export const Default: StoryFn<FormProps> = (args: FormProps) => (
    <Form {...args}>
        <FormControl
            clickable
            label={{
                children: 'Input Label',
                required: false,
                htmlFor: 'label',
            }}
        >
            <TextInput id="label" value="some value" />
        </FormControl>
        <Box className="tw-my-2">
            <Button onClick={action('click')}>Save</Button>
        </Box>
    </Form>
);
