/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ELEMENT_LI, ELEMENT_LIC, ELEMENT_UL } from '@udecode/plate-list';
import { ELEMENT_PARAGRAPH } from '@udecode/plate-paragraph';
import { type CSSProperties, type ReactElement } from 'react';

import {
    CheckboxListPlugin,
    ELEMENT_CHECK_ITEM,
    Heading1Plugin,
    OrderedListPlugin,
    ParagraphPlugin,
    PluginComposer,
    QuotePlugin,
    TextStylePlugin,
    TextStyles,
    UnorderedListPlugin,
} from '../Plugins';
import { RichTextEditor } from '../RichTextEditor';
import { serializeRawToHtml } from '../serializer';

const CONTAINER_WIDTH = 240;
const LONG_UNBREAKABLE_TOKEN = `https://example.com/${'a'.repeat(160)}`;
const NORMAL_PROSE = 'Ordinary sentences keep wrapping between words, so no single word is split across two lines';
const SCROLL_CONTAINER_TEST_ID = 'wrap-scroll-container';

const listPlugins = new PluginComposer().setPlugin([new UnorderedListPlugin(), new OrderedListPlugin()]);
const blockPlugins = new PluginComposer().setPlugin([
    new TextStylePlugin({ textStyles: [new Heading1Plugin(), new QuotePlugin(), new ParagraphPlugin()] }),
    new CheckboxListPlugin(),
]);

// Radix ScrollArea's viewport wrapper, which shrink-wraps to the widest token unless the content lowers its min-content width.
const RADIX_VIEWPORT_CONTENT: CSSProperties = { display: 'table', minWidth: '100%' };

const InShrinkWrappingScrollContainer = ({ children }: { children: ReactElement }) => (
    <div data-test-id={SCROLL_CONTAINER_TEST_ID} style={{ width: CONTAINER_WIDTH, overflow: 'auto' }}>
        <div style={RADIX_VIEWPORT_CONTENT}>{children}</div>
    </div>
);

const Serialized = ({ value, plugins }: { value: string; plugins?: PluginComposer }) => (
    // eslint-disable-next-line @eslint-react/dom-no-dangerously-set-innerhtml
    <div dangerouslySetInnerHTML={{ __html: serializeRawToHtml(value, plugins) }} />
);

const singleBlockValue = (type: string, text = LONG_UNBREAKABLE_TOKEN) => JSON.stringify([{ type, children: [{ text }] }]);

const unorderedListValue = JSON.stringify([
    {
        type: ELEMENT_UL,
        children: [{ type: ELEMENT_LI, children: [{ type: ELEMENT_LIC, children: [{ text: LONG_UNBREAKABLE_TOKEN }] }] }],
    },
]);

type Block = { name: string; value: string; plugins?: PluginComposer };

const paragraphBlock: Block = { name: 'paragraph', value: singleBlockValue(ELEMENT_PARAGRAPH) };
const listItemBlock: Block = { name: 'list item', value: unorderedListValue, plugins: listPlugins };

const editedBlocks: Block[] = [
    paragraphBlock,
    listItemBlock,
    { name: 'heading', value: singleBlockValue(TextStyles.heading1), plugins: blockPlugins },
    { name: 'quote', value: singleBlockValue(TextStyles.quote), plugins: blockPlugins },
    { name: 'checklist item', value: singleBlockValue(ELEMENT_CHECK_ITEM), plugins: blockPlugins },
];

const serializedBlocks = [paragraphBlock, listItemBlock];

const expectNoHorizontalOverflow = () => {
    cy.get(`[data-test-id=${SCROLL_CONTAINER_TEST_ID}]`).should('contain.text', LONG_UNBREAKABLE_TOKEN);
    cy.get(`[data-test-id=${SCROLL_CONTAINER_TEST_ID}]`).should(($container) => {
        const { scrollWidth, clientWidth } = $container[0];
        expect(
            scrollWidth,
            `content width (${scrollWidth}px) stays within its container (${clientWidth}px) — the long token wrapped instead of forcing a horizontal scrollbar`,
        ).to.be.at.most(clientWidth);
    });
};

describe('RichTextEditor wraps long unbreakable content in a shrink-wrapping container', () => {
    for (const { name, value, plugins } of editedBlocks) {
        it(`should wrap a long token while editing a ${name}`, () => {
            cy.mount(
                <InShrinkWrappingScrollContainer>
                    <RichTextEditor border={false} plugins={plugins} value={value} />
                </InShrinkWrappingScrollContainer>,
            );

            expectNoHorizontalOverflow();
        });
    }

    for (const { name, value, plugins } of serializedBlocks) {
        it(`should wrap a long token in a serialized ${name}`, () => {
            cy.mount(
                <InShrinkWrappingScrollContainer>
                    <Serialized value={value} plugins={plugins} />
                </InShrinkWrappingScrollContainer>,
            );

            expectNoHorizontalOverflow();
        });
    }

    it('should keep normal words whole while wrapping between them', () => {
        cy.mount(
            <InShrinkWrappingScrollContainer>
                <RichTextEditor border={false} value={singleBlockValue(ELEMENT_PARAGRAPH, NORMAL_PROSE)} />
            </InShrinkWrappingScrollContainer>,
        );

        cy.get('[data-slate-string]').should(($string) => {
            const textNode = $string[0].firstChild as Text;
            const range = document.createRange();
            range.selectNodeContents(textNode);
            expect(range.getClientRects().length, 'line count').to.be.greaterThan(1);

            for (const word of NORMAL_PROSE.matchAll(/\S+/g)) {
                range.setStart(textNode, word.index);
                range.setEnd(textNode, word.index + word[0].length);
                expect(range.getClientRects(), `"${word[0]}" stays on one line`).to.have.length(1);
            }
        });
    });
});
