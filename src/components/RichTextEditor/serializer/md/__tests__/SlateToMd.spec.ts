/* (c) Copyright Frontify Ltd., all rights reserved. */

import { SlateToMd } from '..';
import { transform } from '../../transform';
import { basicMarksMD, basicMarksTree } from './fixtures';

describe('Slate To Markdown transformer', () => {
    const transformer = transform.use(new SlateToMd());

    it('should serialize basic marks', () => {
        const result = transformer.process(basicMarksTree);
        expect(result).to.deep.equal(basicMarksMD);
    });
});
