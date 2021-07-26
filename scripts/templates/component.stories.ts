import ComponentFileBuilderResponse from "./ComponentFileBuilderResponse";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (componentName: string, componentType: string): ComponentFileBuilderResponse => ({
    content: `/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Story, Meta } from "@storybook/react";

import ${componentName}Component, { ${componentName}Props } from "./${componentName}";

export default {
    title: "${componentType[0].toUpperCase()}${componentType.slice(1)}/${componentName}",
    component: ${componentName}Component,
    args: {
        foo: "bar",
    },
} as Meta<${componentName}Props>;

export const ${componentName}: Story<${componentName}Props> = (args) => <${componentName}Component {...args} />;
`,
    extension: `.stories.tsx`,
});
