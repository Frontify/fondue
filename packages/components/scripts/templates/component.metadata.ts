/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ComponentFileBuilderResponse } from '../types';

export const Setup = (componentName: string): ComponentFileBuilderResponse => ({
    content: `{
  "name": "${componentName}",
  "storyFilePaths": ["src/components/${componentName}/${componentName}.stories.tsx"],
  "description": "",
  "category": "",
  "tags": [],
  "relatedComponents": [],
  "instructions": ""
}
`,
    extension: '.metadata.json',
});
