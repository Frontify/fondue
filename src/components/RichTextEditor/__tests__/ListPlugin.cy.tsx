/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { orderedListValue, unorderedListValue } from '../helpers/exampleValues';
import { OrderedListPlugin, PluginComposer, UnorderedListPlugin } from '../Plugins';
import { RichTextEditor } from '../RichTextEditor';
import { insertTextAndOpenToolbar } from './fixtures/RichTextEditor';
import {
    TEXTSTYLE_DROPDOWN_TRIGGER,
    TEXTSTYLE_OPTION,
    TOOLBAR_FLOATING,
    TOOLBAR_PLUGIN_OL,
} from './fixtures/selectors';

const RichTextEditorWithListPluginWithSoftBreak = ({ value }: { value: string }) => {
    const plugins = new PluginComposer().setPlugin([
        new UnorderedListPlugin({ isSoftBreak: true }),
        new OrderedListPlugin({ isSoftBreak: true }),
    ]);

    return <RichTextEditor border={false} plugins={plugins} value={value} />;
};

const RichTextEditorWithUnorderedListStyles = () => (
    <RichTextEditorWithListPluginWithSoftBreak value={JSON.stringify([unorderedListValue])} />
);
const RichTextEditorWithOrderedListStyles = () => (
    <RichTextEditorWithListPluginWithSoftBreak value={JSON.stringify([orderedListValue])} />
);

describe('List Plugin', () => {
    it.skip('applies the selected text style to the list item', () => {
        cy.mount(<RichTextEditorWithOrderedListStyles />);

        const firstListItemSelector = '[contenteditable=true] ol:first-child > li:first-child';
        cy.mount(<RichTextEditor />);

        insertTextAndOpenToolbar();
        cy.get(TOOLBAR_FLOATING).should('be.visible');
        cy.get(TOOLBAR_PLUGIN_OL).click();
        cy.get(TEXTSTYLE_DROPDOWN_TRIGGER).click({ force: true });
        cy.get(TEXTSTYLE_OPTION).first().click();
        cy.get(firstListItemSelector).should(
            'have.attr',
            'style',
            'font-size: 48px; font-style: normal; font-weight: 700;',
        );
    });

    it.skip('renders the list item without text decoration underline', () => {
        cy.mount(<RichTextEditorWithUnorderedListStyles />);

        cy.get('[contenteditable=true] li').should('have.class', '!tw-no-underline');
    });

    it.skip('renders custom styled list items', () => {
        cy.mount(<RichTextEditorWithUnorderedListStyles />);
        cy.get('[contenteditable=true] li:first-child').should(
            'have.attr',
            'style',
            'font-size: 14px; font-weight: normal; font-style: normal;',
        );
        cy.get('[contenteditable=true] li:nth-child(2)').should(
            'have.attr',
            'style',
            'font-size: 14px; font-weight: 600; font-style: normal;',
        );
    });

    it('renders ', () => {
        cy.mount(<RichTextEditorWithUnorderedListStyles />);

        cy.get('[contenteditable=true] li').should('have.class', '!tw-no-underline');
    });
});
