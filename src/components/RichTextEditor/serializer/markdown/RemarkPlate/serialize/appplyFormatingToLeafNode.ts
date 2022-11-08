/* (c) Copyright Frontify Ltd., all rights reserved. */

import { LeafType } from '../astTypes';

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

    return children;
};

const reverseStr = (string: string) => string.split('').reverse().join('');

// This function handles the case of a string like this: "   foo   "
// Where it would be invalid markdown to generate this: "**   foo   **"
// We instead, want to trim the whitespace out, apply formatting, and then
// bring the whitespace back. So our returned string looks like this: "   **foo**   "
function retainWhitespaceAndFormat(string: string, format: string) {
    // we keep this for a comparison later
    const frozenString = string.trim();

    // children will be mutated
    const children = frozenString;

    // We reverse the right side formatting, to properly handle bold/italic and strikeThrough
    // formats, so we can create ~~***FooBar***~~
    const fullFormat = `${format}${children}${reverseStr(format)}`;

    // This conditions accounts for no whitespace in our string
    // if we don't have any, we can return early.
    if (children.length === string.length) {
        return fullFormat;
    }

    // if we do have whitespace, let's add our formatting around our trimmed string
    // We reverse the right side formatting, to properly handle bold/italic and strikeThrough
    // formats, so we can create ~~***FooBar***~~
    const formattedString = format + children + reverseStr(format);

    // and replace the non-whitespace content of the string
    return string.replace(frozenString, formattedString);
}
