/* (c) Copyright Frontify Ltd., all rights reserved. */

export const headingsMD = `# heading 1
## heading 2
### heading 3
#### heading 4
##### heading 5
###### heading 6
`;

export const headingsTree = [
    {
        type: 'h1',
        children: [
            {
                text: 'heading 1',
            },
        ],
    },
    {
        type: 'h2',
        children: [
            {
                text: 'heading 2',
            },
        ],
    },
    {
        type: 'h3',
        children: [
            {
                text: 'heading 3',
            },
        ],
    },
    {
        type: 'h4',
        children: [
            {
                text: 'heading 4',
            },
        ],
    },
    {
        type: 'h5',
        children: [
            {
                text: 'heading 5',
            },
        ],
    },
    {
        type: 'h6',
        children: [
            {
                text: 'heading 6',
            },
        ],
    },
];
