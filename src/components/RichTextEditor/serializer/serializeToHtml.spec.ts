/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    customDesignTokens,
    nodesToSerialize,
    serializedHtml,
    serializedHtmlWithCustomDesignTokens,
} from '../helpers/exampleValues';
import { serializeNodesToHtml } from './serializeToHtml';

describe('serializeNodesToHtml()', () => {
    it('should serialize nodes to html', () => {
        const serialized = serializeNodesToHtml(nodesToSerialize);
        expect(serialized).to.equal(serializedHtml);
    });

    it('should serialize nodes to html with custom design tokens', () => {
        const serialized = serializeNodesToHtml(nodesToSerialize, customDesignTokens);
        expect(serialized).to.equal(serializedHtmlWithCustomDesignTokens);
    });
});
