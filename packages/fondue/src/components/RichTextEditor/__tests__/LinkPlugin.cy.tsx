/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ELEMENT_LINK, ELEMENT_PARAGRAPH } from '@udecode/plate';
import { ReactElement } from 'react';
import { LinkPlugin, PluginComposer } from '../Plugins';
import { RichTextEditor } from '../RichTextEditor';
import { insertTextAndOpenToolbar } from './fixtures/RichTextEditor';
import {
    BUTTON,
    CHECKBOX_INPUT_ID,
    EDIT_LINK_BUTTON,
    FLOATING_LINK_EDIT,
    FLOATING_LINK_INSERT,
    REMOVE_LINK_BUTTON,
    TOOLBAR_BUTTON,
    TOOLBAR_FLOATING,
    TOOLBAR_GROUP_1,
} from './fixtures/selectors';

const link = 'https://frontify.com';
const text = 'This is a link';

const RichTextWithLink = ({ text, link }: { text: string; link: string }): ReactElement => {
    return (
        <RichTextEditor
            value={JSON.stringify([
                {
                    type: ELEMENT_PARAGRAPH,
                    children: [
                        {
                            type: ELEMENT_LINK,
                            url: link,
                            target: '_blank',
                            children: [
                                {
                                    text,
                                },
                            ],
                        },
                    ],
                },
            ])}
        />
    );
};

const RichTextWithLegacyLink = ({ text, url }: { text: string; url: string }): ReactElement => {
    return (
        <RichTextEditor
            value={JSON.stringify([
                {
                    type: ELEMENT_PARAGRAPH,
                    children: [
                        {
                            type: ELEMENT_LINK,
                            chosenLink: {
                                searchResult: {
                                    link: url,
                                },
                                openInNewTab: true,
                            },
                            children: [
                                {
                                    text,
                                },
                            ],
                        },
                    ],
                },
            ])}
        />
    );
};

describe('Link Plugin', () => {
    it('should render with link', () => {
        cy.mount(<RichTextWithLink link={link} text={text} />);
        cy.get('[contenteditable=true] a').should('contain.text', text);
        cy.get('[contenteditable=true] a').should('have.attr', 'href', link);
        cy.get('[contenteditable=true] a').should('have.attr', 'target', '_blank');
    });

    it('should open floating link insert', () => {
        cy.mount(<RichTextEditor />);
        insertTextAndOpenToolbar();
        cy.get(TOOLBAR_FLOATING).should('be.visible');
        cy.get(TOOLBAR_GROUP_1).children().eq(4).click();
        cy.get(FLOATING_LINK_INSERT).should('exist');
        cy.get(BUTTON).eq(1).should('be.disabled');
        cy.get('[type=text]').eq(0).should('have.attr', 'value', 'hello');
        cy.get('[type=text]').eq(1).click().type(link);
        cy.get(BUTTON).eq(1).should('not.be.disabled');
        cy.get(CHECKBOX_INPUT_ID).click({ force: true });
        cy.get(BUTTON).eq(1).click();
        cy.get('[contenteditable=true] a').should('have.attr', 'target', '_blank');
        cy.get('[contenteditable=true] a').should('have.attr', 'href', link);
    });

    it('should open floating link insert and edit', () => {
        cy.mount(<RichTextWithLink link={link} text={text} />);
        cy.get(FLOATING_LINK_EDIT).should('not.exist');
        cy.get(FLOATING_LINK_INSERT).should('not.exist');
        cy.get(EDIT_LINK_BUTTON).should('not.exist');
        cy.get(REMOVE_LINK_BUTTON).should('not.exist');

        cy.get('[contenteditable=true] a').realClick();
        cy.get(FLOATING_LINK_EDIT).should('contain', link);
        cy.get(EDIT_LINK_BUTTON).should('exist');
        cy.get(REMOVE_LINK_BUTTON).should('exist');
        cy.get(EDIT_LINK_BUTTON).click();
        cy.get(FLOATING_LINK_INSERT).should('exist');
        cy.get('[type=text]').eq(0).should('have.attr', 'value', text);
        cy.get('[type=text]').eq(1).should('have.attr', 'value', link);
        cy.get('[type=checkbox]').should('be.checked');
    });

    it('should edit link', () => {
        const additionalLink = '/team';
        cy.mount(<RichTextWithLink link={link} text={text} />);
        cy.get('[contenteditable=true] a').realClick();
        cy.get(EDIT_LINK_BUTTON).click();

        cy.get('[type=text]').eq(1).click().type(additionalLink);
        cy.get(CHECKBOX_INPUT_ID).click({ force: true });

        cy.get(BUTTON).eq(1).click();
        cy.get('[contenteditable=true] a').should('have.attr', 'href', link + additionalLink);
        cy.get('[contenteditable=true] a').should('have.attr', 'target', '_self');
    });

    it('should remove link', () => {
        cy.mount(<RichTextWithLink link={link} text={text} />);
        cy.get('[contenteditable=true] a').realClick();
        cy.get(REMOVE_LINK_BUTTON).click();

        cy.get('[contenteditable=true]').should('contain.text', text);
        cy.get('[contenteditable=true] a').should('not.exist');
    });

    it('should render with legacy link', () => {
        cy.mount(<RichTextWithLegacyLink url={link} text={text} />);

        cy.get('[contenteditable=true] a').should('contain.text', text);
        cy.get('[contenteditable=true] a').should('have.attr', 'href', link);
    });

    it('should remove legacy link', () => {
        cy.mount(<RichTextWithLegacyLink url={link} text={text} />);

        cy.get('[contenteditable=true] a').realClick();
        cy.get(REMOVE_LINK_BUTTON).click();

        cy.get('[contenteditable=true]').should('contain.text', text);
        cy.get('[contenteditable=true] a').should('not.exist');
    });

    it('should edit legacy link', () => {
        const additionalLink = '/team';
        cy.mount(<RichTextWithLegacyLink url={link} text={text} />);
        cy.get('[contenteditable=true] a').realClick();
        cy.get(EDIT_LINK_BUTTON).click();

        cy.get('[type=text]').eq(1).click().type(additionalLink);
        cy.get(CHECKBOX_INPUT_ID).click({ force: true });

        cy.get(BUTTON).eq(1).click();
        cy.get('[contenteditable=true] a').should('have.attr', 'href', link + additionalLink);
        cy.get('[contenteditable=true] a').should('have.attr', 'target', '_blank');
    });

    it('should disable link-button when multiple blocks are selected', () => {
        const plugins = new PluginComposer();
        plugins.setPlugin([new LinkPlugin()]);

        cy.mount(<RichTextEditor plugins={plugins} />);

        cy.get('[contenteditable=true]').click().type('block1{enter}block2{selectall}');
        cy.get(TOOLBAR_FLOATING).should('be.visible');
        cy.get(`${TOOLBAR_FLOATING} ${TOOLBAR_BUTTON}`).should('be.disabled');
        cy.get(`${TOOLBAR_FLOATING} ${TOOLBAR_BUTTON}`).should('have.css', 'cursor', 'not-allowed');
    });
});
