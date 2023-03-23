/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mentionable, orderedListValue, unorderedListValue } from '@components/RichTextEditor/helpers/exampleValues';
import { ELEMENT_BUTTON, ELEMENT_CHECK_ITEM, mapMentionable } from '@components/RichTextEditor/Plugins';
import { TextStyles } from '@components/RichTextEditor/Plugins/TextStylePlugin/TextStyles';
import { defaultDesignTokens } from '@components/RichTextEditor/utils/defaultDesignTokens';
import {
    ELEMENT_LI,
    ELEMENT_LIC,
    ELEMENT_LINK,
    ELEMENT_MENTION,
    ELEMENT_OL,
    ELEMENT_PARAGRAPH,
    ELEMENT_UL,
} from '@udecode/plate';
import { serializeNodeToHtmlRecursive } from './serializeNodeToHtmlRecursive';

describe('serializeNodeToHtmlRecursive()', () => {
    it('serializes ordered list to html', () => {
        const node = {
            type: ELEMENT_OL,
            children: [
                {
                    type: ELEMENT_LI,
                    children: [
                        {
                            type: ELEMENT_LIC,
                            children: [{ text: 'This comes first.' }],
                        },
                    ],
                },
                {
                    type: ELEMENT_LI,
                    children: [
                        {
                            type: ELEMENT_LIC,
                            children: [{ text: 'This comes second.' }],
                        },
                    ],
                },
            ],
        };
        const result = serializeNodeToHtmlRecursive(node, { designTokens: defaultDesignTokens });

        expect(result).to.match(/<ol class=".*(count,decimal)*"/);
        expect(result).to.match(/<li .*><p .*><span .*>This comes first\.<\/span><\/p><\/li>/);
        expect(result).to.match(/<li .*><p .*><span .*>This comes second\.<\/span><\/p><\/li>/);
    });

    it('serializes active break after column element to html', () => {
        const node = {
            type: ELEMENT_PARAGRAPH,
            breakAfterColumn: 'active',
            children: [
                {
                    text: 'This is a paragraph.',
                },
            ],
        };
        const result = serializeNodeToHtmlRecursive(node, { designTokens: defaultDesignTokens });

        expect(result).to.include('tw-break-after-column');
        expect(result).to.include('tw-break-inside-avoid-column');
    });

    it('does not serialize inactive break after column element to html', () => {
        const node = {
            type: ELEMENT_PARAGRAPH,
            breakAfterColumn: 'inactive',
            children: [
                {
                    text: 'This is a paragraph.',
                },
            ],
        };
        const result = serializeNodeToHtmlRecursive(node, { designTokens: defaultDesignTokens });

        expect(result).to.not.include('tw-break-after-column');
        expect(result).to.not.include('tw-break-inside-avoid-column');
    });

    it('serializes ordered list with correct list style types to html', () => {
        const result = serializeNodeToHtmlRecursive(orderedListValue, { designTokens: defaultDesignTokens });

        const parser = new DOMParser();
        const htmlDoc = parser.parseFromString(result, 'text/html');
        const orderedLists = htmlDoc.getElementsByTagName('ol');
        expect(orderedLists[0]?.className).to.include('decimal');
        expect(orderedLists[1]?.className).to.include('alpha');
        expect(orderedLists[2]?.className).to.include('roman');
    });

    it('serializes list item with custom styles to html', () => {
        const result = serializeNodeToHtmlRecursive(unorderedListValue, { designTokens: defaultDesignTokens });

        const parser = new DOMParser();
        const htmlDoc = parser.parseFromString(result, 'text/html');
        const listItems = htmlDoc.getElementsByTagName('li');

        // custom1
        expect(listItems[0]?.style.fontSize).to.contain('14px');
        expect(listItems[0]?.style.fontStyle).to.contain('normal');
        expect(listItems[0]?.style.fontWeight).to.contain('normal');

        // custom2
        expect(listItems[1]?.style.fontSize).to.contain('14px');
        expect(listItems[1]?.style.fontStyle).to.contain('normal');
        expect(listItems[1]?.style.fontWeight).to.contain(600);
    });

    it('serializes unordered list to html', () => {
        const node = {
            type: ELEMENT_UL,
            children: [
                {
                    type: ELEMENT_LI,
                    children: [
                        {
                            type: ELEMENT_LIC,
                            children: [{ text: 'This comes first.' }],
                        },
                    ],
                },
                {
                    type: ELEMENT_LI,
                    children: [
                        {
                            type: ELEMENT_LIC,
                            children: [{ text: 'This comes second.' }],
                        },
                    ],
                },
            ],
        };
        const result = serializeNodeToHtmlRecursive(node, { designTokens: defaultDesignTokens });

        expect(result).to.match(
            /<ul.*><li.*><p.*><span .*>This comes first.<\/span><\/p><\/li><li.*><p.*><span.*>This comes second.<\/span><\/p><\/li><\/ul>/,
        );
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
        const result = serializeNodeToHtmlRecursive(node, { designTokens: defaultDesignTokens });

        expect(result).to.match(/<p.*><a.*href="https:\/\/frontify.com".*>This is a Link\.<\/a><\/p>/);
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
        const result = serializeNodeToHtmlRecursive(node, { designTokens: defaultDesignTokens });

        expect(result).to.match(/<p.*><a.*href="https:\/\/smartive.ch".*>This is also a Link\.<\/a><\/p>/);
    });

    it('serializes link with target blank to html', () => {
        const node = {
            type: ELEMENT_PARAGRAPH,
            children: [
                {
                    type: ELEMENT_LINK,
                    children: [{ text: 'This is a Link.' }],
                    target: '_blank',
                    url: 'https://frontify.com',
                },
            ],
        };
        const result = serializeNodeToHtmlRecursive(node, { designTokens: defaultDesignTokens });

        expect(result).to.match(/<p.*><a.*target="_blank".*href="https:\/\/frontify.com".*>This is a Link\.<\/a><\/p>/);
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

        const result = serializeNodeToHtmlRecursive(node, { designTokens: defaultDesignTokens });

        expect(result).to.match(/<h1.*>This is a h1.<\/h1>/);
        expect(result).to.match(/<h2.*>This is a h2.<\/h2>/);
        expect(result).to.match(/<h3.*>This is a h3.<\/h3>/);
        expect(result).to.match(/<h4.*>This is a h4.<\/h4>/);
        expect(result).to.match(/<p.*>This is a custom1.<\/p>/);
        expect(result).to.match(/<p.*>This is a custom2.<\/p>/);
        expect(result).to.match(/<p.*>This is a custom3.<\/p>/);
        expect(result).to.match(/<p.*>This is a quote.<\/p>/);
    });

    it('serializes Mentions to html', () => {
        const node = {
            type: ELEMENT_PARAGRAPH,
            children: [
                {
                    text: 'new annotation ',
                },
                {
                    type: ELEMENT_MENTION,
                    category: 'user',
                    id: '3333333333',
                    children: [
                        {
                            text: '',
                        },
                    ],
                },
                {
                    text: ' adding changes :)',
                },
            ],
        };

        const result = serializeNodeToHtmlRecursive(node, {
            designTokens: defaultDesignTokens,
            mappedMentionable: mapMentionable(mentionable),
        });

        expect(result).to.match(/<p.*>new annotation <span.*>Admiral Gial Ackbar<\/span> adding changes :\)<\/p>/);
    });

    it('serializes a button to html', () => {
        const node = {
            type: ELEMENT_PARAGRAPH,
            children: [
                {
                    type: ELEMENT_BUTTON,
                    url: 'https://frontify.com',
                    buttonStyle: 'primary',
                    children: [{ text: 'button' }],
                },
            ],
        };

        const result = serializeNodeToHtmlRecursive(node, {
            designTokens: defaultDesignTokens,
        });

        expect(result).to.contain('button');
        expect(result).to.contain('href="https://frontify.com"');
        expect(result).to.contain('target="_blank"');
    });

    it('serializes a button with target _blank to html', () => {
        const node = {
            type: ELEMENT_PARAGRAPH,
            children: [
                {
                    type: ELEMENT_BUTTON,
                    target: '_blank',
                    url: 'https://frontify.com',
                    buttonStyle: 'primary',
                    children: [{ text: 'button' }],
                },
            ],
        };

        const result = serializeNodeToHtmlRecursive(node, { designTokens: defaultDesignTokens });
        expect(result).to.contain('button');
        expect(result).to.contain('target="_blank"');
    });

    it('serializes a checked checklist item to html', () => {
        const node = {
            type: ELEMENT_CHECK_ITEM,
            checked: true,
            children: [{ text: 'item' }],
        };

        const result = serializeNodeToHtmlRecursive(node, { designTokens: defaultDesignTokens });
        expect(result).to.contain('item');
        expect(result).to.contain('checked');
    });

    it('serializes an unchecked checklist item to html', () => {
        const node = {
            type: ELEMENT_CHECK_ITEM,
            checked: false,
            children: [{ text: 'item' }],
        };

        const result = serializeNodeToHtmlRecursive(node, { designTokens: defaultDesignTokens });
        expect(result).to.include('item');
        expect(result).to.not.include('checked');
    });

    it('serializes a checklist item without an indent to html', () => {
        const node = {
            type: ELEMENT_CHECK_ITEM,
            checked: false,
            children: [{ text: 'item' }],
        };

        const result = serializeNodeToHtmlRecursive(node, { designTokens: defaultDesignTokens });
        expect(result).to.include('item');
        expect(result).to.include('margin-left:0px;');
    });

    for (const entry of [
        { indent: 0, outcome: '0px' },
        { indent: 1, outcome: '24px' },
        { indent: 2, outcome: '48px' },
    ]) {
        it(`serializes a checklist item with an indent of ${entry.indent} to html`, () => {
            const node = {
                type: ELEMENT_CHECK_ITEM,
                indent: entry.indent,
                children: [{ text: 'item' }],
            };

            const result = serializeNodeToHtmlRecursive(node, { designTokens: defaultDesignTokens });
            expect(result).to.include('item');
            expect(result).to.include(`margin-left:${entry.outcome};`);
        });
    }

    it('serializes design tokens with quotes in them correctly', () => {
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
        const result = serializeNodeToHtmlRecursive(node, {
            designTokens: {
                link: {
                    fontFamily: '"Mier B", -apple-system, BlinkMacSystemFont',
                },
            },
        });

        expect(result).to.be.equal(
            '<p class="tw-break-words" style=""><a class="tw-break-words" style="font-family: \'Mier B\', -apple-system, BlinkMacSystemFont;" target="_blank" href="https://frontify.com">This is a Link.</a></p>',
        );
    });
});
