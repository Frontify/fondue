/* (c) Copyright Frontify Ltd., all rights reserved. */

export const codeBlockMarkdown_0 = `\`\`\`
tell application "Foo";
    beep
end tell
\`\`\`
`;

const codeBlockMarkdown_1 = `\`\`\`
var add2 = function (number) {
    return number + 2;
};
\`\`\`
`;
export const codeBlockMarkdown = [codeBlockMarkdown_0, codeBlockMarkdown_1];

export const codeBlockTree_0 = [
    {
        type: 'code_block',
        language: null,
        children: [
            {
                text: `tell application "Foo";
    beep
end tell`,
            },
        ],
    },
];
export const codeBlockTree_1 = [
    {
        type: 'code_block',
        language: null,
        children: [
            {
                text: `var add2 = function (number) {
    return number + 2;
};`,
            },
        ],
    },
];

export const codeBlockTree = [codeBlockTree_0, codeBlockTree_1];
