/* (c) Copyright Frontify Ltd., all rights reserved. */

import { toCamelCase, toKebabCase } from '../transforms';
import { type ComponentFileBuilderResponse } from '../types';

export const Setup = (componentName: string): ComponentFileBuilderResponse => ({
    content: `/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ReactNode } from 'react';

import { ${toCamelCase(componentName)}Styles } from './styles/${toCamelCase(componentName)}Styles';

export type ${componentName}Props = { children?: ReactNode };

export const ${componentName} = ({ children }: ${componentName}Props) => {
    return (
        <div className={${toCamelCase(componentName)}Styles()} data-test-id="fondue-${toKebabCase(componentName)}">
            {children}
        </div>
    );
};
${componentName}.displayName = '${componentName}';
`,
    extension: '.tsx',
});
