/* (c) Copyright Frontify Ltd., all rights reserved. */

export const codeBlockMD = `\`\`\`
tell application &quot;Foo&quot;
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
                text: 'tell application &quot;Foo&quot;\n    beep\nend tell',
            },
        ],
    },
];
