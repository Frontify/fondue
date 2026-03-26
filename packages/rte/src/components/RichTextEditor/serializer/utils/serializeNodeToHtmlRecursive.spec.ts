/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ELEMENT_LINK } from '@udecode/plate-link';
import { ELEMENT_LI, ELEMENT_LIC, ELEMENT_OL, ELEMENT_UL } from '@udecode/plate-list';
import { ELEMENT_MENTION } from '@udecode/plate-mention';
import { ELEMENT_PARAGRAPH } from '@udecode/plate-paragraph';

import {
    ELEMENT_CHECK_ITEM,
    LIST_BULLET_CONTAINER_CLASSES,
    LIST_ITEM_SPAN_CLASSES,
    OL_CLASSES,
    UL_CLASSES,
    mapMentionable,
} from '@components/RichTextEditor/Plugins';
import { TextStyles } from '@components/RichTextEditor/Plugins/TextStylePlugin/types';
import {
    mentionable,
    multipleOrderedListsValue,
    orderedListValue,
    unorderedListValue,
} from '@components/RichTextEditor/helpers/exampleValues';
import { defaultStyles } from '@components/RichTextEditor/utils';

import { serializeNodeToHtmlRecursive } from './serializeNodeToHtmlRecursive';

type ChildElement = {
    type: string;
    children: {
        text: string;
    }[];
};

