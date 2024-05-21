/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryObj } from '@storybook/react';

import { Button } from '../Button/Button';

import { Flyout, FlyoutContent, FlyoutRoot } from './Flyout';

type Story = StoryObj<typeof meta>;
const meta: Meta<typeof FlyoutContent> = {
    component: FlyoutContent,
    subcomponents: {
        // @ts-expect-error - Storybook has the wrong type for TooltipContent
        'Flyout.Root': FlyoutRoot,
    },
    tags: ['autodocs'],
    parameters: {
        status: {
            type: 'in_progress',
        },
    },
    args: {},
    render: ({ ...args }) => {
        return (
            <Flyout.Root>
                <Flyout.Trigger>
                    <Button>Click Me</Button>
                </Flyout.Trigger>
                <Flyout.Content {...args}>
                    <Flyout.Header showCloseButton>Header</Flyout.Header>
                    <Flyout.Body>I am a flyout</Flyout.Body>
                    <Flyout.Footer>
                        <Button emphasis="default">Cancel</Button>
                        <Button>Submit</Button>
                    </Flyout.Footer>
                </Flyout.Content>
            </Flyout.Root>
        );
    },
};
export default meta;

export const Default: Story = {
    name: 'Text Label Only',
    args: {
        children: 'Hello World',
    },
};
