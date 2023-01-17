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
    mixedTree,
    orderedListMarkdown,
    orderedListTree,
    paragraphMarkdown,
    paragraphTree,
    unorderedListMarkdown,
    unorderedListTree,
} from './fixtures';

describe('Slate To Markdown transformer', () => {
    const transformer = Transform.use(new SlateToMarkdown());

    it('should transform basic marks', () => {
        const result = transformer.process(basicMarksTree[0]);
        expect(result).to.deep.equal(basicMarksMarkdown[0]);
    });

    it('should transform headings', () => {
        const result = transformer.process(headingsTree);
        expect(result).to.deep.equal(headingsMarkdown);
    });

    it('should transform code block', () => {
        let result = transformer.process(codeBlockTree[0]);
        expect(result).to.deep.equal(codeBlockMarkdown[0]);

        result = transformer.process(codeBlockTree[1]);
        expect(result).to.deep.equal(codeBlockMarkdown[1]);

        result = transformer.process(codeBlockTree[2]);
        expect(result).to.deep.equal(codeBlockMarkdown[2]);
    });

    it('should transform paragraph', () => {
        const result = transformer.process(paragraphTree);
        expect(result).to.deep.equal(paragraphMarkdown);
    });

    it('should transform unordered list', () => {
        const result = transformer.process(unorderedListTree);
        expect(result).to.deep.equal(unorderedListMarkdown);
    });

    it('should transform ordered list', () => {
        const result = transformer.process(orderedListTree);
        expect(result).to.deep.equal(orderedListMarkdown);
    });

    it('should transform hr', () => {
        const result = transformer.process(hrTree);
        expect(result).to.deep.equal(hrMarkdown);
    });

    it('should transform link', () => {
        const result = transformer.process(linkTree);
        expect(result).to.deep.equal(linkMarkdown);
    });

    it('should transform image', () => {
        const result = transformer.process(imageTree);
        expect(result).to.deep.equal(imageMarkdown);
    });

    it('should transform block quote', () => {
        let result = transformer.process(blockQuoteTree[0]);
        expect(result).to.deep.equal(blockQuoteMarkdown[0]);

        result = transformer.process(blockQuoteTree[1]);
        expect(result).to.deep.equal(blockQuoteMarkdown[1]);
    });

    it('should transform mixed text', () => {
        const result = transformer.process(mixedTree);
        expect(result).to.deep.equal(mixedMarkdown);
    });

    it('should transform mentions text', () => {
        let result = transformer.process(mentionsTree[0]);
        expect(result).to.deep.equal(mentionsMarkdown[0]);

        result = transformer.process(mentionsTree[1]);
        expect(result).to.deep.equal(mentionsMarkdown[1]);

        result = transformer.process(mentionsTree[2]);
        expect(result).to.deep.equal(mentionsMarkdown[2]);

        result = transformer.process(mentionsTree[3]);
        expect(result).to.deep.equal(mentionsMarkdown[3]);
    });
});
