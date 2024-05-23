/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryObj } from '@storybook/react';

import { Button } from '../Button/Button';

import { Dialog, DialogContent, DialogRoot } from './Dialog';

type Story = StoryObj<typeof meta>;
const meta: Meta<typeof DialogContent> = {
    component: DialogContent,
    subcomponents: {
        // @ts-expect-error - Storybook has the wrong type for TooltipContent
        'Dialog.Root': DialogRoot,
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
            <Dialog.Root>
                <Dialog.Trigger>
                    <Button>Click Me</Button>
                </Dialog.Trigger>
                <Dialog.Content {...args}>
                    <Dialog.SideContent>
                        <div className="tw-bg-box-positive-strong tw-h-full tw-w-full"></div>
                    </Dialog.SideContent>
                    <Dialog.Header showCloseButton>Header</Dialog.Header>
                    <Dialog.Body {...args} />
                    <Dialog.Footer>
                        <div className="tw-flex tw-h-fit tw-justify-end tw-gap-2">
                            <Button emphasis="default">Cancel</Button>
                            <Button>Submit</Button>
                        </div>
                    </Dialog.Footer>
                </Dialog.Content>
            </Dialog.Root>
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
