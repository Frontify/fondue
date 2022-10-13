import { DesignTokens } from '@components/RichTextEditor/types';
import { setDefaultDesignTokensIfNull } from './setDefaultDesignTokensIfNull';

const defaultDesignTokens: DesignTokens = {
    heading1: {
        fontSize: '48px',
        fontWeight: 700,
    },
    heading2: {
        fontSize: '32px',
        fontWeight: 700,
    },
};

const customDesignTokens: DesignTokens = {
    heading1: {
        textAlign: 'right',
    },
};

describe('setDefaultDesignTokensIfNull()', () => {
    it('sets default values if null', () => {
        const customDesignTokens: DesignTokens = {};
        const result = setDefaultDesignTokensIfNull(defaultDesignTokens, customDesignTokens);

        expect(defaultDesignTokens).to.deep.equal(result);
    });

    it('overwrites the defaults', () => {
        const result = setDefaultDesignTokensIfNull(defaultDesignTokens, customDesignTokens);

        expect({
            heading1: {
                textAlign: 'right',
            },
            heading2: {
                fontSize: '32px',
                fontWeight: 700,
            },
        }).to.deep.equal(result);
    });
});
