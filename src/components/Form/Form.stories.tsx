/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { Form, FormProps } from './Form';
import { FormControl } from '@components/FormControl';
import { TextInput } from '@components/TextInput';
import { Button } from '@components/Button';
import { action } from '@storybook/addon-actions';
import { Box } from '@components/Box';

export default {
    title: 'Components/Form',
    component: Form,
    tags: ['autodocs'],
    args: {
        method: 'post',
        autoComplete: 'on',
        'data-test-id': 'fondue-form',
        action: '',
        encType: '',
        name: '',
        noValidate: false,
        target: '',
        rel: '',
    },
} as Meta<FormProps>;

export const Default: StoryFn<FormProps> = (args: FormProps) => (
    <Form {...args}>
        <FormControl
            clickable={true}
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
