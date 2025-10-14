/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryObj } from '@storybook/react-vite';

import { Button } from '../Button/Button';
import { TextInput } from '../TextInput/TextInput';
import { Tooltip } from '../Tooltip/Tooltip';

import { Flyout, FlyoutBody, FlyoutContent, FlyoutFooter, FlyoutHeader, FlyoutRoot, FlyoutTrigger } from './Flyout';

type Story = StoryObj<typeof meta>;
const meta: Meta<typeof FlyoutContent> = {
    component: FlyoutContent,
    subcomponents: {
        'Flyout.Root': FlyoutRoot,

        'Flyout.Trigger': FlyoutTrigger,

        'Flyout.Header': FlyoutHeader,

        'Flyout.Body': FlyoutBody,

        'Flyout.Footer': FlyoutFooter,
    },
    tags: ['autodocs'],
    parameters: {
        status: {
            type: 'released',
        },
    },
    args: {
        children: 'Hello World',
    },
    render: ({ ...args }) => {
        return (
            <Flyout.Root>
                <Flyout.Trigger>
                    <Button>Open flyout</Button>
                </Flyout.Trigger>
                <Flyout.Content {...args}>
                    <Flyout.Header showCloseButton>Header</Flyout.Header>
                    <Flyout.Body {...args} />
                    <Flyout.Footer>
                        <div className="tw-flex tw-justify-end tw-gap-2">
                            <Button emphasis="default">Cancel</Button>
                            <Button>Submit</Button>
                        </div>
                    </Flyout.Footer>
                </Flyout.Content>
            </Flyout.Root>
        );
    },
};
export default meta;

export const BasicContent: Story = {
    args: {
        children: 'Hello World',
    },
    render: ({ ...args }) => {
        return (
            <Flyout.Root>
                <Flyout.Trigger>
                    <Button>Open flyout</Button>
                </Flyout.Trigger>
                <Flyout.Content {...args}>
                    <Flyout.Body {...args} />
                </Flyout.Content>
            </Flyout.Root>
        );
    },
};

export const WithHeader: Story = {
    render: ({ ...args }) => {
        return (
            <Flyout.Root>
                <Flyout.Trigger>
                    <Button>Open flyout</Button>
                </Flyout.Trigger>
                <Flyout.Content {...args}>
                    <Flyout.Header>Header</Flyout.Header>
                    <Flyout.Body>I am a flyout</Flyout.Body>
                </Flyout.Content>
            </Flyout.Root>
        );
    },
};

export const WithFooter: Story = {
    render: ({ ...args }) => {
        return (
            <Flyout.Root>
                <Flyout.Trigger>
                    <Button>Open flyout</Button>
                </Flyout.Trigger>
                <Flyout.Content {...args}>
                    <Flyout.Body>I am a flyout</Flyout.Body>
                    <Flyout.Footer>
                        <Button>Submit</Button>
                    </Flyout.Footer>
                </Flyout.Content>
            </Flyout.Root>
        );
    },
};

export const WithFocusableContent: Story = {
    args: {
        children: 'Hello World',
    },
    render: ({ ...args }) => {
        return (
            <Flyout.Root>
                <Flyout.Trigger>
                    <Button>Open flyout</Button>
                </Flyout.Trigger>
                <Flyout.Content {...args}>
                    <Flyout.Header>Header</Flyout.Header>
                    <Flyout.Body {...args}>
                        <TextInput />
                        <TextInput />
                        <TextInput />
                    </Flyout.Body>
                </Flyout.Content>
            </Flyout.Root>
        );
    },
};

export const WithHeaderAndFooter: Story = {};

export const WithHeaderAndFooterAndScrollableContent: Story = {
    render: ({ ...args }) => {
        return (
            <Flyout.Root>
                <Flyout.Trigger>
                    <Button>Open flyout</Button>
                </Flyout.Trigger>
                <Flyout.Content {...args}>
                    <Flyout.Header>Header</Flyout.Header>
                    <Flyout.Body scrollable>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur voluptate velit esse
                        cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                        culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur
                        adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                        minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                        mollit anim id est laborum.
                    </Flyout.Body>
                    <Flyout.Footer>
                        <Button>Submit</Button>
                    </Flyout.Footer>
                </Flyout.Content>
            </Flyout.Root>
        );
    },
};

export const WithCloseButton: Story = {
    render: ({ ...args }) => {
        return (
            <Flyout.Root>
                <Flyout.Trigger>
                    <Button>Open flyout</Button>
                </Flyout.Trigger>
                <Flyout.Content {...args}>
                    <Flyout.Header showCloseButton>Header</Flyout.Header>
                    <Flyout.Body>I am a flyout</Flyout.Body>
                </Flyout.Content>
            </Flyout.Root>
        );
    },
};

export const WithNoPadding: Story = {
    args: {
        padding: 'none',
    },
};

export const WithTightPadding: Story = {
    args: {
        padding: 'tight',
    },
};

export const WithComfortablePadding: Story = {
    args: {
        padding: 'comfortable',
    },
};

export const WithSpaciousPadding: Story = {
    args: {
        padding: 'spacious',
    },
};

