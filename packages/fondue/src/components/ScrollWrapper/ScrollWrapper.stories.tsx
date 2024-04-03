/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useId } from '@react-aria/utils';
import { type Meta, type StoryFn } from '@storybook/react';
import { useState } from 'react';

import { Button } from '@components/Button';
import { FormControl, FormControlDirection, FormControlStyle } from '@components/FormControl';
import { TextInput } from '@components/TextInput';

import { ScrollWrapper } from './ScrollWrapper';
import { ScrollWrapperDirection, type ScrollWrapperProps } from './types';

export default {
    title: 'Components/ScrollWrapper',
    component: ScrollWrapper,
    tags: ['autodocs'],
    argTypes: {
        scrollShadows: {
            control: { type: 'boolean' },
            defaultValue: false,
        },
        direction: {
            options: Object.values(ScrollWrapperDirection),
            control: { type: 'select' },
            defaultValue: ScrollWrapperDirection.Vertical,
        },
        tabindex: {
            control: { type: 'number' },
            defaultValue: 0,
        },
    },
    args: {
        direction: ScrollWrapperDirection.Vertical,
        tabindex: 0,
        'data-test-id': 'custom-data-test-id',
        scrollShadows: true,
    },
} as Meta<ScrollWrapperProps>;

export const Default: StoryFn<ScrollWrapperProps> = (args) => {
    const [input, setInput] = useState('');

    return (
        <div className="tw-max-h-[300px] tw-flex tw-flex-col">
            <ScrollWrapper {...args}>
                <p className="tw-w-[200px]">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor velit reiciendis nobis assumenda
                    itaque tenetur ducimus quia qui! Tempore enim beatae est suscipit excepturi iure explicabo, fugiat
                    perferendis consequatur.
                </p>
                <p className="tw-w-[200px] ">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor velit reiciendis nobis assumenda
                    itaque tenetur ducimus quia qui! Tempore enim beatae est suscipit excepturi iure explicabo, fugiat
                    perferendis consequatur.
                </p>
                <p className="tw-w-[200px]">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor velit reiciendis nobis assumenda
                    itaque tenetur ducimus quia qui! Tempore enim beatae est suscipit excepturi iure explicabo, fugiat
                    perferendis consequatur.
                </p>
                <div className="tw-my-4">
                    <FormControl
                        style={FormControlStyle.Primary}
                        direction={FormControlDirection.Vertical}
                        label={{
                            children: 'Input Label',
                            required: false,
                            htmlFor: useId(),
                            tooltip: { content: 'Tooltip Text' },
                        }}
                    >
                        <TextInput value={input} onChange={setInput} />
                    </FormControl>
                </div>
                <Button>Action</Button>
            </ScrollWrapper>
        </div>
    );
};
