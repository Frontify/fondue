/* (c) Copyright Frontify Ltd., all rights reserved. */

import { SlateToMarkdown } from '../SlateToMarkdown';
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
    mixedMarkdownWithUnsafeLink2,
    mixedTree,
    mixedTreeWithUnsafeLink2,
    orderedListMarkdown,
    orderedListTree,
    paragraphMarkdown,
    paragraphTree,
    unorderedListMarkdown,
    unorderedListTree,
} from './fixtures';
import { NodeType } from '../types';

const testCases = {
    'Basic marks': [
        { info: 'in single line', markdown: basicMarksMarkdown[0], expectedTree: basicMarksTree[0] },
        { info: 'in multiple lines', markdown: basicMarksMarkdown[1], expectedTree: basicMarksTree[1] },
        { info: 'with line breaks', markdown: basicMarksMarkdown[2], expectedTree: basicMarksTree[2] },
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

    'Unordered list': [
        { markdown: unorderedListMarkdown[0], expectedTree: unorderedListTree[0] },
        { info: 'with child LIC', markdown: unorderedListMarkdown[1], expectedTree: unorderedListTree[1] },
        { info: 'with child LIC', markdown: unorderedListMarkdown[2], expectedTree: unorderedListTree[2] },
        { info: 'with child LIC', markdown: unorderedListMarkdown[3], expectedTree: unorderedListTree[3] },
    ],

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
    ],

    Image: [
        { info: 'image', markdown: imageMarkdown[0], expectedTree: imageTree[0] },
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
            markdown: mixedMarkdownWithUnsafeLink2,
            expectedTree: mixedTreeWithUnsafeLink2,
        },
    ],

    Mentions: [
        { markdown: mentionsMarkdown[0], expectedTree: mentionsTree[0] },
        { markdown: mentionsMarkdown[1], expectedTree: mentionsTree[1] },
        { markdown: mentionsMarkdown[2], expectedTree: mentionsTree[2] },
        { markdown: mentionsMarkdown[3], expectedTree: mentionsTree[3] },
    ],
};

describe('Slate To Markdown transformer', () => {
    const transformer = Transform.use(new SlateToMarkdown());

    Object.keys(testCases).map((key) => {
        const cases = testCases[key as keyof typeof testCases];

        return describe(key, () => {
            cases.map(
                ({ info, markdown, expectedTree }: { info?: string; markdown: string; expectedTree: NodeType[] }) => {
                    const information = info ? `: ${info}` : '';

                    return it(`should transform${information}`, () => {
                        const result = transformer.process(expectedTree);
                        expect(result).to.deep.equal(markdown);
                    });
                },
            );
        });
    });
});
