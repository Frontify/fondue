/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ELEMENT_LI, ELEMENT_LIC, ELEMENT_OL } from '@udecode/plate';
import React from 'react';
import { orderedListValue, unorderedListValue } from '../helpers/exampleValues';
import {
    OrderedListPlugin,
    ParagraphPlugin,
    PluginComposer,
    SoftBreakPlugin,
    TextStylePlugin,
    UnorderedListPlugin,
} from '../Plugins';
import { RichTextEditor } from '../RichTextEditor';
import { insertTextAndOpenToolbar } from './fixtures/RichTextEditor';
import {
    TEXTSTYLE_DROPDOWN_TRIGGER,
    TEXTSTYLE_OPTION,
    TOOLBAR_FLOATING,
    TOOLBAR_PLUGIN_OL,
} from './fixtures/selectors';
import './fixtures/theme.css';
import { Heading1Plugin } from '../Plugins/TextStylePlugin/examples/heading1Plugin';
import { Custom1Plugin } from '../Plugins/TextStylePlugin/examples/custom1Plugin';
import { Custom2Plugin } from '../Plugins/TextStylePlugin/examples/custom2Plugin';
import { Custom3Plugin } from '../Plugins/TextStylePlugin/examples/custom3Plugin';

const RichTextEditorWithListPluginWithSoftBreak = ({ value }: { value: string }) => {
    const plugins = new PluginComposer().setPlugin([
        new UnorderedListPlugin({ isSoftBreak: true }),
        new OrderedListPlugin({ isSoftBreak: true }),
    ]);

    return <RichTextEditor border={false} plugins={plugins} value={value} />;
};

const plugins = new PluginComposer();
plugins
    .setPlugin(new SoftBreakPlugin())
    .setPlugin(
        new TextStylePlugin({
            textStyles: [
                new Heading1Plugin(),
                new ParagraphPlugin(),
                new Custom1Plugin(),
                new Custom2Plugin(),
                new Custom3Plugin(),
            ],
        }),
    )
    .setPlugin([new UnorderedListPlugin(), new OrderedListPlugin()]);

const RichTextEditorWithUnorderedListStyles = () => (
    <RichTextEditor value={JSON.stringify([unorderedListValue])} plugins={plugins} />
);
const RichTextEditorWithOrderedListStyles = () => (
    <RichTextEditor value={JSON.stringify([orderedListValue])} plugins={plugins} />
);

describe('List Plugin', () => {
    it('applies the selected text style to the list item', () => {
        cy.mount(<RichTextEditorWithOrderedListStyles />);

        const firstListItemSelector = '[contenteditable=true] ol:first-child > li:first-child';
        cy.mount(<RichTextEditor plugins={plugins} />);

        insertTextAndOpenToolbar();
        cy.get(TOOLBAR_FLOATING).should('be.visible');
        cy.get(TOOLBAR_PLUGIN_OL).click();
        cy.get(TEXTSTYLE_DROPDOWN_TRIGGER).click({ force: true });
        cy.get(TEXTSTYLE_OPTION).first().click();
        cy.get(firstListItemSelector).should(
            'have.attr',
            'style',
            'color: var(--f-theme-settings-heading1-color); font-family: var(--f-theme-settings-heading1-font-family); font-size: var(--f-theme-settings-heading1-font-size); font-style: var(--f-theme-settings-heading1-font-style); font-weight: var(--f-theme-settings-heading1-font-weight); letter-spacing: var(--f-theme-settings-heading1-letter-spacing); line-height: var(--f-theme-settings-heading1-line-height); text-decoration: var(--f-theme-settings-heading1-text-decoration); text-transform: var(--f-theme-settings-heading1-text-transform); margin-top: var(--f-theme-settings-heading1-margin-top); margin-bottom: var(--f-theme-settings-heading1-margin-bottom); counter-increment: count 1;',
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
            'color: var(--f-theme-settings-custom1-color); font-family: var(--f-theme-settings-custom1-font-family); font-size: var(--f-theme-settings-custom1-font-size); font-style: var(--f-theme-settings-custom1-font-style); font-weight: var(--f-theme-settings-custom1-font-weight); letter-spacing: var(--f-theme-settings-custom1-letter-spacing); line-height: var(--f-theme-settings-custom1-line-height); text-decoration: var(--f-theme-settings-custom1-text-decoration); text-transform: var(--f-theme-settings-custom1-text-transform); margin-top: var(--f-theme-settings-custom1-margin-top); margin-bottom: var(--f-theme-settings-custom1-margin-bottom); counter-increment: count 1;',
        );
        cy.get('[contenteditable=true] li:nth-child(2)').should(
            'have.attr',
            'style',
            'color: var(--f-theme-settings-custom2-color); font-family: var(--f-theme-settings-custom2-font-family); font-size: var(--f-theme-settings-custom2-font-size); font-style: var(--f-theme-settings-custom2-font-style); font-weight: var(--f-theme-settings-custom2-font-weight); letter-spacing: var(--f-theme-settings-custom2-letter-spacing); line-height: var(--f-theme-settings-custom2-line-height); text-decoration: var(--f-theme-settings-custom2-text-decoration); text-transform: var(--f-theme-settings-custom2-text-transform); margin-top: var(--f-theme-settings-custom2-margin-top); margin-bottom: var(--f-theme-settings-custom2-margin-bottom); counter-increment: count 1;',
        );
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
