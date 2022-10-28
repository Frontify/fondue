/* (c) Copyright Frontify Ltd., all rights reserved. */

import { SlateToMd } from '..';
import { transform } from '../../transform';
import { basicMarksMD, basicMarksTree, headingsMD, headingsTree } from './fixtures';

describe('Slate To Markdown transformer', () => {
    const transformer = transform.use(new SlateToMd());

    it('should transform basic marks', () => {
        const result = transformer.process(basicMarksTree);
        expect(result).to.deep.equal(basicMarksMD);
    });

    it('should transform headings', () => {
        const result = transformer.process(headingsTree);
        expect(result).to.deep.equal(headingsMD);
    });
});
