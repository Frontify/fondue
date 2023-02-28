/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    BOLD_CLASSES,
    CODE_CLASSES,
    ITALIC_CLASSES,
    STRIKETHROUGH_CLASSES,
    UNDERLINE_CLASSES,
} from '@components/RichTextEditor/Plugins';
import { serializeLeafToHtml } from './serializeLeafToHtml';

describe('serializeLeafToHtml()', () => {
    it('serializes bold plate leaf to html', () => {
        const node = {
            text: 'text',
            bold: true,
        };
        const result = serializeLeafToHtml(node);
        expect(result).to.equal(`<span class="${BOLD_CLASSES}">text</span>`);
    });

    it('serializes italic plate leaf to html', () => {
        const node = {
            text: 'text',
            italic: true,
        };
        const result = serializeLeafToHtml(node);
        expect(result).to.equal(`<span class="${ITALIC_CLASSES}">text</span>`);
    });

    it('serializes code plate leaf to html', () => {
        const node = {
            text: 'text',
            code: true,
        };
        const result = serializeLeafToHtml(node);
        expect(result).to.equal(`<span class="${CODE_CLASSES}">text</span>`);
    });

    it('serializes strikethrough plate leaf to html', () => {
        const node = {
            text: 'text',
            strikethrough: true,
        };
        const result = serializeLeafToHtml(node);
        expect(result).to.equal(`<span class="${STRIKETHROUGH_CLASSES}">text</span>`);
    });

    it('serializes underline plate leaf to html', () => {
        const node = {
            text: 'text',
            underline: true,
        };
        const result = serializeLeafToHtml(node);
        expect(result).to.equal(`<span class="${UNDERLINE_CLASSES}">text</span>`);
    });

    it('serializes leaf to html', () => {
        const node = {
            text: 'text',
        };
        const result = serializeLeafToHtml(node);
        expect(result).to.equal('text');
    });
});
