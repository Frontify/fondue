/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ELEMENT_LI, ELEMENT_LIC, ELEMENT_UL } from '@udecode/plate-list';
import { ELEMENT_PARAGRAPH } from '@udecode/plate-paragraph';
import { type CSSProperties, type ReactElement } from 'react';

import { OrderedListPlugin, PluginComposer, UnorderedListPlugin } from '../Plugins';
import { RichTextEditor } from '../RichTextEditor';
import { serializeRawToHtml } from '../serializer';

const CONTAINER_WIDTH = 240;
const LONG_UNBREAKABLE_TOKEN = `https://example.com/${'a'.repeat(160)}`;
const SCROLL_CONTAINER_TEST_ID = 'wrap-scroll-container';

const listPlugins = new PluginComposer().setPlugin([new UnorderedListPlugin(), new OrderedListPlugin()]);

// Mirrors Radix ScrollArea's viewport wrapper (`display: table; min-width: 100%`): it shrink-wraps to
// the widest token, the context where `overflow-wrap: break-word` fails to wrap and only `anywhere`
// (which lowers the reported min-content width) does.
const RADIX_VIEWPORT_CONTENT: CSSProperties = { display: 'table', minWidth: '100%' };

const InShrinkWrappingScrollContainer = ({ children }: { children: ReactElement }) => (
    <div data-test-id={SCROLL_CONTAINER_TEST_ID} style={{ width: CONTAINER_WIDTH, overflow: 'auto' }}>
        <div style={RADIX_VIEWPORT_CONTENT}>{children}</div>
    </div>
);

const paragraphValue = JSON.stringify([{ type: ELEMENT_PARAGRAPH, children: [{ text: LONG_UNBREAKABLE_TOKEN }] }]);

const unorderedListValue = JSON.stringify([
    {
        type: ELEMENT_UL,
        children: [{ type: ELEMENT_LI, children: [{ type: ELEMENT_LIC, children: [{ text: LONG_UNBREAKABLE_TOKEN }] }] }],
    },
]);

const expectNoHorizontalOverflow = () => {
    cy.get(`[data-test-id=${SCROLL_CONTAINER_TEST_ID}]`).should('contain.text', 'https://example.com/');
    cy.get(`[data-test-id=${SCROLL_CONTAINER_TEST_ID}]`).should(($container) => {
        const { scrollWidth, clientWidth } = $container[0];
        expect(
            scrollWidth,
            `content width (${scrollWidth}px) stays within its container (${clientWidth}px) — the long token wrapped instead of forcing a horizontal scrollbar`,
        ).to.be.at.most(clientWidth + 1);
    });
};

describe('RichTextEditor wraps long unbreakable content in a shrink-wrapping container', () => {
    it('wraps a long token while editing a paragraph', () => {
        cy.mount(
            <InShrinkWrappingScrollContainer>
                <RichTextEditor border={false} value={paragraphValue} />
            </InShrinkWrappingScrollContainer>,
        );

        expectNoHorizontalOverflow();
    });

    it('wraps a long token while editing a list item', () => {
        cy.mount(
            <InShrinkWrappingScrollContainer>
                <RichTextEditor border={false} plugins={listPlugins} value={unorderedListValue} />
            </InShrinkWrappingScrollContainer>,
        );

        expectNoHorizontalOverflow();
    });

    it('wraps a long token in the serialized (posted) list item', () => {
        const html = serializeRawToHtml(unorderedListValue, listPlugins);

        cy.mount(
            <InShrinkWrappingScrollContainer>
                {/* serializer output of a fixed test string — no untrusted input */}
                {/* eslint-disable-next-line @eslint-react/dom-no-dangerously-set-innerhtml */}
                <div dangerouslySetInnerHTML={{ __html: html }} />
            </InShrinkWrappingScrollContainer>,
        );

        expectNoHorizontalOverflow();
    });
});
