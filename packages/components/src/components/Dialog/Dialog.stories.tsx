/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryObj } from '@storybook/react-vite';
import { forwardRef, useState } from 'react';

import { Button } from '../Button/Button';
import { Flex } from '../Flex/Flex';
import { Flyout } from '../Flyout/Flyout';
import { ScrollArea } from '../ScrollArea/ScrollArea';
import { TextInput } from '../TextInput/TextInput';
import { Tooltip } from '../Tooltip/Tooltip';

import {
    Dialog,
    DialogBody,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogRoot,
    DialogSideContent,
    DialogTitle,
    DialogTrigger,
} from './Dialog';

type Story = StoryObj<typeof meta>;
const meta: Meta<typeof DialogContent> = {
    title: 'Components/Dialog',
    component: DialogContent,
    subcomponents: {
        'Dialog.Root': DialogRoot,
        'Dialog.Trigger': DialogTrigger,
        'Dialog.SideContent': DialogSideContent,
        'Dialog.Header': DialogHeader,
        'Dialog.Body': DialogBody,
        'Dialog.Title': DialogTitle,
        'Dialog.Description': DialogDescription,
        'Dialog.Close': DialogClose,
    },
    tags: ['autodocs'],
    parameters: {
        status: {
            type: 'released',
        },
    },
    args: {},
    render: (args) => {
        return (
            <Dialog.Root>
                <Dialog.Trigger>
                    <Button>Open dialog</Button>
                </Dialog.Trigger>
                <Dialog.Content {...args}>
                    <Dialog.SideContent>
                        <div className="tw-bg-success tw-h-full tw-w-full"></div>
                    </Dialog.SideContent>
                    <Dialog.Header>
                        <Dialog.Title>Header</Dialog.Title>
                    </Dialog.Header>
                    <Dialog.Body {...args} />
                    <Dialog.Footer>
                        <Button emphasis="default">Cancel</Button>
                        <Button>Submit</Button>
                    </Dialog.Footer>
                </Dialog.Content>
            </Dialog.Root>
        );
    },
};
export default meta;

export const WithFullLayout: Story = {
    args: {
        children: 'I am a dialog content',
    },
};

export const WithHeader: Story = {
    args: {
        children: 'I am a dialog content',
    },
    render: (args) => {
        return (
            <Dialog.Root>
                <Dialog.Trigger>
                    <Button>Open dialog</Button>
                </Dialog.Trigger>
                <Dialog.Content {...args}>
                    <Dialog.Header>
                        <Dialog.Title>Header</Dialog.Title>
                    </Dialog.Header>
                    <Dialog.Body {...args} />
                </Dialog.Content>
            </Dialog.Root>
        );
    },
};

export const WithCloseButton: Story = {
    args: {
        children: 'I am a dialog content',
    },
    render: (args) => {
        return (
            <Dialog.Root>
                <Dialog.Trigger>
                    <Button>Open dialog</Button>
                </Dialog.Trigger>
                <Dialog.Content {...args}>
                    <Dialog.Header showCloseButton>
                        <Dialog.Title>Header</Dialog.Title>
                    </Dialog.Header>
                    <Dialog.Body {...args} />
                </Dialog.Content>
            </Dialog.Root>
        );
    },
};

export const WithFooter: Story = {
    args: {
        children: 'I am a dialog content',
    },
    render: (args) => {
        return (
            <Dialog.Root>
                <Dialog.Trigger>
                    <Button>Open dialog</Button>
                </Dialog.Trigger>
                <Dialog.Content {...args}>
                    <Dialog.Body {...args} />
                    <Dialog.Footer>
                        <Button emphasis="default">Cancel</Button>
                        <Button>Submit</Button>
                    </Dialog.Footer>
                </Dialog.Content>
            </Dialog.Root>
        );
    },
};

