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

    it('converts css props with quotes correctly to inline style css', () => {
        const props: CSSProperties = {
            fontFamily:
                '"Mier B", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
        };
        expect(reactCssPropsToCss(props)).to.equal(
            "font-family: 'Mier B', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';",
        );
    });
});
