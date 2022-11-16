/* (c) Copyright Frontify Ltd., all rights reserved. */

export const codeBlockMarkdown = `\`\`\`
tell application "Foo";
    beep
end tell
\`\`\`
`;

export const codeBlockTree = [
    {
        type: 'code_block',
        language: null,
        children: [
            {
                text: 'tell application "Foo";\n    beep\nend tell',
            },
        ],
    },
];
