/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ComponentFileBuilderResponse } from '../types';

export const Setup = (componentName: string): ComponentFileBuilderResponse => ({
    content: `---
description: ""
status: in_progress
---

## Usage Guidelines

<!-- Describe when and how to use ${componentName}. -->
`,
    extension: '.metadata.md',
});
