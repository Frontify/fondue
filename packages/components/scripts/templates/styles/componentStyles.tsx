/* (c) Copyright Frontify Ltd., all rights reserved. */

import { toCamelCase } from 'scripts/transforms';

import { type ComponentFileBuilderResponse } from '../../types';

export const Setup = (componentName: string): ComponentFileBuilderResponse => ({
    content: `/* (c) Copyright Frontify Ltd., all rights reserved. */

import { sv } from '#/utilities/styleUtilities';

export const ${toCamelCase(componentName)}Styles = sv({
    base: 'tw-block',
});
`,
    extension: 'Styles.tsx',
    subdirectory: 'styles',
});
