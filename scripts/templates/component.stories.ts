/* (c) Copyright Frontify Ltd., all rights reserved. */

/* eslint-disable storybook/default-exports, storybook/prefer-pascal-case */

import type { ComponentFileBuilderResponse } from '../types';

export const setup = (componentName: string, componentType: string): ComponentFileBuilderResponse => ({
    content: `/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import { ${componentName}, ${componentName}Props } from "./${componentName}";

export default {
    title: "${componentType[0].toUpperCase()}${componentType.slice(1)}/${componentName}",
    component: ${componentName},
    tags: ['autodocs'],
} as Meta<${componentName}Props>;

const Template: StoryFn<${componentName}Props> = (args) => <${componentName} {...args} />;

export const Default = Template.bind({});

Default.args = {
    foo: "bar",
};
`,
    extension: '.stories.tsx',
});
