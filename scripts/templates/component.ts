import ComponentFileBuilderResponse from "./ComponentFileBuilderResponse";
import { toKebabCase } from "./transforms";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (componentName: string, componentType: string): ComponentFileBuilderResponse => ({
    content: `/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FC } from "react";

export type ${componentName}Props = {
    foo: string;
};

export const ${componentName}: FC<${componentName}Props> = ({ foo }) => {
    return <div data-test-id="${toKebabCase(componentName)}">{foo}</div>;
};
`,
    extension: `.tsx`,
});