export const WithCustomContent: Story = {
    render: ({ ...args }) => {
        return (
            <Flyout.Root>
                <Flyout.Trigger>
                    <Button>Open flyout</Button>
                </Flyout.Trigger>
                <Flyout.Content {...args}>
                    <div className="tw-bg-box-neutral tw-p-10">This is FlyoutContent</div>
                </Flyout.Content>
            </Flyout.Root>
        );
    },
};

export const RightSide: Story = {
    args: {
        side: 'right',
    },
};

export const AlignCenter: Story = {
    args: {
        side: 'right',
        align: 'center',
    },
};

export const AlignEnd: Story = {
    args: {
        side: 'right',
        align: 'end',
    },
};

export const LongContent: Story = {
    args: {
        side: 'bottom',
        children:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    },
};

export const WithCustomWidth: Story = {
    args: {
        width: '500px',
        side: 'bottom',
        children: 'Lorem ipsum dolor sit amet.',
    },
};

export const WithCustomMaxWidth: Story = {
    args: {
        maxWidth: '200px',
        side: 'bottom',
        children:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    },
};

export const MobileView: Story = {
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
    render: ({ ...args }) => {
        return (
            <Flyout.Root>
                <Flyout.Trigger>
                    <Button>Open flyout</Button>
                </Flyout.Trigger>
                <Flyout.Content {...args}>
                    <Flyout.Header showCloseButton>Header</Flyout.Header>
                    <Flyout.Body>I am a flyout</Flyout.Body>
                    <Flyout.Footer>
                        <Button>Submit</Button>
                    </Flyout.Footer>
                </Flyout.Content>
            </Flyout.Root>
        );
    },
};

export const MobileViewBottom: Story = {
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
    render: ({ ...args }) => {
        return (
            <Flyout.Root>
                <Flyout.Trigger>
                    <Button className="tw-mt-[590px] tw-ml-28">Open flyout</Button>
                </Flyout.Trigger>
                <Flyout.Content {...args}>
                    <Flyout.Header showCloseButton>Header</Flyout.Header>
                    <Flyout.Body>I am a flyout</Flyout.Body>
                    <Flyout.Footer>
                        <Button>Submit</Button>
                    </Flyout.Footer>
                </Flyout.Content>
            </Flyout.Root>
        );
    },
};

export const Overflow: Story = {
    decorators: [
        (Story) => (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 32, margin: '100px 300px' }}>
                <Story />
            </div>
        ),
    ],
    parameters: {
        viewport: {
            viewports: {
                desktop: {
                    name: 'Desktop',
                    styles: {
                        width: '800px',
                        height: '500px',
                    },
                },
            },
            defaultViewport: 'desktop',
        },
    },
    render: ({ ...args }) => (
        <>
            {Array.from({ length: 4 }).map((_, index) => (
                <Flyout.Root {...args} key={index}>
                    <Flyout.Trigger>
                        <Button>Trigger {index}</Button>
                    </Flyout.Trigger>
                    <Flyout.Content>
                        <Flyout.Header>Flyout {index}</Flyout.Header>
                        <Flyout.Body>
                            <p>Lorem ipsum dolor sit amet</p>
                            <p>Lorem ipsum dolor sit amet</p>
                            <p>Lorem ipsum dolor sit amet</p>
                            <p>Lorem ipsum dolor sit amet</p>
                            <p>Lorem ipsum dolor sit amet</p>
                            <p>Lorem ipsum dolor sit amet</p>
                        </Flyout.Body>
                    </Flyout.Content>
                </Flyout.Root>
            ))}
        </>
    ),
};

export const WithTooltip: Story = {
    args: {
        children: 'Hello World',
    },
    render: (args) => (
        <Flyout.Root>
            <Tooltip.Root>
                <Tooltip.Trigger asChild>
                    <Flyout.Trigger asChild>
                        <Button>Trigger</Button>
                    </Flyout.Trigger>
                </Tooltip.Trigger>
                <Tooltip.Content>Flyout tooltip</Tooltip.Content>
            </Tooltip.Root>
            <Flyout.Content>
                <Flyout.Body {...args} />
            </Flyout.Content>
        </Flyout.Root>
    ),
};

export const SpaciousTriggerOffset: Story = {
    args: {
        children: 'Hello World',
        triggerOffset: 'spacious',
    },
    render: ({ ...args }) => {
        return (
            <Flyout.Root>
                <Flyout.Trigger>
                    <Button>Open flyout</Button>
                </Flyout.Trigger>
                <Flyout.Content {...args}>
                    <Flyout.Body {...args} />
                </Flyout.Content>
            </Flyout.Root>
        );
    },
};

export const SpaciousViewportCollisionPadding: Story = {
    args: {
        children: 'Hello World',
        viewportCollisionPadding: 'spacious',
    },
    render: ({ ...args }) => {
        return (
            <Flyout.Root>
                <Flyout.Trigger>
                    <Button>Open flyout</Button>
                </Flyout.Trigger>
                <Flyout.Content {...args}>
                    <Flyout.Body {...args} />
                </Flyout.Content>
            </Flyout.Root>
        );
    },
};
