/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryObj } from '@storybook/react-vite';
import { action } from 'storybook/actions';

import { Heading } from '#/index';

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
        children: <p className="tw-body-small-x-strong tw-italic">Editable Text</p>,
    },
};

export const HugWidth: Story = {
    args: {
        hugWidth: true,
        children: 'Click to edit this text',
    },
};