export const WithSideContent: Story = {
    args: {
        children: 'I am a dialog content',
    },
    render: (args) => {
        return (
            <Dialog.Root>
                <Dialog.Trigger>
                    <Button>Open dialog</Button>
                </Dialog.Trigger>
                <Dialog.Content {...args}>
                    <Dialog.SideContent>
                        <div className="tw-bg-success tw-h-full tw-min-w-40"></div>
                    </Dialog.SideContent>
                    <Dialog.Body {...args} />
                </Dialog.Content>
            </Dialog.Root>
        );
    },
};

export const WithUnderlay: Story = {
    args: {
        children: 'I am a dialog content',
        showUnderlay: true,
    },
    render: (args) => {
        return (
            <Dialog.Root>
                <Dialog.Trigger>
                    <Button>Open dialog</Button>
                </Dialog.Trigger>
                <Dialog.Content {...args}>
                    <Dialog.Header>
                        <Dialog.Title>Header</Dialog.Title>
                    </Dialog.Header>
                    <Dialog.Body {...args} />
                </Dialog.Content>
            </Dialog.Root>
        );
    },
};

export const WithLongText: Story = {
    args: {
        children:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Consequat interdum varius sit amet mattis vulputate enim nulla aliquet. Eu lobortis elementum nibh tellus molestie nunc non blandit. Massa tincidunt nunc pulvinar sapien et ligula. Fringilla urna porttitor rhoncus dolor purus non enim praesent elementum. Facilisis gravida neque convallis a cras semper auctor neque vitae. Urna porttitor rhoncus dolor purus non enim. A iaculis at erat pellentesque adipiscing commodo. Tristique magna sit amet purus gravida quis. Magna ac placerat vestibulum lectus mauris ultrices eros. Libero volutpat sed cras ornare arcu dui. Imperdiet sed euismod nisi porta lorem mollis aliquam. Odio pellentesque diam volutpat commodo. Varius vel pharetra vel turpis nunc. Justo nec ultrices dui sapien eget mi proin sed. Consectetur adipiscing elit ut aliquam. Arcu dictum varius duis at consectetur lorem. Pharetra diam sit amet nisl. Odio ut sem nulla pharetra diam sit. Nam aliquam sem et tortor consequat id. Egestas maecenas pharetra convallis posuere morbi leo urna. Id volutpat lacus laoreet non curabitur. Sagittis purus sit amet volutpat consequat mauris nunc. Eu nisl nunc mi ipsum faucibus. Pretium viverra suspendisse potenti nullam ac. Enim neque volutpat ac tincidunt vitae semper. Rutrum tellus pellentesque eu tincidunt tortor aliquam nulla facilisi. Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Orci eu lobortis elementum nibh tellus molestie nunc non blandit. Maecenas accumsan lacus vel facilisis volutpat est. Porttitor massa id neque aliquam vestibulum morbi blandit cursus. Tempor orci dapibus ultrices in iaculis nunc sed augue lacus. Facilisis sed odio morbi quis commodo. Aliquam sem et tortor consequat id porta nibh venenatis cras. Adipiscing at in tellus integer feugiat scelerisque. Netus et malesuada fames ac turpis egestas sed tempus. Eget mauris pharetra et ultrices.',
    },
    render: (args) => {
        return (
            <Dialog.Root>
                <Dialog.Trigger>
                    <Button>Open dialog</Button>
                </Dialog.Trigger>
                <Dialog.Content {...args}>
                    <Dialog.SideContent>
                        <div className="tw-bg-success tw-h-full tw-min-w-40"></div>
                    </Dialog.SideContent>
                    <Dialog.Header>
                        <Dialog.Title>Header</Dialog.Title>
                    </Dialog.Header>
                    <Dialog.Body {...args} />
                    <Dialog.Footer>
                        <Button emphasis="default">Cancel</Button>
                        <Button>Submit</Button>
                    </Dialog.Footer>
                </Dialog.Content>
            </Dialog.Root>
        );
    },
};

