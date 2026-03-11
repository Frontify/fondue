/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryObj } from '@storybook/react-vite';
import { within } from '@testing-library/react';
import { action } from 'storybook/actions';
import { useRef } from 'storybook/internal/preview-api';

import { Button, Flex, Heading } from '#/index';

import { EditableText } from './EditableText';

type Story = StoryObj<typeof EditableText>;
const meta: Meta<typeof EditableText> = {
    title: 'Components/Editable Text',
    component: EditableText,
    tags: ['autodocs'],
    parameters: {
        status: {
            type: 'released',
        },
    },
    args: {
        onChange: action('onChange'),
    },
};
export default meta;

export const Default: Story = {
    args: {
        children: 'Click to edit this text',
    },
};

export const AsHeading: Story = {
    args: {
        asChild: true,
        children: (
            <Heading as="h1" size="x-large">
                Editable Heading
            </Heading>
        ),
    },
};

export const CustomTextStyling: Story = {
    args: {
        asChild: true,
        children: <p className="tw-body-small-x-strong">Editable Text</p>,
    },
};

export const FullWidth: Story = {
    args: {
        hugWidth: false,
        children: 'Click to edit this text',
    },
};

export const triggerEditingExternally: Story = {
    args: {
        children: 'Click to edit this text',
    },
    render: (args) => {
        const editableTextRef = useRef<HTMLElement | null>(null);
        return (
            <Flex gapX={8}>
                <EditableText {...args} ref={editableTextRef} />
                <Button
                    onPress={() => {
                        editableTextRef.current?.focus();
                    }}
                >
                    Edit
                </Button>
            </Flex>
        );
    },
};
