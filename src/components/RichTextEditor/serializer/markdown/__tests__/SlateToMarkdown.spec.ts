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

    describe('Basic markdown transformation', () => {
        it('should transform basic marks in single line', () => {
            const result = transformer.process(basicMarksTree[0]);
            expect(result).to.deep.equal(basicMarksMarkdown[0]);
        });

        it('should transform basic marks in multiple lines', () => {
            const result = transformer.process(basicMarksTree[1]);
            expect(result).to.deep.equal(basicMarksMarkdown[1]);
        });

        it('should transform basic marks with line breaks', () => {
            const result = transformer.process(basicMarksTree[2]);
            expect(result).to.deep.equal(basicMarksMarkdown[2]);
        });
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
        const result = transformer.process(unorderedListTree[0]);
        expect(result).to.deep.equal(unorderedListMarkdown[0]);
    });

    it('should transform unordered list with child LIC', () => {
        let result = transformer.process(unorderedListTree[1]);
        expect(result).to.deep.equal(unorderedListMarkdown[1]);

        result = transformer.process(unorderedListTree[2]);
        expect(result).to.deep.equal(unorderedListMarkdown[2]);

        result = transformer.process(unorderedListTree[3]);
        expect(result).to.deep.equal(unorderedListMarkdown[3]);
    });

    it('should transform ordered list', () => {
        let result = transformer.process(orderedListTree[0]);
        expect(result).to.deep.equal(orderedListMarkdown[0]);

        result = transformer.process(orderedListTree[1]);
        expect(result).to.deep.equal(orderedListMarkdown[1]);

        result = transformer.process(orderedListTree[2]);
        expect(result).to.deep.equal(orderedListMarkdown[2]);
    });

    it('should transform hr', () => {
        const result = transformer.process(hrTree);
        expect(result).to.deep.equal(hrMarkdown);
    });

    describe('Link transformation', () => {
        it('should transform link - target self', () => {
            const result = transformer.process(linkTree[0]);
            expect(result).to.deep.equal(linkMarkdown[0]);
        });

        it('should transform link - target blank', () => {
            const result = transformer.process(linkTree[1]);
            expect(result).to.deep.equal(linkMarkdown[1]);
        });

        it('should transform link - target undefined', () => {
            const result = transformer.process(linkTree[2]);
            expect(result).to.deep.equal(linkMarkdown[2]);
        });
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