export const WithCustomElementForClose: Story = {
    args: {
        children: 'I am a dialog content',
    },
    render: (args) => {
        return (
            <Dialog.Root>
                <Dialog.Trigger>
                    <Button>Open dialog</Button>
                </Dialog.Trigger>
                <Dialog.Content {...args}>
                    <Dialog.SideContent>
                        <div className="tw-bg-success tw-h-full tw-min-w-40"></div>
                    </Dialog.SideContent>
                    <Dialog.Header>
                        <Dialog.Title asChild>
                            <h2>Dialog Header</h2>
                        </Dialog.Title>
                    </Dialog.Header>
                    <Dialog.Body {...args} />
                    <Dialog.Footer>
                        <Dialog.Close>
                            <Button emphasis="default">Cancel</Button>
                        </Dialog.Close>
                        <Button>Submit</Button>
                    </Dialog.Footer>
                </Dialog.Content>
            </Dialog.Root>
        );
    },
};

export const WithAnnouncedDescription: Story = {
    args: {
        children: 'I am a dialog content',
    },
    render: (args) => {
        return (
            <Dialog.Root>
                <Dialog.Trigger>
                    <Button>Open dialog</Button>
                </Dialog.Trigger>
                <Dialog.Content {...args}>
                    <Dialog.SideContent>
                        <div className="tw-bg-success tw-h-full tw-min-w-40"></div>
                    </Dialog.SideContent>
                    <Dialog.Header>
                        <Dialog.Title>Dialog Header</Dialog.Title>
                    </Dialog.Header>
                    <Dialog.Body>
                        <Dialog.Description>{args.children}</Dialog.Description>
                    </Dialog.Body>
                    <Dialog.Footer>
                        <Button emphasis="default">Cancel</Button>
                        <Button>Submit</Button>
                    </Dialog.Footer>
                </Dialog.Content>
            </Dialog.Root>
        );
    },
};

export const WithCustomElementAnnouncements: Story = {
    args: {
        children:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Consequat interdum varius sit amet mattis vulputate enim nulla aliquet. Eu lobortis elementum nibh tellus molestie nunc non blandit. Massa tincidunt nunc pulvinar sapien et ligula. Fringilla urna porttitor rhoncus dolor purus non enim praesent elementum. Facilisis gravida neque convallis a cras semper auctor neque vitae. Urna porttitor rhoncus dolor purus non enim. A iaculis at erat pellentesque adipiscing commodo. Tristique magna sit amet purus gravida quis. Magna ac placerat vestibulum lectus mauris ultrices eros. Libero volutpat sed cras ornare arcu dui. Imperdiet sed euismod nisi porta lorem mollis aliquam. Odio pellentesque diam volutpat commodo. Varius vel pharetra vel turpis nunc. Justo nec ultrices dui sapien eget mi proin sed. Consectetur adipiscing elit ut aliquam. Arcu dictum varius duis at consectetur lorem. Pharetra diam sit amet nisl. Odio ut sem nulla pharetra diam sit. Nam aliquam sem et tortor consequat id. Egestas maecenas pharetra convallis posuere morbi leo urna. Id volutpat lacus laoreet non curabitur. Sagittis purus sit amet volutpat consequat mauris nunc. Eu nisl nunc mi ipsum faucibus. Pretium viverra suspendisse potenti nullam ac. Enim neque volutpat ac tincidunt vitae semper. Rutrum tellus pellentesque eu tincidunt tortor aliquam nulla facilisi. Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Orci eu lobortis elementum nibh tellus molestie nunc non blandit. Maecenas accumsan lacus vel facilisis volutpat est. Porttitor massa id neque aliquam vestibulum morbi blandit cursus. Tempor orci dapibus ultrices in iaculis nunc sed augue lacus. Facilisis sed odio morbi quis commodo. Aliquam sem et tortor consequat id porta nibh venenatis cras. Adipiscing at in tellus integer feugiat scelerisque. Netus et malesuada fames ac turpis egestas sed tempus. Eget mauris pharetra et ultrices.',
    },
    render: (args) => {
        return (
            <Dialog.Root>
                <Dialog.Trigger>
                    <Button>Open dialog</Button>
                </Dialog.Trigger>
                <Dialog.Content {...args}>
                    <Dialog.SideContent>
                        <div className="tw-bg-success tw-h-full tw-min-w-40"></div>
                    </Dialog.SideContent>
                    <Dialog.Header>
                        <Dialog.Title asChild>
                            <h2>Dialog Header</h2>
                        </Dialog.Title>
                    </Dialog.Header>
                    <Dialog.Body>
                        <Dialog.Description asChild>
                            <p>{args.children}</p>
                        </Dialog.Description>
                    </Dialog.Body>
                    <Dialog.Footer>
                        <Button emphasis="default">Cancel</Button>
                        <Button>Submit</Button>
                    </Dialog.Footer>
                </Dialog.Content>
            </Dialog.Root>
        );
    },
};

