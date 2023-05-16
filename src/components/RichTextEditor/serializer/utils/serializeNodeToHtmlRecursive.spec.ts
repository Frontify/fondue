/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    exampleTextStyles,
    mentionable,
    orderedListValue,
    unorderedListValue,
} from '@components/RichTextEditor/helpers/exampleValues';
import { ELEMENT_BUTTON, ELEMENT_CHECK_ITEM, mapMentionable } from '@components/RichTextEditor/Plugins';
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
        const result = serializeNodeToHtmlRecursive(node, {});

        expect(result).to.be.equal(
            '<ol class="tw-list-none tw-pl-[10px] tw-mb-[10px] tw-ml-[15px] [&>li>p]:before:tw-pr-1 [&>li>p]:before:tw-content-[counter(count,decimal)_\'._\'] tw-break-words" style="counter-reset: count;"><li class="tw-break-words [&>p]:before:tw-flex [&>p]:before:tw-justify-end [&>p]:before:tw-w-[1.2em] !tw-no-underline" style="color: var(--f-theme-settings-body-color); font-family: var(--f-theme-settings-body-font-family); font-size: var(--f-theme-settings-body-font-size); font-style: var(--f-theme-settings-body-font-style); font-weight: var(--f-theme-settings-body-font-weight); letter-spacing: var(--f-theme-settings-body-letter-spacing); line-height: var(--f-theme-settings-body-line-height); text-decoration: var(--f-theme-settings-body-text-decoration); text-transform: var(--f-theme-settings-body-text-transform); counter-increment: count;"><p class="tw-break-words tw-justify-start tw-grid tw-grid-cols-[min-content_repeat(3,_auto)]"><span>First item</span></p></li><li class="tw-break-words [&>p]:before:tw-flex [&>p]:before:tw-justify-end [&>p]:before:tw-w-[1.2em] !tw-no-underline" style="color: var(--f-theme-settings-body-color); font-family: var(--f-theme-settings-body-font-family); font-size: var(--f-theme-settings-body-font-size); font-style: var(--f-theme-settings-body-font-style); font-weight: var(--f-theme-settings-body-font-weight); letter-spacing: var(--f-theme-settings-body-letter-spacing); line-height: var(--f-theme-settings-body-line-height); text-decoration: var(--f-theme-settings-body-text-decoration); text-transform: var(--f-theme-settings-body-text-transform); counter-increment: count;"><p class="tw-break-words tw-justify-start tw-grid tw-grid-cols-[min-content_repeat(3,_auto)]"><span>Second item</span></p></li></ol>',
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
        const result = serializeNodeToHtmlRecursive(node, {});

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
        const result = serializeNodeToHtmlRecursive(node, {});

        expect(result).to.not.include('tw-break-after-column');
        expect(result).to.not.include('tw-break-inside-avoid-column');
    });

    it('serializes ordered list with correct list style types to html', () => {
        const result = serializeNodeToHtmlRecursive(orderedListValue, {});

        const parser = new DOMParser();
        const htmlDoc = parser.parseFromString(result, 'text/html');
        const orderedLists = htmlDoc.getElementsByTagName('ol');
        expect(orderedLists[0]?.className).to.include('decimal');
        expect(orderedLists[1]?.className).to.include('alpha');
        expect(orderedLists[2]?.className).to.include('roman');
    });

    it('serializes list item with custom styles to html', () => {
        const result = serializeNodeToHtmlRecursive(unorderedListValue, {});

        const parser = new DOMParser();
        const htmlDoc = parser.parseFromString(result, 'text/html');
        const listItems = htmlDoc.getElementsByTagName('li');

        // custom1
        expect(listItems[0]?.style.fontSize).to.contain('var(--f-theme-settings-custom1-font-size)');
        expect(listItems[0]?.style.fontStyle).to.contain('var(--f-theme-settings-custom1-font-style)');
        expect(listItems[0]?.style.fontWeight).to.contain('var(--f-theme-settings-custom1-font-weight)');

        // custom2
        expect(listItems[1]?.style.fontSize).to.contain('var(--f-theme-settings-custom2-font-size)');
        expect(listItems[1]?.style.fontStyle).to.contain('var(--f-theme-settings-custom2-font-style)');
        expect(listItems[1]?.style.fontWeight).to.contain('var(--f-theme-settings-custom2-font-weight)');
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
        const result = serializeNodeToHtmlRecursive(node, {});

        expect(result).to.be.equal(
            '<ul class="[&>li>p]:before:tw-content-[\'•\'] [&>li>p]:before:tw-px-2 tw-list-none tw-pl-[10px] tw-mb-[10px] tw-ml-[15px] tw-break-words"><li class="tw-break-words [&>p]:before:tw-flex [&>p]:before:tw-justify-end [&>p]:before:tw-w-[1.2em] !tw-no-underline" style="color: var(--f-theme-settings-body-color); font-family: var(--f-theme-settings-body-font-family); font-size: var(--f-theme-settings-body-font-size); font-style: var(--f-theme-settings-body-font-style); font-weight: var(--f-theme-settings-body-font-weight); letter-spacing: var(--f-theme-settings-body-letter-spacing); line-height: var(--f-theme-settings-body-line-height); text-decoration: var(--f-theme-settings-body-text-decoration); text-transform: var(--f-theme-settings-body-text-transform); counter-increment: count;"><p class="tw-break-words tw-justify-start tw-grid tw-grid-cols-[min-content_repeat(3,_auto)]"><span>This comes first.</span></p></li></ul>',
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
        const result = serializeNodeToHtmlRecursive(node, {});

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
        const result = serializeNodeToHtmlRecursive(node, {});

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
        const result = serializeNodeToHtmlRecursive(node, {});

        expect(result).to.match(/<p.*><a.*target="_blank".*href="https:\/\/frontify.com".*>This is a Link\.<\/a><\/p>/);
    });

    it('serializes headings and customs html', () => {
        const node = {
            type: ELEMENT_PARAGRAPH,
            children: [
                createChildElement(exampleTextStyles.heading1, 'This is a h1.'),
                createChildElement(exampleTextStyles.heading2, 'This is a h2.'),
                createChildElement(exampleTextStyles.heading3, 'This is a h3.'),
                createChildElement(exampleTextStyles.heading4, 'This is a h4.'),
                createChildElement(exampleTextStyles.custom1, 'This is a custom1.'),
                createChildElement(exampleTextStyles.custom2, 'This is a custom2.'),
                createChildElement(exampleTextStyles.custom3, 'This is a custom3.'),
                createChildElement(exampleTextStyles.quote, 'This is a quote.'),
            ],
        };

        const result = serializeNodeToHtmlRecursive(node, {});

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

        const result = serializeNodeToHtmlRecursive(node, {});

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

        const result = serializeNodeToHtmlRecursive(node, {});
        expect(result).to.contain('button');
        expect(result).to.contain('target="_blank"');
    });

    it('serializes a checked checklist item to html', () => {
        const node = {
            type: ELEMENT_CHECK_ITEM,
            checked: true,
            children: [{ text: 'item' }],
        };

        const result = serializeNodeToHtmlRecursive(node, {});
        expect(result).to.contain('item');
        expect(result).to.contain('checked');
    });

    it('serializes an unchecked checklist item to html', () => {
        const node = {
            type: ELEMENT_CHECK_ITEM,
            checked: false,
            children: [{ text: 'item' }],
        };

        const result = serializeNodeToHtmlRecursive(node, {});
        expect(result).to.include('item');
        expect(result).to.not.include('checked');
    });

    it('serializes a checklist item without an indent to html', () => {
        const node = {
            type: ELEMENT_CHECK_ITEM,
            checked: false,
            children: [{ text: 'item' }],
        };

        const result = serializeNodeToHtmlRecursive(node, {});
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

            const result = serializeNodeToHtmlRecursive(node, {});
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
        const result = serializeNodeToHtmlRecursive(node, {});

        expect(result).to.be.equal(
            '<p class="tw-break-words" style="color: var(--f-theme-settings-body-color); font-family: var(--f-theme-settings-body-font-family); font-size: var(--f-theme-settings-body-font-size); font-style: var(--f-theme-settings-body-font-style); font-weight: var(--f-theme-settings-body-font-weight); letter-spacing: var(--f-theme-settings-body-letter-spacing); line-height: var(--f-theme-settings-body-line-height); text-decoration: var(--f-theme-settings-body-text-decoration); text-transform: var(--f-theme-settings-body-text-transform);"><a class="tw-break-words" style="color: var(--f-theme-settings-link-color); font-family: var(--f-theme-settings-link-font-family); font-size: var(--f-theme-settings-link-font-size); font-style: var(--f-theme-settings-link-font-style); font-weight: var(--f-theme-settings-link-font-weight); letter-spacing: var(--f-theme-settings-link-letter-spacing); text-decoration: var(--f-theme-settings-link-text-decoration); text-transform: var(--f-theme-settings-link-text-transform);" target="_blank" href="https://frontify.com">This is a Link.</a></p>',
        );
    });
});
