/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ELEMENT_LI, ELEMENT_LINK, ELEMENT_OL, ELEMENT_PARAGRAPH, ELEMENT_UL } from '@udecode/plate';
import { OL_CLASSES, UL_CLASSES } from '@components/RichTextEditor/Plugins';
import { TextStyles } from '@components/RichTextEditor/Plugins/TextStylePlugin/TextStyles';
import { defaultDesignTokens } from '@components/RichTextEditor/utils/defaultDesignTokens';
import { serializeNodeToHtmlRecursive } from './serializeNodeToHtmlRecursive';

describe('serializeNodeToHtmlRecursive()', () => {
    it('serializes ordered list to html', () => {
        const node = {
            type: ELEMENT_OL,
            children: [
                {
                    type: ELEMENT_LI,
                    children: [{ text: 'This comes first.' }],
                },
                {
                    type: ELEMENT_LI,
                    children: [{ text: 'This comes second.' }],
                },
            ],
        };
        const result = serializeNodeToHtmlRecursive(node, defaultDesignTokens);

        expect(result).to.equal(`<ol class="${OL_CLASSES}"><li>This comes first.</li><li>This comes second.</li></ol>`);
    });

    it('serializes unordered list to html', () => {
        const node = {
            type: ELEMENT_UL,
            children: [
                {
                    type: ELEMENT_LI,
                    children: [{ text: 'This comes first.' }],
                },
                {
                    type: ELEMENT_LI,
                    children: [{ text: 'This comes second.' }],
                },
            ],
        };
        const result = serializeNodeToHtmlRecursive(node, defaultDesignTokens);

        expect(result).to.equal(`<ul class="${UL_CLASSES}"><li>This comes first.</li><li>This comes second.</li></ul>`);
    });

    it('serializes link to html', () => {
        const node = {
            type: ELEMENT_PARAGRAPH,
            children: [
                {
                    type: ELEMENT_LINK,
                    children: [{ text: 'This is a Link.' }],
                    url: 'https://frontify.com',
                },
            ],
        };
        const result = serializeNodeToHtmlRecursive(node, defaultDesignTokens);

        expect(result).to.equal(
            '<p style=""><a style="font-size: 14px; color: rgb(113, 89, 215); text-decoration: underline; cursor: pointer;" href="https://frontify.com">This is a Link.</a></p>',
        );
    });

    it('serializes legacy link format to html', () => {
        const node = {
            type: ELEMENT_PARAGRAPH,
            children: [
                {
                    type: ELEMENT_LINK,
                    chosenLink: {
                        searchResult: {
                            link: 'https://smartive.ch',
                        },
                        openInNewTab: true,
                    },
                    children: [
                        {
                            text: 'This is also a Link.',
                        },
                    ],
                },
            ],
        };
        const result = serializeNodeToHtmlRecursive(node, defaultDesignTokens);

        expect(result).to.equal(
            '<p style=""><a style="font-size: 14px; color: rgb(113, 89, 215); text-decoration: underline; cursor: pointer;" target=_blank href="https://smartive.ch">This is also a Link.</a></p>',
        );
    });

    it('serializes headings and customs html', () => {
        const node = {
            type: ELEMENT_PARAGRAPH,
            children: [
                {
                    type: TextStyles.ELEMENT_HEADING1,
                    children: [
                        {
                            text: 'This is a h1.',
                        },
                    ],
                },
                {
                    type: TextStyles.ELEMENT_HEADING2,
                    children: [
                        {
                            text: 'This is a h2.',
                        },
                    ],
                },
                {
                    type: TextStyles.ELEMENT_HEADING3,
                    children: [
                        {
                            text: 'This is a h3.',
                        },
                    ],
                },
                {
                    type: TextStyles.ELEMENT_HEADING4,
                    children: [
                        {
                            text: 'This is a h4.',
                        },
                    ],
                },
                {
                    type: TextStyles.ELEMENT_CUSTOM1,
                    children: [
                        {
                            text: 'This is a custom1.',
                        },
                    ],
                },
                {
                    type: TextStyles.ELEMENT_CUSTOM2,
                    children: [
                        {
                            text: 'This is a custom2.',
                        },
                    ],
                },
                {
                    type: TextStyles.ELEMENT_CUSTOM3,
                    children: [
                        {
                            text: 'This is a custom3.',
                        },
                    ],
                },
                {
                    type: TextStyles.ELEMENT_QUOTE,
                    children: [
                        {
                            text: 'This is a quote.',
                        },
                    ],
                },
            ],
        };

        const result = serializeNodeToHtmlRecursive(node, defaultDesignTokens);

        expect(result).to.equal(
            '<p style=""><h1 style="font-size: 48px; font-weight: 700;">This is a h1.</h1><h2 style="font-size: 32px; font-weight: 700;">This is a h2.</h2><h3 style="font-size: 24px;">This is a h3.</h3><h4 style="font-size: 18px;">This is a h4.</h4><p style="font-size: 14px;">This is a custom1.</p><p style="font-size: 14px; font-weight: 600;">This is a custom2.</p><p style="font-size: 14px; text-decoration: underline;">This is a custom3.</p><p style="font-size: 16px; font-style: italic;">This is a quote.</p></p>',
        );
    });
});
