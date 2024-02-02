/* (c) Copyright Frontify Ltd., all rights reserved. */

import { MarkdownToSlate } from '../MarkdownToSlate';
import { Transform } from '../../transform';
import {
    basicMarksMarkdown,
    basicMarksTree,
    blockQuoteMarkdown,
    blockQuoteTree,
    codeBlockMarkdown,
    codeBlockTree,
    headingsMarkdown,
    headingsTree,
    hrMarkdown,
    hrTree,
    imageMarkdown,
    imageTree,
    linkMarkdown,
    linkTree,
    mentionsMarkdown,
    mentionsTree,
    mixedMarkdown,
    mixedMarkdownWithUnsafeLink1,
    mixedTree,
    mixedTreeWithUnsafeLink1,
    orderedListMarkdown,
    orderedListTree,
    paragraphMarkdown,
    paragraphTree,
    unorderedListMarkdown,
    unorderedListTree,
    unsafeLinkMarkdown,
    unsafeLinkTree,
} from './fixtures';
import { NodeType } from '../types';

const testCases = {
    'Basic marks': [
        { markdown: basicMarksMarkdown[0], expectedTree: basicMarksTree[0] },
        { markdown: basicMarksMarkdown[1], expectedTree: basicMarksTree[1] },
    ],

    Headings: [{ info: 'Headings', markdown: headingsMarkdown, expectedTree: headingsTree }],

    'Code block': [
        { markdown: codeBlockMarkdown[0], expectedTree: codeBlockTree[0] },
        { markdown: codeBlockMarkdown[1], expectedTree: codeBlockTree[1] },
        { markdown: codeBlockMarkdown[2], expectedTree: codeBlockTree[2] },
    ],

    Paragraph: [
        { markdown: paragraphMarkdown[0], expectedTree: paragraphTree[0] },
        { markdown: paragraphMarkdown[1], expectedTree: paragraphTree[1] },
        { markdown: paragraphMarkdown[2], expectedTree: paragraphTree[2] },
    ],

    'Unordered list': [{ markdown: unorderedListMarkdown[0], expectedTree: unorderedListTree[0] }],

    'Ordered list': [
        { markdown: orderedListMarkdown[0], expectedTree: orderedListTree[0] },
        { markdown: orderedListMarkdown[1], expectedTree: orderedListTree[1] },
        { markdown: orderedListMarkdown[2], expectedTree: orderedListTree[2] },
    ],

    Hr: [{ markdown: hrMarkdown, expectedTree: hrTree }],

    Link: [
        { info: 'target self', markdown: linkMarkdown[0], expectedTree: linkTree[0] },
        { info: 'target blank', markdown: linkMarkdown[1], expectedTree: linkTree[1] },
        { info: 'mailto link', markdown: linkMarkdown[2], expectedTree: linkTree[2] },

        { info: 'unsafe link', markdown: unsafeLinkMarkdown[0], expectedTree: unsafeLinkTree[0] },
        { info: 'unsafe link', markdown: unsafeLinkMarkdown[1], expectedTree: unsafeLinkTree[1] },
        { info: 'unsafe link', markdown: unsafeLinkMarkdown[2], expectedTree: unsafeLinkTree[2] },
        { info: 'unsafe link', markdown: unsafeLinkMarkdown[3], expectedTree: unsafeLinkTree[3] },
    ],

    Image: [
        { info: 'image', markdown: imageMarkdown[0], expectedTree: imageTree[0] },
        { info: 'the unsafe image source', markdown: imageMarkdown[1], expectedTree: imageTree[1] },
        { info: 'create text for not standard image source', markdown: imageMarkdown[2], expectedTree: imageTree[2] },
    ],

    'Block quote': [
        { markdown: blockQuoteMarkdown[0], expectedTree: blockQuoteTree[0] },
        { markdown: blockQuoteMarkdown[1], expectedTree: blockQuoteTree[1] },
    ],

    'Mixed text': [
        { markdown: mixedMarkdown, expectedTree: mixedTree },
        {
            info: 'mixed text with unsafe link',
            markdown: mixedMarkdownWithUnsafeLink1,
            expectedTree: mixedTreeWithUnsafeLink1,
        },
    ],

    Mentions: [
        { markdown: mentionsMarkdown[0], expectedTree: mentionsTree[0] },
        { markdown: mentionsMarkdown[1], expectedTree: mentionsTree[1] },
        { markdown: mentionsMarkdown[2], expectedTree: mentionsTree[2] },
        { markdown: mentionsMarkdown[3], expectedTree: mentionsTree[3] },
    ],
};

describe('Markdown to slate Transformer', () => {
    const transformer = Transform.use(new MarkdownToSlate());

    Object.keys(testCases).map((key) => {
        const cases = testCases[key as keyof typeof testCases];

        return describe(key, () => {
            cases.map(
                ({ info, markdown, expectedTree }: { info?: string; markdown: string; expectedTree: NodeType[] }) =>
                    it(`should transform${info ? `: ${info}` : ''}`, () => {
                        const result = transformer.process(markdown);
                        expect(result).to.deep.equal(expectedTree);
                    }),
            );
        });
    });
});