export const WithFocusableContent: Story = {
    args: {
        children: 'Hello World',
    },
    render: (args) => {
        return (
            <Dialog.Root>
                <Dialog.Trigger>
                    <Button>Open flyout</Button>
                </Dialog.Trigger>
                <Dialog.Content {...args}>
                    <Dialog.Header>Header</Dialog.Header>
                    <Dialog.Body {...args}>
                        <TextInput />
                        <TextInput />
                        <TextInput />
                    </Dialog.Body>
                </Dialog.Content>
            </Dialog.Root>
        );
    },
};

export const WithNoPadding: Story = {
    render: (args) => {
        return (
            <Dialog.Root>
                <Dialog.Trigger>
                    <Button>Open dialog</Button>
                </Dialog.Trigger>
                <Dialog.Content {...args}>
                    <Dialog.Header padding="none">
                        <Flex justify="space-between" align="center" width="100%" pr="1rem">
                            <Dialog.Title>Header</Dialog.Title>
                            <Button
                                emphasis="default"
                                onPress={() => {
                                    alert('Button in the header clicked');
                                }}
                            >
                                Button in the header
                            </Button>
                        </Flex>
                    </Dialog.Header>
                    <Dialog.Body padding="none">None</Dialog.Body>
                    <Dialog.Footer padding="none">
                        <Button emphasis="default">Cancel</Button>
                        <Button>Submit</Button>
                    </Dialog.Footer>
                </Dialog.Content>
            </Dialog.Root>
        );
    },
};

export const WithTightPadding: Story = {
    render: (args) => {
        return (
            <Dialog.Root>
                <Dialog.Trigger>
                    <Button>Open dialog</Button>
                </Dialog.Trigger>
                <Dialog.Content {...args}>
                    <Dialog.Header padding="tight">
                        <Flex justify="space-between" align="center" width="100%" pr="1rem">
                            <Dialog.Title>Header</Dialog.Title>
                            <Button
                                emphasis="default"
                                onPress={() => {
                                    alert('Button in the header clicked');
                                }}
                            >
                                Button in the header
                            </Button>
                        </Flex>
                    </Dialog.Header>
                    <Dialog.Body padding="tight">Tight</Dialog.Body>
                    <Dialog.Footer padding="tight">
                        <Button emphasis="default">Cancel</Button>
                        <Button>Submit</Button>
                    </Dialog.Footer>
                </Dialog.Content>
            </Dialog.Root>
        );
    },
};

