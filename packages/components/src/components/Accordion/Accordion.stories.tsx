/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryObj } from '@storybook/react';

import {
    Accordion,
    AccordionRoot,
    AccordionHeader,
    AccordionItem,
    AccordionContent,
    AccordionTrigger,
} from './Accordion';

type Story = StoryObj<typeof AccordionRoot>;
const meta: Meta<typeof AccordionRoot> = {
    component: AccordionRoot,
    tags: ['autodocs'],
    subcomponents: {
        // @ts-expect-error Storybook has the wrong type for subcomponents
        'Accordion.Item': AccordionItem,
        // @ts-expect-error Storybook has the wrong type for subcomponents
        'Accordion.Header': AccordionHeader,
        // @ts-expect-error Storybook has the wrong type for subcomponents
        'Accordion.Trigger': AccordionTrigger,
        // @ts-expect-error Storybook has the wrong type for subcomponents
        'Accordion.Content': AccordionContent,
    },
    parameters: {
        status: {
            type: 'in_progress',
        },
    },
    args: {},
};
export default meta;

export const Default: Story = {
    args: {},
    render: () => {
        return (
            <Accordion.Root>
                <Accordion.Item value="plain-text">
                    <Accordion.Header>
                        <Accordion.Trigger>Item with plain text child</Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content>
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt
                        ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo
                        dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor
                        sit amet.
                    </Accordion.Content>
                </Accordion.Item>

                <Accordion.Item value="plain-text-2">
                    <Accordion.Header>
                        <Accordion.Trigger>Item with plain text child</Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content>
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt
                        ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo
                        dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor
                        sit amet.
                    </Accordion.Content>
                </Accordion.Item>

                <Accordion.Item value="plain-text-3">
                    <Accordion.Header>
                        <Accordion.Trigger>Item with plain text child</Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content>
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt
                        ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo
                        dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor
                        sit amet.
                    </Accordion.Content>
                </Accordion.Item>

                <Accordion.Item value="plain-text-4">
                    <Accordion.Header>
                        <Accordion.Trigger>Item with plain text child</Accordion.Trigger>
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
