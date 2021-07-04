import ComponentFileBuilderResponse from "./ComponentFileBuilderResponse";

export default (componentName: string): ComponentFileBuilderResponse => ({
    content: `/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Story, Meta } from "@storybook/react";

import ${componentName}, { ${componentName}Props } from "./${componentName}";

export default {
    title: "${componentName}",
    component: ${componentName},
} as Meta;

const ${componentName}Template: Story<${componentName}Props> = (args) => <${componentName} {...args} />;

export const Default = ${componentName}Template.bind({});

Default.args = {
    foo: "bar",
};
`,
    extension: `.stories.tsx`,
});
