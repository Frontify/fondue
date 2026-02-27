/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ELEMENT_LINK } from '@udecode/plate-link';
import { ELEMENT_LI, ELEMENT_LIC, ELEMENT_OL, ELEMENT_UL } from '@udecode/plate-list';
import { ELEMENT_MENTION } from '@udecode/plate-mention';
import { ELEMENT_PARAGRAPH } from '@udecode/plate-paragraph';

import { ELEMENT_CHECK_ITEM, LIST_ITEM_SPAN_CLASSES, mapMentionable } from '@components/RichTextEditor/Plugins';
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
            `<ol dir="auto" class="tw-list-none tw-pl-[10px] tw-mb-[10px] tw-ml-[15px] [&>li>p]:before:tw-whitespace-nowrap [&>li>p]:before:tw-pr-1 [&>li>p]:before:tw-tabular-nums [&>li>p]:before:tw-content-[counter(count,var(--counter-type))_'._'] [&>li>p]:before:tw-text-[color:var(--counter-color)] tw-break-words" style="counter-reset: count; --counter-type: decimal; --counter-color: currentColor;"><li dir="auto" class="tw-break-words [&>p]:before:tw-flex [&>p]:before:tw-justify-end [&>p]:before:tw-w-[1.2em] !tw-no-underline !tw-list-item" style="font-size: 14px; font-style: normal; font-weight: normal; counter-increment: count;"><p dir="auto" class="tw-break-words tw-justify-start tw-inline-grid tw-grid-cols-[min-content_repeat(3,_auto)]"><span class="${LIST_ITEM_SPAN_CLASSES}">First item</span></p></li><li dir="auto" class="tw-break-words [&>p]:before:tw-flex [&>p]:before:tw-justify-end [&>p]:before:tw-w-[1.2em] !tw-no-underline !tw-list-item" style="font-size: 14px; font-style: normal; font-weight: normal; counter-increment: count;"><p dir="auto" class="tw-break-words tw-justify-start tw-inline-grid tw-grid-cols-[min-content_repeat(3,_auto)]"><span class="${LIST_ITEM_SPAN_CLASSES}">Second item</span></p></li></ol>`,
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
            `<ol dir="auto" class="tw-list-none tw-pl-[10px] tw-mb-[10px] tw-ml-[15px] [&>li>p]:before:tw-whitespace-nowrap [&>li>p]:before:tw-pr-1 [&>li>p]:before:tw-tabular-nums [&>li>p]:before:tw-content-[counter(count,var(--counter-type))_'._'] [&>li>p]:before:tw-text-[color:var(--counter-color)] tw-break-words" style="counter-reset: count; --counter-type: decimal; --counter-color: currentColor;"><li dir="auto" class="tw-break-words [&>p]:before:tw-flex [&>p]:before:tw-justify-end [&>p]:before:tw-w-[1.2em] !tw-no-underline !tw-list-item" style="font-size: 14px; font-style: normal; font-weight: normal; counter-increment: count;"><p dir="auto" class="tw-break-words tw-break-after-column tw-break-inside-avoid-column tw-justify-start tw-grid tw-grid-cols-[min-content_repeat(3,_auto)]"><span class="${LIST_ITEM_SPAN_CLASSES}">First item</span></p></li><li dir="auto" class="tw-break-words [&>p]:before:tw-flex [&>p]:before:tw-justify-end [&>p]:before:tw-w-[1.2em] !tw-no-underline !tw-list-item" style="font-size: 14px; font-style: normal; font-weight: normal; counter-increment: count;"><p dir="auto" class="tw-break-words tw-justify-start tw-inline-grid tw-grid-cols-[min-content_repeat(3,_auto)]"><span class="${LIST_ITEM_SPAN_CLASSES}">Second item</span></p></li></ol>`,
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

        const parser = new DOMParser();
        const htmlDoc = parser.parseFromString(result, 'text/html');
        const orderedLists = htmlDoc.getElementsByTagName('ol');
        expect(orderedLists[0]?.getAttribute('style')).to.include('--counter-type: decimal');
        expect(orderedLists[1]?.getAttribute('style')).to.include('--counter-type: lower-alpha');
        expect(orderedLists[2]?.getAttribute('style')).to.include('--counter-type: lower-roman');
    });

    it('serializes multiple ordered lists with multiple levels to with correct list style types to html', () => {
        const result = serializeNodeToHtmlRecursive(multipleOrderedListsValue, defaultStyles, {});

        const parser = new DOMParser();
        const htmlDoc = parser.parseFromString(result, 'text/html');
        const orderedLists = htmlDoc.getElementsByTagName('ol');
        expect(orderedLists[0]?.getAttribute('style')).to.include('--counter-type: decimal');
        expect(orderedLists[1]?.getAttribute('style')).to.include('--counter-type: lower-alpha');
        expect(orderedLists[2]?.getAttribute('style')).to.include('--counter-type: lower-roman');
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
            `<ul dir="auto" class="tw-list-none tw-pl-[10px] tw-mb-[10px] tw-ml-[15px] [&>li>p]:before:tw-whitespace-nowrap [&>li>p]:before:tw-px-2 [&>li>p]:before:tw-content-[var(--bullet-character)] [&>li>p]:before:tw-text-[color:var(--bullet-color)] [&>li>p]:before:tw-text-[length:var(--bullet-size)] tw-break-words" style="--bullet-character: '•'; --bullet-color: currentColor; --bullet-size: 1em;"><li dir="auto" class="tw-break-words [&>p]:before:tw-flex [&>p]:before:tw-justify-end [&>p]:before:tw-w-[1.2em] !tw-no-underline !tw-list-item" style="font-size: 14px; font-style: normal; font-weight: normal; counter-increment: count;"><p dir="auto" class="tw-break-words tw-justify-start tw-inline-grid tw-grid-cols-[min-content_repeat(3,_auto)]"><span class="${LIST_ITEM_SPAN_CLASSES}">This comes first.</span></p></li></ul>`,
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

        expect(result).to.include('--counter-type: upper-alpha');
        expect(result).to.include('--counter-color: #333');
        expect(result).to.include('counter-reset: count');
        expect(result).to.not.include('decimal');
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

        const parser = new DOMParser();
        const htmlDoc = parser.parseFromString(result, 'text/html');
        const orderedLists = htmlDoc.getElementsByTagName('ol');
        expect(orderedLists[0]?.getAttribute('style')).to.include('--counter-type: decimal');
        expect(orderedLists[0]?.getAttribute('style')).to.include('--counter-color: #111');
        expect(orderedLists[1]?.getAttribute('style')).to.include('--counter-type: upper-alpha');
        expect(orderedLists[1]?.getAttribute('style')).to.include('--counter-color: #222');
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
            unorderedListStyles: [
                { shape: '◦', color: '#999', size: '0.8em' },
            ],
        });

        expect(result).to.include("--bullet-character: '◦'");
        expect(result).to.include('--bullet-color: #999');
        expect(result).to.include('--bullet-size: 0.8em');
        expect(result).to.not.include("tw-content-['•']");
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
            unorderedListStyles: [{ shape: '▪' }],
        });

        expect(result).to.include("--bullet-character: '▪'");
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

        expect(result).to.include('--counter-type: lower-roman');
        expect(result).to.include('--counter-color: currentColor');
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
