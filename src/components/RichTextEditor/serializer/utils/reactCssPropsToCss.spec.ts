/* (c) Copyright Frontify Ltd., all rights reserved. */

import { CSSProperties } from 'react';
import { reactCssPropsToCss } from './reactCssPropsToCss';

describe('reactCssPropsToCss()', () => {
    it('converts react css props to inline style css', () => {
        const props: CSSProperties = {
            fontSize: '12px',
            textAlign: 'center',
            fontWeight: 'bold',
            fontFamily: 'Arial',
        };
        expect(reactCssPropsToCss(props)).to.equal(
            'font-size: 12px; text-align: center; font-weight: bold; font-family: Arial;',
        );
    });
});
