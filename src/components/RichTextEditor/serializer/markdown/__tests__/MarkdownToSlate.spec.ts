/* (c) Copyright Frontify Ltd., all rights reserved. */

import { MarkdownToSlate } from '../';
import { transform } from '../../transform';
import {
    basicMarksMD,
    basicMarksTree,
    blockQuoteMD,
    blockQuoteTree,
    codeBlockMD,
    codeBlockTree,
    headingsMD,
    headingsTree,
    hrMD,
    hrTree,
    imageMD,
    imageTree,
    linkMD,
    linkTree,
    orderedListMD,
    orderedListTree,
    paragraphMD,
    paragraphTree,
    unorderedListMD,
    unorderedListTree,
} from './fixtures';

describe('Markdown to slate Transformer', () => {
    const transformer = transform.use(new MarkdownToSlate());

    it('should transform basic marks', () => {
        let result = transformer.process(basicMarksMD[0]);
        expect(result).to.deep.equal(basicMarksTree[0]);

        result = transformer.process(basicMarksMD[1]);
        expect(result).to.deep.equal(basicMarksTree[1]);
    });

    it('should transform headings', () => {
        const result = transformer.process(headingsMD);
        expect(result).to.deep.equal(headingsTree);
    });

    it('should transform code block', () => {
        const result = transformer.process(codeBlockMD);
        expect(result).to.deep.equal(codeBlockTree);
    });

    it('should transform paragraph', () => {
        const result = transformer.process(paragraphMD);
        expect(result).to.deep.equal(paragraphTree);
    });

    it('should transform unordered list', () => {
        const result = transformer.process(unorderedListMD);
        expect(result).to.deep.equal(unorderedListTree);
    });

    it('should transform ordered list', () => {
        const result = transformer.process(orderedListMD);
        expect(result).to.deep.equal(orderedListTree);
    });

    it('should transform hr', () => {
        const result = transformer.process(hrMD);
        expect(result).to.deep.equal(hrTree);
    });

    it('should transform link', () => {
        const result = transformer.process(linkMD);
        expect(result).to.deep.equal(linkTree);
    });

    it('should transform image', () => {
        const result = transformer.process(imageMD);
        expect(result).to.deep.equal(imageTree);
    });

    it('should transform block quote', () => {
        const result = transformer.process(blockQuoteMD);
        expect(result).to.deep.equal(blockQuoteTree);
    });
});
