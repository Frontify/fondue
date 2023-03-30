/* (c) Copyright Frontify Ltd., all rights reserved. */

import type { ComponentFileBuilderResponse } from '../types';
import { toKebabCase } from '../transforms';

export const setup = (componentName: string): ComponentFileBuilderResponse => ({
    content: `/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { ReactNode } from "react";

export type ${componentName}Props = { foo: string; children?: ReactNode; };

export const ${componentName} = ({ foo, children }: ${componentName}Props) => {
    return (
        <div data-test-id="${toKebabCase(componentName)}">
            <div>{foo}</div>
            {children}
        </div>
    );
};
${componentName}.displayName = "Fondue${componentName}";
`,
    extension: '.tsx',
});
