/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type LeafType } from '../types';

// This function handles the case of a string like this: "   foo   "
// Where it would be invalid markdown to generate this: "**   foo   **"
// We instead, want to trim the whitespace out, apply formatting, and then
// bring the whitespace back. So our returned string looks like this: "   **foo**   "
export function retainWhitespaceAndFormat(string: string, format: string[] | string) {
    const formats = Array.isArray(format) ? format : [format];
    const start = formats[0];
    const end = formats[1] ?? reverseStr(formats[0]);

    // we keep this for a comparison later
    const frozenString = string.trim();

    // children will be mutated
    const children = frozenString;

    // We reverse the right side formatting, to properly handle bold/italic and strikeThrough
    // formats, so we can create ~~***FooBar***~~
    const fullFormat = `${start}${children}${end}`;

    // This conditions accounts for no whitespace in our string
    // if we don't have any, we can return early.
    if (children.length === string.length) {
        return fullFormat;
    }

    // if we do have whitespace, let's add our formatting around our trimmed string
    // We reverse the right side formatting, to properly handle bold/italic and strikeThrough
    // formats, so we can create ~~***FooBar***~~
    const formattedString = start + children + end;

    // and replace the non-whitespace content of the string
    return string.replace(frozenString, formattedString);
}

const reverseStr = (string: string) => string.split('').reverse().join('');

export const applyFormattingToLeafNode = (children: string, chunk: LeafType) => {
    // Never allow decorating break tags with rich text formatting,
    // this can malform generated markdown
    // Also ensure we're only ever applying text formatting to leaf node
    // level chunks, otherwise we can end up in a situation where
    // we try applying formatting like to a node like this:
    // "Text foo bar **baz**" resulting in "**Text foo bar **baz****"
    // which is invalid markup and can mess everything up
    if (chunk.strikethrough && chunk.bold && chunk.italic) {
        children = retainWhitespaceAndFormat(children, '~~***');
    } else if (chunk.bold && chunk.italic) {
        children = retainWhitespaceAndFormat(children, '***');
    } else {
        if (chunk.bold) {
            children = retainWhitespaceAndFormat(children, '**');
        }

        if (chunk.italic) {
            children = retainWhitespaceAndFormat(children, '_');
        }

        if (chunk.strikethrough) {
            children = retainWhitespaceAndFormat(children, '~~');
        }

        if (chunk.code) {
            children = retainWhitespaceAndFormat(children, '`');
        }
    }

    children = replaceLineBreak(children, chunk);

    return children;
};

const replaceLineBreak = (children: string, chunk: LeafType) => {
    const lineBreak = '\n';
    if ((chunk.strikethrough || chunk.bold || chunk.italic) && new RegExp(lineBreak, 'g').test(children)) {
        children = children.replaceAll(lineBreak, '\\\n');
    }

    return children;
};
