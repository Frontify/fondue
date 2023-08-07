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
} from './fixtures';

describe('Markdown to slate Transformer', () => {
    const transformer = Transform.use(new MarkdownToSlate());

    it('should transform basic marks', () => {
        let result = transformer.process(basicMarksMarkdown[0]);
        expect(result).to.deep.equal(basicMarksTree[0]);

        result = transformer.process(basicMarksMarkdown[1]);
        expect(result).to.deep.equal(basicMarksTree[1]);
    });

    it('should transform headings', () => {
        const result = transformer.process(headingsMarkdown);
        expect(result).to.deep.equal(headingsTree);
    });

    it('should transform code block', () => {
        let result = transformer.process(codeBlockMarkdown[0]);
        expect(result).to.deep.equal(codeBlockTree[0]);

        result = transformer.process(codeBlockMarkdown[1]);
        expect(result).to.deep.equal(codeBlockTree[1]);

        result = transformer.process(codeBlockMarkdown[2]);
        expect(result).to.deep.equal(codeBlockTree[2]);
    });

    it('should transform paragraph', () => {
        const result = transformer.process(paragraphMarkdown);
        expect(result).to.deep.equal(paragraphTree);
    });

    it('should transform unordered list', () => {
        const result = transformer.process(unorderedListMarkdown[0]);
        expect(result).to.deep.equal(unorderedListTree[0]);
    });

    it('should transform ordered list', () => {
        let result = transformer.process(orderedListMarkdown[0]);
        expect(result).to.deep.equal(orderedListTree[0]);

        result = transformer.process(orderedListMarkdown[1]);
        expect(result).to.deep.equal(orderedListTree[1]);

        result = transformer.process(orderedListMarkdown[2]);
        expect(result).to.deep.equal(orderedListTree[2]);
    });

    it('should transform hr', () => {
        const result = transformer.process(hrMarkdown);
        expect(result).to.deep.equal(hrTree);
    });

    describe('Link transformation', () => {
        it('should transform link - target self', () => {
            const result = transformer.process(linkMarkdown[0]);
            expect(result).to.deep.equal(linkTree[0]);
        });

        it('should transform link - target blank', () => {
            const result = transformer.process(linkMarkdown[1]);
            expect(result).to.deep.equal(linkTree[1]);
        });

        it('should correctly transform the Unsafe links', () => {
            let result = transformer.process(linkMarkdown[2]);
            expect(linkTree[2]).to.deep.equal(result);

            result = transformer.process(linkMarkdown[3]);
            expect(linkTree[3]).to.deep.equal(result);
        });

        it('should create text for not standard markdown link', () => {
            const result = transformer.process(linkMarkdown[4]);
            expect(linkTree[4]).to.deep.equal(result);
        });

        it('should create mailto link', () => {
            const result = transformer.process(linkMarkdown[5]);
            expect(result).to.deep.equal(linkTree[5]);
        });
    });

    describe('Image transformation', () => {
        it('should transform image', () => {
            const result = transformer.process(imageMarkdown[0]);
            expect(imageTree[0]).to.deep.equal(result);
        });

        it('should correctly transform the unsafe image source', () => {
            const result = transformer.process(imageMarkdown[1]);
            expect(imageTree[1]).to.deep.equal(result);
        });

        it('should create text for not standard image source', () => {
            const result = transformer.process(imageMarkdown[2]);
            expect(imageTree[2]).to.deep.equal(result);
        });
    });

    it('should transform block quote', () => {
        let result = transformer.process(blockQuoteMarkdown[0]);
        expect(result).to.deep.equal(blockQuoteTree[0]);

        result = transformer.process(blockQuoteMarkdown[1]);
        expect(result).to.deep.equal(blockQuoteTree[1]);
    });

    describe('Mixed text transformation', () => {
        it('should transform mixed text', () => {
            const result = transformer.process(mixedMarkdown);
            expect(result).to.deep.equal(mixedTree);
        });

        it('should transform mixed text with unsafe link', () => {
            const result = transformer.process(mixedMarkdownWithUnsafeLink1);
            expect(result).to.deep.equal(mixedTreeWithUnsafeLink1);
        });
    });

    it('should transform mentions text', () => {
        let result = transformer.process(mentionsMarkdown[0]);
        expect(result).to.deep.equal(mentionsTree[0]);

        result = transformer.process(mentionsMarkdown[1]);
        expect(result).to.deep.equal(mentionsTree[1]);

        result = transformer.process(mentionsMarkdown[2]);
        expect(result).to.deep.equal(mentionsTree[2]);

        result = transformer.process(mentionsMarkdown[3]);
        expect(result).to.deep.equal(mentionsTree[3]);
    });
});
