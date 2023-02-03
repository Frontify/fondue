/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import { CollapsibleWrapProps } from './types';
import { CollapsibleWrap as CollapsibleWrapComponent } from './CollapsibleWrap';
import { Text } from '@typography/Text';
import { Heading } from '@typography/Heading';
import { Card } from '@components/Card';

export default {
    title: 'Components/Collapsible Wrap',
    component: CollapsibleWrapComponent,
    tags: ['autodocs'],
    args: { isOpen: true, animateOpacity: true },
} as Meta<CollapsibleWrapProps>;

export const CollapsibleWrap: StoryFn<CollapsibleWrapProps> = (args) => (
    <Card>
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
    </Card>
);

export const CollapsibleWrapNoStartingAnimation: StoryFn<CollapsibleWrapProps> = (args) => (
    <Card>
        <div className="tw-divide-y tw-divide-black-10">
            <div className="tw-p-3">
                <Heading>Collapsible Wrap Without First Animation</Heading>
            </div>
            <CollapsibleWrapComponent {...args} preventInitialAnimation={true}>
                <div className="tw-h-[200px] tw-p-5 tw-bg-black-5 tw-flex tw-justify-center tw-items-center tw-flex-col">
                    <Text>I am the child content of the Collapsible Wrap Component.</Text>
                    <Text>Toggle the open state to hide me.</Text>
                </div>
            </CollapsibleWrapComponent>
        </div>
    </Card>
);
