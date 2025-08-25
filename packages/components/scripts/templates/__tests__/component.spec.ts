/* (c) Copyright Frontify Ltd., all rights reserved. */

import { toKebabCase, toUpperSnakeCase } from '../../transforms';
import { type ComponentFileBuilderResponse } from '../../types';

export const Setup = (componentName: string): ComponentFileBuilderResponse => ({
    content: `/* (c) Copyright Frontify Ltd., all rights reserved. */

import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { ${componentName} } from '../${componentName}';

const ${toUpperSnakeCase(componentName)}_TEST_ID = 'test-${toKebabCase(componentName)}';
const ${toUpperSnakeCase(componentName)}_TEXT = 'sample ${toKebabCase(componentName)}';

describe('${componentName} Component', () => {
    it('should render foo text correctly', () => {
        const { getByTestId } = render(<${componentName} data-test-id={${toUpperSnakeCase(componentName)}_TEST_ID}>{${toUpperSnakeCase(componentName)}_TEXT}</${componentName}>);
        const component = getByTestId(${toUpperSnakeCase(componentName)}_TEST_ID);
        expect(component).toContain(${toUpperSnakeCase(componentName)}_TEXT);
    });
});
`,
    extension: '.spec.tsx',
    subdirectory: '__tests__',
});
