/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { orderedListValue, unorderedListValue } from '../helpers/exampleValues';
import { RichTextEditor } from '../RichTextEditor';
import {
    TEXTSTYLE_DROPDOWN_TRIGGER,
    TEXTSTYLE_OPTION,
    TOOLBAR_FLOATING,
    TOOLBAR_PLUGIN_OL,
} from './fixtures/selectors';

const insertTextAndOpenToolbar = () => cy.get('[contenteditable=true]').click().type('hello{selectall}');
const RichTextEditorWithUnorderedListStyles = () => <RichTextEditor value={JSON.stringify([unorderedListValue])} />;
const RichTextEditorWithOrderedListStyles = () => <RichTextEditor value={JSON.stringify([orderedListValue])} />;

describe('RichTextEditor List Plugin', () => {
    describe('list plugin', () => {
        it('applies the selected text style to the list item', () => {
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

        it('renders the list item without text decoration underline', () => {
            cy.mount(<RichTextEditorWithUnorderedListStyles />);

            cy.get('[contenteditable=true] li').should('have.class', '!tw-no-underline');
        });

        it('renders custom styled list items', () => {
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
    });
});
