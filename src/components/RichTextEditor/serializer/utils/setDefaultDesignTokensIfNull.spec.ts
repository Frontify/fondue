import { DesignTokens } from '@components/RichTextEditor/types';
import { defaultDesignTokens } from '@components/RichTextEditor/utils/defaultDesignTokens';
import { setDefaultDesignTokensIfNull } from './setDefaultDesignTokensIfNull';

describe('setDefaultDesignTokensIfNull()', () => {
    it('sets default values if null', () => {
        const designTokens: DesignTokens = {};
        const result = setDefaultDesignTokensIfNull(designTokens);

        expect(result).to.deep.equal(defaultDesignTokens);
    });

    it('overwrites the defaults', () => {
        const designTokens: DesignTokens = {
            heading3: {
                textAlign: 'right',
            },
        };

        const result = setDefaultDesignTokensIfNull(designTokens);

        expect({ ...defaultDesignTokens, heading3: { textAlign: 'right' } }).to.deep.equal(result);
    });
});