export const WithCompactPadding: Story = {
    render: (args) => {
        return (
            <Dialog.Root>
                <Dialog.Trigger>
                    <Button>Open dialog</Button>
                </Dialog.Trigger>
                <Dialog.Content {...args}>
                    <Dialog.Header padding="compact">
                        <Flex justify="space-between" align="center" width="100%" pr="1rem">
                            <Dialog.Title>Header</Dialog.Title>
                            <Button
                                emphasis="default"
                                onPress={() => {
                                    alert('Button in the header clicked');
                                }}
                            >
                                Button in the header
                            </Button>
                        </Flex>
                    </Dialog.Header>
                    <Dialog.Body padding="compact">Compact</Dialog.Body>
                    <Dialog.Footer padding="compact">
                        <Button emphasis="default">Cancel</Button>
                        <Button>Submit</Button>
                    </Dialog.Footer>
                </Dialog.Content>
            </Dialog.Root>
        );
    },
};

export const WithComfortablePadding: Story = {
    render: (args) => {
        return (
            <Dialog.Root>
                <Dialog.Trigger>
                    <Button>Open dialog</Button>
                </Dialog.Trigger>
                <Dialog.Content {...args}>
                    <Dialog.Header padding="comfortable">
                        <Flex justify="space-between" align="center" width="100%" pr="1rem">
                            <Dialog.Title>Header</Dialog.Title>
                            <Button
                                emphasis="default"
                                onPress={() => {
                                    alert('Button in the header clicked');
                                }}
                            >
                                Button in the header
                            </Button>
                        </Flex>
                    </Dialog.Header>
                    <Dialog.Body padding="comfortable">Confortable</Dialog.Body>
                    <Dialog.Footer padding="comfortable">
                        <Button emphasis="default">Cancel</Button>
                        <Button>Submit</Button>
                    </Dialog.Footer>
                </Dialog.Content>
            </Dialog.Root>
        );
    },
};

export const WithSpaciousPadding: Story = {
    render: (args) => {
        return (
            <Dialog.Root>
                <Dialog.Trigger>
                    <Button>Open dialog</Button>
                </Dialog.Trigger>
                <Dialog.Content {...args}>
                    <Dialog.Header padding="spacious">
                        <Flex justify="space-between" align="center" width="100%" pr="1rem">
                            <Dialog.Title>Header</Dialog.Title>
                            <Button
                                emphasis="default"
                                onPress={() => {
                                    alert('Button in the header clicked');
                                }}
                            >
                                Button in the header
                            </Button>
                        </Flex>
                    </Dialog.Header>
                    <Dialog.Body padding="spacious">Spacious</Dialog.Body>
                    <Dialog.Footer padding="spacious">
                        <Button emphasis="default">Cancel</Button>
                        <Button>Submit</Button>
                    </Dialog.Footer>
                </Dialog.Content>
            </Dialog.Root>
        );
    },
};

