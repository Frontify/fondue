/* (c) Copyright Frontify Ltd., all rights reserved. */

import type { ComponentFileBuilderResponse } from '../types';
import { toKebabCase } from '../transforms';

export const setup = (componentName: string): ComponentFileBuilderResponse => ({
    content: `/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ReactNode } from "react";

export type ${componentName}Props = { children?: ReactNode; };

export const ${componentName} = ({ children }: ${componentName}Props) => {
    return (
        <div data-test-id="${toKebabCase(componentName)}">
            {children}
        </div>
    );
};
${componentName}.displayName = "Fondue${componentName}";
`,
    extension: '.tsx',
});
