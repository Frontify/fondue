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
                    <Dialog.Header>Header</Dialog.Header>
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

export const WithHeader: Story = {
    name: 'With Header',
    args: {
        children: 'I am a dialog content',
    },
    render: ({ ...args }) => {
        return (
            <Dialog.Root>
                <Dialog.Trigger>
                    <Button>Click Me</Button>
                </Dialog.Trigger>
                <Dialog.Content {...args}>
                    <Dialog.Header>Header</Dialog.Header>
                    <Dialog.Body {...args} />
                </Dialog.Content>
            </Dialog.Root>
        );
    },
};

export const WithFooter: Story = {
    name: 'With Footer',
    args: {
        children: 'I am a dialog content',
    },
    render: ({ ...args }) => {
        return (
            <Dialog.Root>
                <Dialog.Trigger>
                    <Button>Click Me</Button>
                </Dialog.Trigger>
                <Dialog.Content {...args}>
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

export const WithSideContent: Story = {
    name: 'With Side Content',
    args: {
        children: 'I am a dialog content',
    },
    render: ({ ...args }) => {
        return (
            <Dialog.Root>
                <Dialog.Trigger>
                    <Button>Click Me</Button>
                </Dialog.Trigger>
                <Dialog.Content {...args}>
                    <Dialog.SideContent>
                        <div className="tw-bg-box-positive-strong tw-h-full tw-w-40"></div>
                    </Dialog.SideContent>
                    <Dialog.Body {...args} />
                </Dialog.Content>
            </Dialog.Root>
        );
    },
};

export const WithLongText: Story = {
    name: 'With Long Text',
    args: {
        children:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Consequat interdum varius sit amet mattis vulputate enim nulla aliquet. Eu lobortis elementum nibh tellus molestie nunc non blandit. Massa tincidunt nunc pulvinar sapien et ligula. Fringilla urna porttitor rhoncus dolor purus non enim praesent elementum. Facilisis gravida neque convallis a cras semper auctor neque vitae. Urna porttitor rhoncus dolor purus non enim. A iaculis at erat pellentesque adipiscing commodo. Tristique magna sit amet purus gravida quis. Magna ac placerat vestibulum lectus mauris ultrices eros. Libero volutpat sed cras ornare arcu dui. Imperdiet sed euismod nisi porta lorem mollis aliquam. Odio pellentesque diam volutpat commodo. Varius vel pharetra vel turpis nunc. Justo nec ultrices dui sapien eget mi proin sed. Consectetur adipiscing elit ut aliquam. Arcu dictum varius duis at consectetur lorem. Pharetra diam sit amet nisl. Odio ut sem nulla pharetra diam sit. Nam aliquam sem et tortor consequat id. Egestas maecenas pharetra convallis posuere morbi leo urna. Id volutpat lacus laoreet non curabitur. Sagittis purus sit amet volutpat consequat mauris nunc. Eu nisl nunc mi ipsum faucibus. Pretium viverra suspendisse potenti nullam ac. Enim neque volutpat ac tincidunt vitae semper. Rutrum tellus pellentesque eu tincidunt tortor aliquam nulla facilisi. Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Orci eu lobortis elementum nibh tellus molestie nunc non blandit. Maecenas accumsan lacus vel facilisis volutpat est. Porttitor massa id neque aliquam vestibulum morbi blandit cursus. Tempor orci dapibus ultrices in iaculis nunc sed augue lacus. Facilisis sed odio morbi quis commodo. Aliquam sem et tortor consequat id porta nibh venenatis cras. Adipiscing at in tellus integer feugiat scelerisque. Netus et malesuada fames ac turpis egestas sed tempus. Eget mauris pharetra et ultrices.',
    },
    render: ({ ...args }) => {
        return (
            <Dialog.Root>
                <Dialog.Trigger>
                    <Button>Click Me</Button>
                </Dialog.Trigger>
                <Dialog.Content {...args}>
                    <Dialog.SideContent>
                        <div className="tw-bg-box-positive-strong tw-h-full tw-w-40"></div>
                    </Dialog.SideContent>
                    <Dialog.Header>Header</Dialog.Header>
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

export const Mobile: Story = {
    name: 'Mobile View',
    parameters: {
        viewport: {
            viewports: {
                mobile: {
                    name: 'Mobile',
                    styles: {
                        width: '375px',
                        height: '667px',
                    },
                },
            },
            defaultViewport: 'mobile',
        },
    },
    args: {
        children: 'Hello World',
    },
};