const createChildElement = (type: string, text: string): ChildElement => {
    return {
        type,
        children: [
            {
                text,
            },
        ],
    };
};

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
                            children: [{ text: 'First item' }],
                        },
                    ],
                },
                {
                    type: ELEMENT_LI,
                    children: [
                        {
                            type: ELEMENT_LIC,
                            children: [{ text: 'Second item' }],
                        },
                    ],
                },
            ],
        };
        const result = serializeNodeToHtmlRecursive(node, defaultStyles, {});

        expect(result).to.be.equal(
            `<ol dir="auto" class="${OL_CLASSES} tw-break-words"><li dir="auto" class="tw-break-words !tw-no-underline tw-flex tw-flex-col [--parent-lh:1lh]" style="font-size: 14px; font-style: normal; font-weight: normal; counter-increment: list-counter;"><p dir="auto" class="tw-break-words tw-justify-start tw-inline-flex"><span class="${LIST_BULLET_CONTAINER_CLASSES}" style="--bullet-content: counter(list-counter, decimal) '.'; --bullet-color: currentColor;"></span><span class="${LIST_ITEM_SPAN_CLASSES}">First item</span></p></li><li dir="auto" class="tw-break-words !tw-no-underline tw-flex tw-flex-col [--parent-lh:1lh]" style="font-size: 14px; font-style: normal; font-weight: normal; counter-increment: list-counter;"><p dir="auto" class="tw-break-words tw-justify-start tw-inline-flex"><span class="${LIST_BULLET_CONTAINER_CLASSES}" style="--bullet-content: counter(list-counter, decimal) '.'; --bullet-color: currentColor;"></span><span class="${LIST_ITEM_SPAN_CLASSES}">Second item</span></p></li></ol>`,
        );
    });

    it('serializes ordered list to html with column break', () => {
        const node = {
            type: ELEMENT_OL,
            children: [
                {
                    type: ELEMENT_LI,
                    children: [
                        {
                            type: ELEMENT_LIC,
                            children: [{ text: 'First item' }],
                            breakAfterColumn: 'active',
                        },
                    ],
                },
                {
                    type: ELEMENT_LI,
                    children: [
                        {
                            type: ELEMENT_LIC,
                            children: [{ text: 'Second item' }],
                        },
                    ],
                },
            ],
        };
        const result = serializeNodeToHtmlRecursive(node, defaultStyles, {});

        expect(result).to.be.equal(
            `<ol dir="auto" class="${OL_CLASSES} tw-break-words"><li dir="auto" class="tw-break-words !tw-no-underline tw-flex tw-flex-col [--parent-lh:1lh]" style="font-size: 14px; font-style: normal; font-weight: normal; counter-increment: list-counter;"><p dir="auto" class="tw-break-words tw-break-after-column tw-break-inside-avoid-column tw-justify-start tw-flex"><span class="${LIST_BULLET_CONTAINER_CLASSES}" style="--bullet-content: counter(list-counter, decimal) '.'; --bullet-color: currentColor;"></span><span class="${LIST_ITEM_SPAN_CLASSES}">First item</span></p></li><li dir="auto" class="tw-break-words !tw-no-underline tw-flex tw-flex-col [--parent-lh:1lh]" style="font-size: 14px; font-style: normal; font-weight: normal; counter-increment: list-counter;"><p dir="auto" class="tw-break-words tw-justify-start tw-inline-flex"><span class="${LIST_BULLET_CONTAINER_CLASSES}" style="--bullet-content: counter(list-counter, decimal) '.'; --bullet-color: currentColor;"></span><span class="${LIST_ITEM_SPAN_CLASSES}">Second item</span></p></li></ol>`,
        );
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
        const result = serializeNodeToHtmlRecursive(node, defaultStyles, {});

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
        const result = serializeNodeToHtmlRecursive(node, defaultStyles, {});

        expect(result).to.not.include('tw-break-after-column');
        expect(result).to.not.include('tw-break-inside-avoid-column');
    });

    it('serializes ordered list with correct list style types to html', () => {
        const result = serializeNodeToHtmlRecursive(orderedListValue, defaultStyles, {});

        // Level 1: decimal, Level 2: lower-alpha, Level 3: lower-roman
        expect(result).to.include('counter(list-counter, decimal)');
        expect(result).to.include('counter(list-counter, lower-alpha)');
        expect(result).to.include('counter(list-counter, lower-roman)');
    });

    it('serializes multiple ordered lists with multiple levels to with correct list style types to html', () => {
        const result = serializeNodeToHtmlRecursive(multipleOrderedListsValue, defaultStyles, {});

        // Verify decimal, lower-alpha, and lower-roman counter types are present
        expect(result).to.include('counter(list-counter, decimal)');
        expect(result).to.include('counter(list-counter, lower-alpha)');
        expect(result).to.include('counter(list-counter, lower-roman)');
    });

    it('serializes list item with custom styles to html', () => {
        const result = serializeNodeToHtmlRecursive(unorderedListValue, defaultStyles, {});

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
            ],
        };
        const result = serializeNodeToHtmlRecursive(node, defaultStyles, {});

        expect(result).to.be.equal(
            `<ul dir="auto" class="${UL_CLASSES} tw-break-words"><li dir="auto" class="tw-break-words !tw-no-underline tw-flex tw-flex-col [--parent-lh:1lh]" style="font-size: 14px; font-style: normal; font-weight: normal; counter-increment: list-counter;"><p dir="auto" class="tw-break-words tw-justify-start tw-inline-flex"><span class="${LIST_BULLET_CONTAINER_CLASSES}" style="--bullet-content: '\u2022'; --bullet-color: currentColor; --bullet-size: 1em;"></span><span class="${LIST_ITEM_SPAN_CLASSES}">This comes first.</span></p></li></ul>`,
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
        const result = serializeNodeToHtmlRecursive(node, defaultStyles, {});
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
        const result = serializeNodeToHtmlRecursive(node, defaultStyles, {});

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
        const result = serializeNodeToHtmlRecursive(node, defaultStyles, {});

        expect(result).to.match(/<p.*><a.*target="_blank".*href="https:\/\/frontify.com".*>This is a Link\.<\/a><\/p>/);
    });

    it('serializes headings and customs html', () => {
        const node = {
            type: ELEMENT_PARAGRAPH,
            children: [
                createChildElement(TextStyles.heading1, 'This is a h1.'),
                createChildElement(TextStyles.heading2, 'This is a h2.'),
                createChildElement(TextStyles.heading3, 'This is a h3.'),
                createChildElement(TextStyles.heading4, 'This is a h4.'),
                createChildElement(TextStyles.custom1, 'This is a custom1.'),
                createChildElement(TextStyles.custom2, 'This is a custom2.'),
                createChildElement(TextStyles.custom3, 'This is a custom3.'),
                createChildElement(TextStyles.quote, 'This is a quote.'),
            ],
        };

        const result = serializeNodeToHtmlRecursive(node, defaultStyles, {});

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

        const result = serializeNodeToHtmlRecursive(node, defaultStyles, {
            mappedMentionable: mapMentionable(mentionable),
        });

        expect(result).to.match(/<p.*>new annotation <span.*>Admiral Gial Ackbar<\/span> adding changes :\)<\/p>/);
    });

    it('serializes a button to html', () => {
        const node = {
            type: ELEMENT_PARAGRAPH,
            children: [
                {
                    type: 'button',
                    target: '_self',
                    url: 'https://frontify.com',
                    buttonStyle: 'primary',
                    children: [{ text: 'button' }],
                },
            ],
        };

        const result = serializeNodeToHtmlRecursive(node, defaultStyles, {});

        expect(result).to.contain('button');
        expect(result).to.contain('href="https://frontify.com"');
        expect(result).to.contain('target="_self"');
    });

    it('serializes a button with target _blank to html', () => {
        const node = {
            type: ELEMENT_PARAGRAPH,
            children: [
                {
                    type: 'button',
                    target: '_blank',
                    url: 'https://frontify.com',
                    buttonStyle: 'primary',
                    children: [{ text: 'button' }],
                },
            ],
        };

        const result = serializeNodeToHtmlRecursive(node, defaultStyles, {});
        expect(result).to.contain('button');
        expect(result).to.contain('target="_blank"');
    });

    it('serializes a checked checklist item to html', () => {
        const node = {
            type: ELEMENT_CHECK_ITEM,
            checked: true,
            children: [{ text: 'item' }],
        };

        const result = serializeNodeToHtmlRecursive(node, defaultStyles, {});
        expect(result).to.contain('item');
        expect(result).to.contain('checked');
    });

    it('serializes an unchecked checklist item to html', () => {
        const node = {
            type: ELEMENT_CHECK_ITEM,
            checked: false,
            children: [{ text: 'item' }],
        };

        const result = serializeNodeToHtmlRecursive(node, defaultStyles, {});
        expect(result).to.include('item');
        expect(result).to.not.include('checked');
    });

    it('serializes a checklist item without an indent to html', () => {
        const node = {
            type: ELEMENT_CHECK_ITEM,
            checked: false,
            children: [{ text: 'item' }],
        };

        const result = serializeNodeToHtmlRecursive(node, defaultStyles, {});
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

            const result = serializeNodeToHtmlRecursive(node, defaultStyles, {});
            expect(result).to.include('item');
            expect(result).to.include(`margin-left:${entry.outcome};`);
        });
    }

    it('serializes with quotes in them correctly', () => {
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
        const result = serializeNodeToHtmlRecursive(node, defaultStyles, {});

        expect(result).to.be.equal(
            '<p dir="auto" class="tw-break-words" style="font-size: 14px; font-style: normal; font-weight: normal;"><a dir="auto" class="tw-break-words" style="font-size: 14px; font-style: normal; color: rgba(182, 10, 227, 1); text-decoration: underline; cursor: pointer;" target="_self" href="https://frontify.com">This is a Link.</a></p>',
        );
    });

    it('serializes ordered list with custom list styles to html', () => {
        const node = {
            type: ELEMENT_OL,
            children: [
                {
                    type: ELEMENT_LI,
                    children: [
                        {
                            type: ELEMENT_LIC,
                            children: [{ text: 'First item' }],
                        },
                    ],
                },
            ],
        };
        const result = serializeNodeToHtmlRecursive(node, defaultStyles, {
            orderedListStyles: [
                { counterType: 'upper-alpha', color: '#333' },
                { counterType: 'lower-roman', color: '#666' },
            ],
        });

        expect(result).to.include('counter(list-counter, upper-alpha)');
        expect(result).to.include('--bullet-color: #333');
        expect(result).to.not.include('counter(list-counter, decimal)');
    });

    it('serializes nested ordered list with custom list styles cycling through levels', () => {
        const node = {
            type: ELEMENT_OL,
            children: [
                {
                    type: ELEMENT_LI,
                    children: [
                        {
                            type: ELEMENT_LIC,
                            children: [{ text: 'First item' }],
                        },
                        {
                            type: ELEMENT_OL,
                            children: [
                                {
                                    type: ELEMENT_LI,
                                    children: [
                                        {
                                            type: ELEMENT_LIC,
                                            children: [{ text: 'Nested item' }],
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ],
        };
        const result = serializeNodeToHtmlRecursive(node, defaultStyles, {
            orderedListStyles: [
                { counterType: 'decimal', color: '#111' },
                { counterType: 'upper-alpha', color: '#222' },
            ],
        });

        // Level 1: decimal with #111, Level 2: upper-alpha with #222
        expect(result).to.include('counter(list-counter, decimal)');
        expect(result).to.include('--bullet-color: #111');
        expect(result).to.include('counter(list-counter, upper-alpha)');
        expect(result).to.include('--bullet-color: #222');
    });

    it('serializes unordered list with custom list styles to html', () => {
        const node = {
            type: ELEMENT_UL,
            children: [
                {
                    type: ELEMENT_LI,
                    children: [
                        {
                            type: ELEMENT_LIC,
                            children: [{ text: 'Bullet item' }],
                        },
                    ],
                },
            ],
        };
        const result = serializeNodeToHtmlRecursive(node, defaultStyles, {
            unorderedListStyles: [{ shape: "'◦'", color: '#999', size: '0.8em' }],
        });

        expect(result).to.include("--bullet-content: '◦'");
        expect(result).to.include('--bullet-color: #999');
        expect(result).to.include('--bullet-size: 0.8em');
    });

    it('serializes unordered list with custom list styles using defaults for optional properties', () => {
        const node = {
            type: ELEMENT_UL,
            children: [
                {
                    type: ELEMENT_LI,
                    children: [
                        {
                            type: ELEMENT_LIC,
                            children: [{ text: 'Bullet item' }],
                        },
                    ],
                },
            ],
        };
        const result = serializeNodeToHtmlRecursive(node, defaultStyles, {
            unorderedListStyles: [{ shape: "'▪'" }],
        });

        expect(result).to.include("--bullet-content: '▪'");
        expect(result).to.include('--bullet-color: currentColor');
        expect(result).to.include('--bullet-size: 1em');
    });

    it('serializes ordered list with custom styles using default color', () => {
        const node = {
            type: ELEMENT_OL,
            children: [
                {
                    type: ELEMENT_LI,
                    children: [
                        {
                            type: ELEMENT_LIC,
                            children: [{ text: 'Item' }],
                        },
                    ],
                },
            ],
        };
        const result = serializeNodeToHtmlRecursive(node, defaultStyles, {
            orderedListStyles: [{ counterType: 'lower-roman' }],
        });

        expect(result).to.include('counter(list-counter, lower-roman)');
        expect(result).to.include('--bullet-color: currentColor');
    });

    it("serializes and don't break if MapNode does not exist", () => {
        const node = {
            type: ELEMENT_PARAGRAPH,
            children: [
                {
                    type: 'img',
                    children: [
                        {
                            text: 'This is ',
                        },
                        {
                            type: 'img',
                            children: [
                                {
                                    text: '',
                                },
                            ],
                            caption: 'Image without source',
                        },
                        {
                            text: '.',
                        },
                    ],
                },
            ],
        };
        const result = serializeNodeToHtmlRecursive(node, defaultStyles, {});

        expect(result).to.be.equal(
            '<p dir="auto" class="tw-break-words" style="font-size: 14px; font-style: normal; font-weight: normal;">This is &#xFEFF;.</p>',
        );
    });
});
