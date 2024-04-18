/* (c) Copyright Frontify Ltd., all rights reserved. */

import { toKebabCase } from '../../transforms';
import { type ComponentFileBuilderResponse } from '../../types';

export const Setup = (componentName: string): ComponentFileBuilderResponse => ({
    content: `/* (c) Copyright Frontify Ltd., all rights reserved. */

import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { ${componentName} } from '../${componentName}';

const ${componentName}_TEST_ID = 'test-${toKebabCase(componentName)}';
const ${componentName}_TEXT = 'sample ${toKebabCase(componentName)}';

describe('${componentName} Component', () => {
    it('should render foo text correctly', () => {
        const { getByTestId } = render(<${componentName} data-test-id={${componentName}_TEST_ID}>{${componentName}_TEXT}</${componentName}>);
        const component = getByTestId(${componentName}_TEST_ID);
        expect(component).toContain(${componentName}_TEXT);
    });
});
`,
    extension: '.spec.tsx',
    subdirectory: '__tests__',
});
