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

const codeBlockMarkdown_2 = `\`\`\`
<!DOCTYPE html>
<html>
<body>

<h1>My First Heading</h1>

<p>My first paragraph.</p>

</body>
</html>
\`\`\`
`;
export const codeBlockMarkdown = [codeBlockMarkdown_0, codeBlockMarkdown_1, codeBlockMarkdown_2];

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

export const codeBlockTree_2 = [
    {
        type: 'code_block',
        language: null,
        children: [
            {
                text: '<!DOCTYPE html>\n<html>\n<body>\n\n<h1>My First Heading</h1>\n\n<p>My first paragraph.</p>\n\n</body>\n</html>',
            },
        ],
    },
];
export const codeBlockTree = [codeBlockTree_0, codeBlockTree_1, codeBlockTree_2];
