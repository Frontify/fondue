import ComponentFileBuilderResponse from "./ComponentFileBuilderResponse";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (componentName: string, componentType: string): ComponentFileBuilderResponse => ({
    content: `/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Story, Meta } from "@storybook/react";

import { ${componentName}, ${componentName}Props } from "./${componentName}";

export default {
    title: "${componentType[0].toUpperCase()}${componentType.slice(1)}/${componentName}",
    component: ${componentName},
} as Meta<${componentName}Props>;

const Template: Story<${componentName}Props> = (args) => <${componentName} {...args} />;

export const Default = Template.bind({});

Default.args = {
    args: {
        foo: "bar",
    },
};
`,
    extension: `.stories.tsx`,
});
