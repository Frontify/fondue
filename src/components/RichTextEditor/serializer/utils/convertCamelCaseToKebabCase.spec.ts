/* (c) Copyright Frontify Ltd., all rights reserved. */

import { convertCamelCaseToKebabCase } from './convertCamelCaseToKebabCase';

describe('convertCamelCaseToKebabCase()', () => {
    it('converts camelCase to kebab-case', () => {
        expect(convertCamelCaseToKebabCase('fontSize')).to.equal('font-size');
        expect(convertCamelCaseToKebabCase('textAlign')).to.equal('text-align');
        expect(convertCamelCaseToKebabCase('fontWeight')).to.equal('font-weight');
        expect(convertCamelCaseToKebabCase('fontFamily')).to.equal('font-family');
    });
    it('does nothing with monosyllabic words', () => {
        expect(convertCamelCaseToKebabCase('padding')).to.equal('padding');
        expect(convertCamelCaseToKebabCase('display')).to.equal('display');
    });
    it('does nothing with words that are already kebab-case', () => {
        expect(convertCamelCaseToKebabCase('font-size')).to.equal('font-size');
        expect(convertCamelCaseToKebabCase('text-align')).to.equal('text-align');
    });
});
