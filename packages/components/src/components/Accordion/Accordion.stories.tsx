/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconIcon, IconPen, IconTrashBin } from '@frontify/fondue-icons';
import { type Meta, type StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { action } from 'storybook/actions';

import { Badge, Button, ColorPicker, Dropdown, Flex, Flyout } from '#/index';

import { Accordion, AccordionContent, AccordionHeader, AccordionItem, AccordionRoot } from './Accordion';

type Story = StoryObj<typeof AccordionRoot>;
const meta: Meta<typeof AccordionRoot> = {
    component: AccordionRoot,
    tags: ['autodocs'],
    subcomponents: {
        'Accordion.Item': AccordionItem,
        'Accordion.Header': AccordionHeader,
        'Accordion.Content': AccordionContent,
    },
    parameters: {
        status: {
            type: 'released',
        },
    },
    args: {},
};
export default meta;

const ColorFlyOut = () => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <Flyout.Root open={isOpen} onOpenChange={setIsOpen}>
            <Flyout.Trigger>
                <ColorPicker.Input
                    aria-label="Color Picker"
                    currentColor={{
                        alpha: 0.8,
                        blue: 50,
                        green: 100,
                        red: 230,
                    }}
                    onClear={function () {}}
                />
            </Flyout.Trigger>
            <Flyout.Content maxWidth="600px">
                <Flyout.Body>
                    <div className="tw-p-2 md:tw-w-[450px]">
                        <ColorPicker.Root
                            defaultFormat="RGBA"
                            currentColor={{
                                alpha: 0.8,
                                blue: 50,
                                green: 100,
                                red: 230,
                            }}
                            onColorChange={function () {}}
                        >
                            <ColorPicker.Values />
                            <ColorPicker.Gradient />
                        </ColorPicker.Root>
                    </div>
                </Flyout.Body>
                <Flyout.Footer>
                    <Button emphasis="default" onPress={function () {}}>
                        Cancel
                    </Button>
                    <Button onPress={function () {}}>Save</Button>
                </Flyout.Footer>
            </Flyout.Content>
        </Flyout.Root>
    );
};

const ResizableContent = () => {
    const [showContent, setShowContent] = useState(true);

    return (
        <>
            <div className={!showContent ? 'tw-hidden' : ''}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </div>
            <Button onPress={() => setShowContent(!showContent)}>Toggle Content</Button>
        </>
    );
};

export const Default: Story = {
    args: {},
    render: (args) => {
        return (
            <Accordion.Root {...args}>
                <Accordion.Item value="accordion-test-0">
                    <Accordion.Header>
                        <Flex gap={2} align="center">
                            <IconIcon />
                            Item with icon
                        </Flex>
                    </Accordion.Header>
                    <Accordion.Content divider>
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt
                        ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo
                        dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor
                        sit amet.
                    </Accordion.Content>
                </Accordion.Item>

                <Accordion.Item value="accordion-test-1">
                    <Accordion.Header>
                        With action slot
                        <Accordion.Slot name="action">
                            <Button size="small" emphasis="default">
                                Click Me
                            </Button>
                        </Accordion.Slot>
                    </Accordion.Header>
                    <Accordion.Content>
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt
                        ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo
                        dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor
                        sit amet.
                    </Accordion.Content>
                </Accordion.Item>

                <Accordion.Item value="accordion-test-2">
                    <Accordion.Header>Item with dropdown child</Accordion.Header>
                    <Accordion.Content>
                        <Dropdown.Root>
                            <Dropdown.Trigger>
                                <Button>Trigger</Button>
                            </Dropdown.Trigger>
                            <Dropdown.Content>
                                <Dropdown.Item onSelect={function Js() {}}>Item 1</Dropdown.Item>
                                <Dropdown.Item onSelect={function Js() {}}>Item 2</Dropdown.Item>
                                <Dropdown.Item onSelect={function Js() {}}>Item 3</Dropdown.Item>
                            </Dropdown.Content>
                        </Dropdown.Root>
                    </Accordion.Content>
                </Accordion.Item>

                <Accordion.Item value="accordion-test-3">
                    <Accordion.Header>Item with flyout child</Accordion.Header>
                    <Accordion.Content>
                        <Flyout.Root>
                            <Flyout.Trigger>
                                <Button>Trigger</Button>
                            </Flyout.Trigger>
                            <Flyout.Content>
                                <Flyout.Body>Hello!</Flyout.Body>
                            </Flyout.Content>
                        </Flyout.Root>
                    </Accordion.Content>
                </Accordion.Item>

                <Accordion.Item value="accordion-test-4">
                    <Accordion.Header>Item with color picker flyout</Accordion.Header>
                    <Accordion.Content>
                        <ColorFlyOut />
                    </Accordion.Content>
                </Accordion.Item>

                <Accordion.Item value="accordion-test-5">
                    <Accordion.Header onClick={() => action('click')}>
                        Empty item with an onClick callback
                    </Accordion.Header>
                    <Accordion.Content />
                </Accordion.Item>

                <Accordion.Item value="accordion-test-6">
                    <Accordion.Header>Item with resizable content</Accordion.Header>
                    <Accordion.Content>
                        <ResizableContent />
                    </Accordion.Content>
                </Accordion.Item>

                <Accordion.Item value="accordion-test-7">
                    <Accordion.Header>Item without padding</Accordion.Header>
                    <Accordion.Content padding="none">
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt
                        ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo
                        dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor
                        sit amet.
                    </Accordion.Content>
                </Accordion.Item>

                <Accordion.Item value="accordion-test-8">
                    <Accordion.Header>
                        Item with badge
                        <Accordion.Slot>
                            <Flex gap={2}>
                                <Badge>42 entries</Badge>
                                <Badge emphasis="strong" variant="highlight">
                                    very pretty
                                </Badge>
                            </Flex>
                        </Accordion.Slot>
                        <Accordion.Slot name="action">
                            <Flex gap={1}>
                                <Button size="small" emphasis="weak" aspect="square">
                                    <IconPen size={16} />
                                </Button>
                                <Button size="small" emphasis="weak" aspect="square">
                                    <IconTrashBin size={16} />
                                </Button>
                            </Flex>
                        </Accordion.Slot>
                    </Accordion.Header>
                    <Accordion.Content>
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt
                        ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo
                        dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor
                        sit amet.
                    </Accordion.Content>
                </Accordion.Item>
            </Accordion.Root>
        );
    },
};

