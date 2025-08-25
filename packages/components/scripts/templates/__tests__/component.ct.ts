/* (c) Copyright Frontify Ltd., all rights reserved. */

import { toKebabCase, toUpperSnakeCase } from '../../transforms';
import { type ComponentFileBuilderResponse } from '../../types';

export const Setup = (componentName: string): ComponentFileBuilderResponse => ({
    content: `/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';

import { ${componentName} } from '../${componentName}';

const ${toUpperSnakeCase(componentName)}_TEST_ID = 'test-${toKebabCase(componentName)}';
const ${toUpperSnakeCase(componentName)}_TEXT = 'sample ${toKebabCase(componentName)}';

test('should render without error', async ({ mount }) => {
    const component = await mount(<${componentName} data-test-id={${toUpperSnakeCase(componentName)}_TEST_ID}>{${toUpperSnakeCase(componentName)}_TEXT}</${componentName}>);
    await expect(component).toBeVisible();
    await expect(component).toContainText(${toUpperSnakeCase(componentName)}_TEXT);
});
`,
    extension: '.ct.tsx',
    subdirectory: '__tests__',
});
