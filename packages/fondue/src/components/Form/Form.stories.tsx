/* (c) Copyright Frontify Ltd., all rights reserved. */

import { action } from '@storybook/addon-actions';
import { type Meta, type StoryFn } from '@storybook/react';

import { Box } from '@components/Box/Box';
import { Button } from '@components/Button/Button';
import { FormControl } from '@components/FormControl';
import { TextInput } from '@components/TextInput/TextInput';

import { Form, type FormProps } from './Form';

/**
 ### This component is deprecated, please use the your own form component instead.
 For use in frontify `web-app`, you can use the common `Form` component.
 */
export default {
    title: 'Legacy Components/Deprecated/Form',
    component: Form,
    tags: ['autodocs'],
    parameters: {
        status: {
            type: 'deprecated',
        },
    },
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
