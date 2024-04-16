/* (c) Copyright Frontify Ltd., all rights reserved. */

import { toKebabCase } from '../../transforms';
import { type ComponentFileBuilderResponse } from '../../types';

export const setup = (componentName: string): ComponentFileBuilderResponse => ({
    content: `/* (c) Copyright Frontify Ltd., all rights reserved. */
import { expect, test } from '@playwright/experimental-ct-react';
import { ${componentName} } from "../${componentName}";

const ${componentName}_TEST_ID = "test-${toKebabCase(componentName)}";
const ${componentName}_TEXT = "sample ${toKebabCase(componentName)}";

test('should render without error', async ({ mount }) => {
    const component = await mount(<${componentName} data-test-id={${componentName}_TEST_ID}>{${componentName}_TEXT}</${componentName}>);
    await expect(component).toBeVisible()
    await expect(component).toContainText(${componentName}_TEXT)
});

`,
    extension: '.ct.tsx',
    subdirectory: '__tests__',
});
