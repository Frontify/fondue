/* (c) Copyright Frontify Ltd., all rights reserved. */

import { toKebabCase } from '../transforms';
import { type ComponentFileBuilderResponse } from '../types';

export const Setup = (componentName: string): ComponentFileBuilderResponse => ({
    content: `/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ReactNode } from "react";

import { ${componentName}Styles } from './styles/${componentName}Styles';

export type ${componentName}Props = { children?: ReactNode; };

export const ${componentName} = ({ children }: ${componentName}Props) => {
    return (
        <div className={${componentName}Styles()} data-test-id="${toKebabCase(componentName)}">
            {children}
        </div>
    );
};
${componentName}.displayName = "${componentName}";
`,
    extension: '.tsx',
});
