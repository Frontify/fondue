/* (c) Copyright Frontify Ltd., all rights reserved. */

/**
 * Compile-time assertions for the document types.
 * `tsc --noEmit` is the test runner: an unused @ts-expect-error fails the build.
 */
import { createDocument, type FrontifyText } from './index';

// createDocument checks block literals without any annotations
const doc = createDocument([
    { type: 'heading', level: 2, children: [{ text: 'x', bold: true }] },
    { type: 'image', src: 'https://example.com/pic.png' },
]);

// @ts-expect-error unknown block types must be rejected
const badBlock = createDocument([{ type: 'nope', children: [] }]);

// @ts-expect-error heading levels beyond 1|2|3 must be rejected
const badLevel = createDocument([{ type: 'heading', level: 5, children: [] }]);

// Mark flags are open by design: marks from plugins this build doesn't know are allowed
const foreignMark = createDocument([{ type: 'paragraph', children: [{ text: 'x', highlight: true }] }]);

// Named mark types keep value-mark shapes strict
const officialText: FrontifyText = { text: 'x', bold: true, italic: true, link: { href: 'https://frontify.com' } };

// @ts-expect-error value-carrying marks must not accept a bare boolean
const linkAsBoolean: FrontifyText = { text: 'x', link: true };

export const __typeAssertions = [doc, badBlock, badLevel, foreignMark, officialText, linkAsBoolean];
