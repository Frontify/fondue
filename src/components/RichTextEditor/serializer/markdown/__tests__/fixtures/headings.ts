/* (c) Copyright Frontify Ltd., all rights reserved. */

import { exampleTextStyles } from '@components/RichTextEditor/helpers/exampleValues';

export const headingsMarkdown = `# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6
`;

export const headingsTree = [
    {
        type: exampleTextStyles.heading1,
        children: [
            {
                text: 'Heading 1',
            },
        ],
    },
    {
        type: exampleTextStyles.heading2,
        children: [
            {
                text: 'Heading 2',
            },
        ],
    },
    {
        type: exampleTextStyles.heading3,
        children: [
            {
                text: 'Heading 3',
            },
        ],
    },
    {
        type: exampleTextStyles.heading4,
        children: [
            {
                text: 'Heading 4',
            },
        ],
    },
    {
        type: 'h5',
        children: [
            {
                text: 'Heading 5',
            },
        ],
    },
    {
        type: 'h6',
        children: [
            {
                text: 'Heading 6',
            },
        ],
    },
];
