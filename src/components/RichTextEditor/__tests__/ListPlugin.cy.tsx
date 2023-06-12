/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { ELEMENT_LI, ELEMENT_LIC, ELEMENT_OL } from '@udecode/plate';
import { OrderedListPlugin, PluginComposer, UnorderedListPlugin } from '../Plugins';
import { RichTextEditor } from '../RichTextEditor';
import {
    RichTextEditorWithOrderedListStyles,
    RichTextEditorWithUnorderedListStyles,
    insertTextAndOpenToolbar,
    listPlugins,
} from './fixtures/RichTextEditor';
import {
    TEXTSTYLE_DROPDOWN_TRIGGER,
    TEXTSTYLE_OPTION,
    TOOLBAR_FLOATING,
    TOOLBAR_GROUP_1,
    TOOLBAR_PLUGIN_OL,
} from './fixtures/selectors';

const RichTextEditorWithListPluginWithSoftBreak = ({ value }: { value: string }) => {
    const plugins = new PluginComposer().setPlugin([
        new UnorderedListPlugin({ isSoftBreak: true }),
        new OrderedListPlugin({ isSoftBreak: true }),
    ]);

    return <RichTextEditor border={false} plugins={plugins} value={value} />;
};

describe('List Plugin', () => {
    it('applies the selected text style to the list item', () => {
        cy.mount(<RichTextEditorWithOrderedListStyles />);

        const firstListItemSelector = '[contenteditable=true] ol:first-child > li:first-child';
        cy.mount(<RichTextEditor plugins={listPlugins} />);

        insertTextAndOpenToolbar();
        cy.get(TOOLBAR_FLOATING).should('be.visible');
        cy.get(TOOLBAR_PLUGIN_OL).click();
        cy.get(TEXTSTYLE_DROPDOWN_TRIGGER).click({ force: true });
        cy.get(TEXTSTYLE_OPTION).first().click();
        cy.get(firstListItemSelector).should(
            'have.attr',
            'style',
            'font-size: 48px; font-style: normal; font-weight: 700; counter-increment: count 1;',
        );
    });

    it('renders the list item without text decoration underline', () => {
        cy.mount(<RichTextEditorWithUnorderedListStyles />);

        cy.get('[contenteditable=true] li').should('have.class', '!tw-no-underline');
    });

    it('renders custom styled list items', () => {
        cy.mount(<RichTextEditorWithUnorderedListStyles />);
        cy.get('[contenteditable=true] li:first-child').should(
            'have.attr',
            'style',
            'font-size: 14px; font-weight: normal; font-style: normal; counter-increment: count 1;',
        );
        cy.get('[contenteditable=true] li:nth-child(2)').should(
            'have.attr',
            'style',
            'font-size: 14px; font-weight: 600; font-style: normal; counter-increment: count 1;',
        );
    });

    it('renders ordered list right aligned', () => {
        cy.mount(<RichTextEditorWithOrderedListStyles />);

        insertTextAndOpenToolbar();
        cy.get(TOOLBAR_FLOATING).should('be.visible');
        cy.get(TOOLBAR_GROUP_1).children().eq(2).click();
        cy.get('[contenteditable=true]').should('include.html', 'tw-justify-end tw-text-right');
    });

    it('renders new list item with soft break', () => {
        const orderedListValue = {
            type: ELEMENT_OL,
            children: [
                {
                    type: ELEMENT_LI,
                    children: [{ type: ELEMENT_LIC, children: [{ text: 'This comes first.' }] }],
                },
            ],
        };

        cy.mount(<RichTextEditorWithListPluginWithSoftBreak value={JSON.stringify([orderedListValue])} />);
        const itemValue = 'This comes second';

        const listItemSelector = '[contenteditable=true] ol';
        const firstListItemSelector = '[contenteditable=true] ol:first-child > li:first-child';
        const secondListItemSelector = '[contenteditable=true] ol:first-child > li:nth-child(2)';

        cy.get(firstListItemSelector).type(`{end}{shift+enter}${itemValue}`);

        cy.get(listItemSelector).children().should('have.length', 2);
        cy.get(firstListItemSelector).children().should('have.length', 1);
        cy.get(secondListItemSelector).should('include.text', itemValue);
    });
});
