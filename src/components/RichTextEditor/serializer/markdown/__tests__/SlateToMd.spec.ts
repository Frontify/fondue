/* (c) Copyright Frontify Ltd., all rights reserved. */

import { SlateToMd } from '..';
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

describe('Slate To Markdown transformer', () => {
    const transformer = transform.use(new SlateToMd());

    it('should transform basic marks', () => {
        const result = transformer.process(basicMarksTree[0]);
        expect(result).to.deep.equal(basicMarksMD[0]);
    });

    it('should transform headings', () => {
        const result = transformer.process(headingsTree);
        expect(result).to.deep.equal(headingsMD);
    });

    it('should transform code block', () => {
        let result = transformer.process(codeBlockTree[0]);
        expect(result).to.deep.equal(codeBlockMD[0]);

        result = transformer.process(codeBlockTree[1]);
        expect(result).to.deep.equal(codeBlockMD[1]);
    });

    it('should transform paragraph', () => {
        const result = transformer.process(paragraphTree);
        expect(result).to.deep.equal(paragraphMD);
    });

    it('should transform unordered list', () => {
        const result = transformer.process(unorderedListTree);
        expect(result).to.deep.equal(unorderedListMD);
    });

    it('should transform ordered list', () => {
        const result = transformer.process(orderedListTree);
        expect(result).to.deep.equal(orderedListMD);
    });

    it('should transform hr', () => {
        const result = transformer.process(hrTree);
        expect(result).to.deep.equal(hrMD);
    });

    it('should transform link', () => {
        const result = transformer.process(linkTree);
        expect(result).to.deep.equal(linkMD);
    });

    it('should transform image', () => {
        const result = transformer.process(imageTree);
        expect(result).to.deep.equal(imageMD);
    });

    it('should transform block quote', () => {
        let result = transformer.process(blockQuoteTree[0]);
        expect(result).to.deep.equal(blockQuoteMD[0]);

        result = transformer.process(blockQuoteTree[1]);
        expect(result).to.deep.equal(blockQuoteMD[1]);

        result = transformer.process(blockQuoteTree[2]);
        expect(result).to.deep.equal(blockQuoteMD[2]);
    });
});
