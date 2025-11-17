/* (c) Copyright Frontify Ltd., all rights reserved. */

export const codeBlockMarkdown0 = `\`\`\`
tell application "Foo";
    beep
end tell
\`\`\`
`;

const codeBlockMarkdown1 = `\`\`\`
var add2 = function (number) {
    return number + 2;
};
\`\`\`
`;

const codeBlockMarkdown2 = `\`\`\`
<!DOCTYPE html>
<html>
<body>

<h1>My First Heading</h1>

<p>My first paragraph.</p>

</body>
</html>
\`\`\`
`;
export const codeBlockMarkdown = [codeBlockMarkdown0, codeBlockMarkdown1, codeBlockMarkdown2];

export const codeBlockTree0 = [
    {
        type: 'code_block',
        language: undefined,
        children: [
            {
                text: `tell application "Foo";
    beep
end tell`,
            },
        ],
    },
];

export const codeBlockTree1 = [
    {
        type: 'code_block',
        language: undefined,
        children: [
            {
                text: `var add2 = function (number) {
    return number + 2;
};`,
            },
        ],
    },
];

export const codeBlockTree2 = [
    {
        type: 'code_block',
        language: undefined,
        children: [
            {
                text: '<!DOCTYPE html>\n<html>\n<body>\n\n<h1>My First Heading</h1>\n\n<p>My first paragraph.</p>\n\n</body>\n</html>',
            },
        ],
    },
];
export const codeBlockTree = [codeBlockTree0, codeBlockTree1, codeBlockTree2];
