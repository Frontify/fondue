/* (c) Copyright Frontify Ltd., all rights reserved. */

import ComponentFileBuilderResponse from './ComponentFileBuilderResponse';
import { toKebabCase } from './transforms';

// eslint-disable-next-line @typescript-eslint/no-unused-vars,import/no-default-export
export default (componentName: string, componentType: string): ComponentFileBuilderResponse => ({
    content: `/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { PropsWithChildren } from "react";

export type ${componentName}Props = PropsWithChildren<{ foo: string }>;

export const ${componentName} = ({ foo, children }: ${componentName}Props) => {
    return (
        <div data-test-id="${toKebabCase(componentName)}">
            <div>{foo}</div>
            {children}
        </div>
    );
};
`,
    extension: '.tsx',
});
