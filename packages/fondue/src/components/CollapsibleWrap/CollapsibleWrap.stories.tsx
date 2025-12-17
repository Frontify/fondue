/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryFn } from '@storybook/react-vite';

import { Heading } from '@typography/Heading';
import { Text } from '@typography/Text';

import { CollapsibleWrap as CollapsibleWrapComponent } from './CollapsibleWrap';
import { type CollapsibleWrapProps } from './types';

/**
 ### *Legacy component warning*
 #### This is a deprecated component. It will be removed in the next major version.
 #### _**Use the [new Accordion component](/docs/current_components-accordion--documentation) instead.**_
 */
export default {
    title: 'Legacy Components/Deprecated/Collapsible Wrap',
    component: CollapsibleWrapComponent,
    tags: ['autodocs'],
    args: { isOpen: true, animateOpacity: true },
    parameters: {
        status: {
            type: 'deprecated',
        },
    },
} as Meta<CollapsibleWrapProps>;

export const CollapsibleWrap: StoryFn<CollapsibleWrapProps> = (args) => (
    <div className="tw-border tw-border-black-10 tw-rounded-md">
        <div className="tw-divide-y tw-divide-black-10">
            <div className="tw-p-3">
                <Heading>Collapsible Wrap</Heading>
            </div>
            <CollapsibleWrapComponent {...args}>
                <div className="tw-h-[200px] tw-p-5 tw-bg-black-5 tw-flex tw-justify-center tw-items-center tw-flex-col">
                    <Text>I am the child content of the Collapsible Wrap Component.</Text>
                    <Text>Toggle the open state to hide me.</Text>
                </div>
            </CollapsibleWrapComponent>
        </div>
    </div>
);

export const CollapsibleWrapNoStartingAnimation: StoryFn<CollapsibleWrapProps> = (args) => (
    <div className="tw-border tw-border-black-10 tw-rounded-md">
        <div className="tw-divide-y tw-divide-black-10">
            <div className="tw-p-3">
                <Heading>Collapsible Wrap Without First Animation</Heading>
            </div>
            <CollapsibleWrapComponent {...args} preventInitialAnimation>
                <div className="tw-h-[200px] tw-p-5 tw-bg-black-5 tw-flex tw-justify-center tw-items-center tw-flex-col">
                    <Text>I am the child content of the Collapsible Wrap Component.</Text>
                    <Text>Toggle the open state to hide me.</Text>
                </div>
            </CollapsibleWrapComponent>
        </div>
    </div>
);