export const WithSmallPadding: Story = {
    args: {
        padding: 'small',
    },
    render: (args) => {
        return (
            <Accordion.Root {...args}>
                <Accordion.Item value="accordion-test-0">
                    <Accordion.Header>
                        <Flex gap={2} align="center">
                            <IconIcon />
                            Item with icon
                        </Flex>
                    </Accordion.Header>
                    <Accordion.Content divider>
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt
                        ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo
                        dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor
                        sit amet.
                    </Accordion.Content>
                </Accordion.Item>

                <Accordion.Item value="accordion-test-1">
                    <Accordion.Header>
                        With action slot
                        <Accordion.Slot name="action">
                            <Button size="small" emphasis="default">
                                Click Me
                            </Button>
                        </Accordion.Slot>
                    </Accordion.Header>
                    <Accordion.Content>
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt
                        ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo
                        dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor
                        sit amet.
                    </Accordion.Content>
                </Accordion.Item>

                <Accordion.Item value="accordion-test-2">
                    <Accordion.Header>Item with dropdown child</Accordion.Header>
                    <Accordion.Content>
                        <Dropdown.Root>
                            <Dropdown.Trigger>
                                <Button>Trigger</Button>
                            </Dropdown.Trigger>
                            <Dropdown.Content>
                                <Dropdown.Item onSelect={function Js() {}}>Item 1</Dropdown.Item>
                                <Dropdown.Item onSelect={function Js() {}}>Item 2</Dropdown.Item>
                                <Dropdown.Item onSelect={function Js() {}}>Item 3</Dropdown.Item>
                            </Dropdown.Content>
                        </Dropdown.Root>
                    </Accordion.Content>
                </Accordion.Item>

                <Accordion.Item value="accordion-test-3">
                    <Accordion.Header>Item with flyout child</Accordion.Header>
                    <Accordion.Content>
                        <Flyout.Root>
                            <Flyout.Trigger>
                                <Button>Trigger</Button>
                            </Flyout.Trigger>
                            <Flyout.Content>
                                <Flyout.Body>Hello!</Flyout.Body>
                            </Flyout.Content>
                        </Flyout.Root>
                    </Accordion.Content>
                </Accordion.Item>

                <Accordion.Item value="accordion-test-4">
                    <Accordion.Header>Item with color picker flyout</Accordion.Header>
                    <Accordion.Content>
                        <ColorFlyOut />
                    </Accordion.Content>
                </Accordion.Item>

                <Accordion.Item value="accordion-test-5">
                    <Accordion.Header onClick={() => action('click')}>
                        Empty item with an onClick callback
                    </Accordion.Header>
                    <Accordion.Content />
                </Accordion.Item>

                <Accordion.Item value="accordion-test-6">
                    <Accordion.Header>Item with resizable content</Accordion.Header>
                    <Accordion.Content>
                        <ResizableContent />
                    </Accordion.Content>
                </Accordion.Item>

                <Accordion.Item value="accordion-test-7">
                    <Accordion.Header>Item without padding</Accordion.Header>
                    <Accordion.Content padding="none">
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt
                        ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo
                        dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor
                        sit amet.
                    </Accordion.Content>
                </Accordion.Item>
            </Accordion.Root>
        );
    },
};
