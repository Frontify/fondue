/* (c) Copyright Frontify Ltd., all rights reserved. */

import { toKebabCase } from '../transforms';
import { type ComponentFileBuilderResponse } from '../types';

export const Setup = (componentName: string): ComponentFileBuilderResponse => ({
    content: `/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ReactNode } from 'react';

import styles from './styles/${toKebabCase(componentName)}.module.scss';

export type ${componentName}Props = { children?: ReactNode };

export const ${componentName} = ({ children }: ${componentName}Props) => {
    return (
        <div className={styles.root} data-test-id="fondue-${toKebabCase(componentName)}">
            {children}
        </div>
    );
};
${componentName}.displayName = '${componentName}';
`,
    extension: '.tsx',
});
