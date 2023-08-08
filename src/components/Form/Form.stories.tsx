/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { Form, FormProps } from './Form';
import { FormControl, FormControlProps } from '@components/FormControl';
import { TextInput } from '@components/TextInput';
import { Button } from '@components/Button';
import { action } from '@storybook/addon-actions';
import { Box } from '@components/Box';

export default {
    title: 'Components/Form',
    component: Form,
    tags: ['autodocs'],
} as Meta<FormProps>;

export const Default: StoryFn<FormControlProps> = () => {
    const [input, setInput] = useState('');

    return (
        <Form method="post" autoComplete="true">
            <FormControl
                clickable={true}
                label={{
                    children: 'Input Label',
                    required: false,
                    htmlFor: 'label',
                    tooltip: { content: 'Tooltip Text' },
                }}
            >
                <TextInput id="label" value={input} onChange={setInput} />
            </FormControl>
            <Box className="tw-my-2">
                <Button onClick={action('click')}>Save</Button>
            </Box>
        </Form>
    );
};