export const TopAligned: Story = {
    args: {
        verticalAlign: 'top',
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
    args: {
        children: 'Hello World',
    },
};

export const WithoutBorders: Story = {
    args: {
        children: 'I am a dialog content',
    },
    render: (args) => {
        return (
            <Dialog.Root>
                <Dialog.Trigger>
                    <Button>Open dialog</Button>
                </Dialog.Trigger>
                <Dialog.Content {...args}>
                    <Dialog.Header showBorder={false}>
                        <Dialog.Title>Header</Dialog.Title>
                    </Dialog.Header>
                    <Dialog.Body {...args} />
                    <Dialog.Footer showBorder={false}>
                        <Button emphasis="default">Cancel</Button>
                        <Button>Submit</Button>
                    </Dialog.Footer>
                </Dialog.Content>
            </Dialog.Root>
        );
    },
};

export const ControlledComponent: Story = {
    args: {
        children: 'I am a dialog content',
    },
    render: (args) => {
        const [isDialogOpen, setIsDialogOpen] = useState(false);
        return (
            <Dialog.Root
                open={isDialogOpen}
                onOpenChange={(state) => {
                    setIsDialogOpen(state);
                }}
            >
                <Dialog.Trigger>
                    <Button>Open dialog</Button>
                </Dialog.Trigger>
                <Dialog.Content {...args}>
                    <Dialog.Header>
                        <Dialog.Title>Header</Dialog.Title>
                    </Dialog.Header>
                    <Dialog.Body {...args} />
                </Dialog.Content>
            </Dialog.Root>
        );
    },
};

export const WithFlyoutAndTooltip: Story = {
    render: (args) => {
        const ButtonWithTooltip = forwardRef<HTMLButtonElement | null, { text: string; tooltipText: string }>(
            ({ text, tooltipText }, ref) => {
                return (
                    <Tooltip.Root>
                        <Tooltip.Trigger>
                            <div>
                                <Flyout.Trigger>
                                    <Button ref={ref}>{text}</Button>
                                </Flyout.Trigger>
                            </div>
                        </Tooltip.Trigger>
                        <Tooltip.Content side="left">{tooltipText}</Tooltip.Content>
                    </Tooltip.Root>
                );
            },
        );
        ButtonWithTooltip.displayName = 'ButtonWithTooltip';

        return (
            <Dialog.Root>
                <Dialog.Trigger>
                    <Button>Open dialog</Button>
                </Dialog.Trigger>
                <Dialog.Content {...args} showUnderlay>
                    <Dialog.Body>
                        <Flex direction="column" gap="8px" align="flex-start">
                            <Flyout.Root>
                                <Flyout.Trigger>
                                    <Button>Open flyout</Button>
                                </Flyout.Trigger>
                                <Flyout.Content>
                                    <Flyout.Header>Header</Flyout.Header>
                                    <Flyout.Body>I am a flyout</Flyout.Body>
                                </Flyout.Content>
                            </Flyout.Root>

                            <Tooltip.Root>
                                <Tooltip.Trigger>
                                    <Button>I am a tooltip, hover me</Button>
                                </Tooltip.Trigger>
                                <Tooltip.Content side="left">Tooltip content</Tooltip.Content>
                            </Tooltip.Root>

                            <Flyout.Root>
                                <ButtonWithTooltip
                                    text="Open flyout (and I am a tooltip too)"
                                    tooltipText="Tooltip text"
                                />
                                <Flyout.Content>
                                    <Flyout.Header>Header</Flyout.Header>
                                    <Flyout.Body>I am a flyout</Flyout.Body>
                                </Flyout.Content>
                            </Flyout.Root>
                        </Flex>
                    </Dialog.Body>

                    <Dialog.Footer>
                        <Button emphasis="default">Cancel</Button>
                        <Button>Submit</Button>
                    </Dialog.Footer>
                </Dialog.Content>
            </Dialog.Root>
        );
    },
};

export const WithButtonInTheHeader: Story = {
    render: (args) => {
        return (
            <Dialog.Root>
                <Dialog.Trigger>
                    <Button>Open dialog</Button>
                </Dialog.Trigger>
                <Dialog.Content>
                    <Dialog.Header>
                        <Flex justify="space-between" align="center" width="100%" pr="1rem">
                            <Dialog.Title>Header</Dialog.Title>
                            <Button
                                emphasis="default"
                                onPress={() => {
                                    alert('Button in the header clicked');
                                }}
                            >
                                Button in the header
                            </Button>
                        </Flex>
                    </Dialog.Header>
                    <Dialog.Body {...args} />
                    <Dialog.Footer>
                        <Button emphasis="default">Cancel</Button>
                        <Button>Submit</Button>
                    </Dialog.Footer>
                </Dialog.Content>
            </Dialog.Root>
        );
    },
};

export const WithTooltip: Story = {
    args: {
        children: 'I am a dialog content',
    },
    render: (args) => (
        <Dialog.Root>
            <Tooltip.Root>
                <Tooltip.Trigger asChild>
                    <span style={{ display: 'inline-flex' }}>
                        <Dialog.Trigger asChild>
                            <Button>Trigger</Button>
                        </Dialog.Trigger>
                    </span>
                </Tooltip.Trigger>
                <Tooltip.Content>Dropdown tooltip</Tooltip.Content>
            </Tooltip.Root>
            <Dialog.Content>
                <Dialog.Body {...args} />
            </Dialog.Content>
        </Dialog.Root>
    ),
};

export const WithScrollArea: Story = {
    render: (args) => {
        return (
            <Dialog.Root>
                <Dialog.Trigger>
                    <Button>Open dialog</Button>
                </Dialog.Trigger>
                <Dialog.Content {...args}>
                    <Dialog.Header showCloseButton>
                        <Dialog.Title>Dialog with ScrollArea</Dialog.Title>
                    </Dialog.Header>
                    <Dialog.Body padding="none">
                        <ScrollArea maxHeight="400px" padding="comfortable">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                            laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                            voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                            cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            <br />
                            <br />
                            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
                            laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
                            architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
                            aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione
                            voluptatem sequi nesciunt.
                            <br />
                            <br />
                            Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci
                            velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam
                            quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis
                            suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?
                            <br />
                            <br />
                            Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae
                            consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur? At vero eos et
                            accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti
                            atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non
                            provident.
                            <br />
                            <br />
                            Similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.
                            Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta
                            nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere
                            possimus, omnis voluptas assumenda est, omnis dolor repellendus.
                            <br />
                            <br />
                            Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut
                            et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a
                            sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis
                            doloribus asperiores repellat.
                            <br />
                            <br />
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua. Consequat interdum varius sit amet mattis vulputate enim
                            nulla aliquet. Eu lobortis elementum nibh tellus molestie nunc non blandit. Massa tincidunt
                            nunc pulvinar sapien et ligula ullamcorper malesuada proin libero.
                        </ScrollArea>
                    </Dialog.Body>
                    <Dialog.Footer>
                        <Button emphasis="default">Cancel</Button>
                        <Button>Submit</Button>
                    </Dialog.Footer>
                </Dialog.Content>
            </Dialog.Root>
        );
    },
};

export const OnEscapeKeyDown: Story = {
    render: (args) => {
        return (
            <Dialog.Root>
                <Dialog.Trigger>
                    <Button>Open dialog</Button>
                </Dialog.Trigger>
                <Dialog.Content
                    {...args}
                    onEscapeKeyDown={() => {
                        alert('Escape key was pressed!');
                    }}
                >
                    <Dialog.Header>
                        <Dialog.Title>Dialog with onEscapeKeyDown</Dialog.Title>
                    </Dialog.Header>
                    <Dialog.Body>
                        This dialog will show an alert when you press the Escape key, then close normally.
                    </Dialog.Body>
                    <Dialog.Footer>
                        <Button emphasis="default">Cancel</Button>
                        <Button>Submit</Button>
                    </Dialog.Footer>
                </Dialog.Content>
            </Dialog.Root>
        );
    },
};

export const PreventCloseOnEscape: Story = {
    render: (args) => {
        return (
            <Dialog.Root>
                <Dialog.Trigger>
                    <Button>Open dialog</Button>
                </Dialog.Trigger>
                <Dialog.Content
                    {...args}
                    onEscapeKeyDown={(event) => {
                        event.preventDefault();
                        alert('Escape key pressed, but dialog will not close!');
                    }}
                >
                    <Dialog.Header>
                        <Dialog.Title>Dialog preventing close on Escape</Dialog.Title>
                    </Dialog.Header>
                    <Dialog.Body>
                        This dialog prevents closing when Escape is pressed. You must use the Cancel button or close
                        button to close it.
                    </Dialog.Body>
                    <Dialog.Footer>
                        <Dialog.Close>
                            <Button emphasis="default">Cancel</Button>
                        </Dialog.Close>
                        <Button>Submit</Button>
                    </Dialog.Footer>
                </Dialog.Content>
            </Dialog.Root>
        );
    },
};
