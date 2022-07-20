/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { Meta, Story } from '@storybook/react';
import { ComponentThatMayCrash, ComponentThatMayCrashProps } from './ComponentThatMayCrash';
import { ErrorBoundary } from '@components/ErrorHandling/ErrorBoundary';

export default {
    title: 'Components/ComponentThatMayCrash',
    component: ComponentThatMayCrash,
} as Meta<ComponentThatMayCrashProps>;

const Template: Story<ComponentThatMayCrashProps> = (args) => {
    return (
        <div>
            <ComponentThatMayCrash {...args}>
                <p>Hello There! I do render correctly!</p>
            </ComponentThatMayCrash>
            <p>Some random text that should render anyway</p>
            <p>Some other content below</p>
        </div>
    );
};

const TemplateWithError: Story<ComponentThatMayCrashProps> = (args) => {
    return (
        <div>
            <ComponentThatMayCrash {...args}>{'ok'}</ComponentThatMayCrash>
            <p>Some random text that should render anyway</p>
            <p>Some other content below</p>
        </div>
    );
};

const TemplateWithBoundaries: Story<ComponentThatMayCrashProps> = (args) => {
    return (
        <div>
            <ErrorBoundary>
                <ComponentThatMayCrash {...args}>{'ok'}</ComponentThatMayCrash>
            </ErrorBoundary>
            <p>Some random text that should render anyway</p>
            <p>Some other content below</p>
        </div>
    );
};

export const validChildren = Template.bind({});

validChildren.args = {
    title: 'I have proper children',
};

export const invalidChildrenWithoutErrorBoundaries = TemplateWithError.bind({});

invalidChildrenWithoutErrorBoundaries.args = {
    title: 'I am a crashing component without boundaries',
};

export const invalidChildrenWithErrorBoundaries = TemplateWithBoundaries.bind({});

invalidChildrenWithErrorBoundaries.args = {
    title: 'I am a crashing component with boundaries',
};
