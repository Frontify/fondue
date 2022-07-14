/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from '@cypress/react';
import { ELEMENT_LINK, ELEMENT_PARAGRAPH } from '@udecode/plate';
import React, { FC, useState } from 'react';
import { ON_SAVE_DELAY_IN_MS, RichTextEditor, RichTextEditorProps } from './RichTextEditor';
import { DesignTokens } from './types';
import { EditorActions } from './utils/actions';
import { value } from './utils/exampleValues';
import { toPlaintext } from './utils/plaintext';

const RICH_TEXT_EDITOR = '[data-test-id=rich-text-editor]';
const TOOLBAR = '[data-test-id=toolbar]';
const TOOLBAR_GROUP_0 = '[data-test-id=toolbar-group-0]';
const TOOLBAR_GROUP_1 = '[data-test-id=toolbar-group-1]';
const TOOLBAR_GROUP_2 = '[data-test-id=toolbar-group-2]';
const TOOLBAR_GROUP_3 = '[data-test-id=toolbar-group-3]';
const TEXTSTYLE_DROPDOWN_TRIGGER = '[data-test-id=textstyle-dropdown-trigger]';
const CHANGE_DESIGN_TOKENS_TRIGGER = '[data-test-id=change-design-tokens-button]';
const TEXTSTYLE_OPTION = '[data-test-id=textstyle-option]';
const CHECKBOX_INPUT = '[data-test-id=checkbox-input]';
const PREVIEW_LINK_FLYOUT = '[data-test-id=preview-link-flyout]';
const EDIT_LINK_BUTTON = '[data-test-id=edit-link-button]';
const REMOVE_LINK_BUTTON = '[data-test-id=remove-link-button]';
const LINK_CHOOSER_FLYOUT = '[data-test-id=link-chooser-flyout]';
const BUTTON = '[data-test-id=button]';
const LINK_CHOOSER_CHECKBOX = '.tw-group > .tw-inline-flex > .tw-flex-1 > .tw-select-none';

const insertTextAndOpenToolbar = () => cy.get('[contenteditable=true]').click().type('hello{selectall}');

const RichTextWithClearButton: FC<Pick<RichTextEditorProps, 'value'>> = ({ value }) => {
    const [clear, setClear] = useState(false);
    return (
        <div>
            <button data-test-id="clear-button" onClick={() => setClear(true)}>
                clear
            </button>
            <RichTextEditor value={value} clear={clear} />
        </div>
    );
};

const RichTextWithLink: FC<{ text: string; link: string }> = ({ text, link }) => {
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
                                    link,
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

const RichTextWithLegacyLink: FC<{ text: string; url: string }> = ({ text, url }) => {
    return (
        <RichTextEditor
            value={JSON.stringify([
                {
                    type: ELEMENT_PARAGRAPH,
                    children: [
                        {
                            type: ELEMENT_LINK,
                            children: [{ text }],
                            url,
                        },
                    ],
                },
            ])}
        />
    );
};

const RichTextWithChangeDesignTokensButton: FC = () => {
    const [designTokens, setDesignTokens] = useState<DesignTokens>({
        custom1: {
            fontSize: '42px',
        },
    });
    return (
        <div>
            <button
                data-test-id="change-design-tokens-button"
                onClick={() =>
                    setDesignTokens({
                        custom1: {
                            fontSize: '11px',
                        },
                    })
                }
            >
                Change font size from 42 to 11
            </button>
            <RichTextEditor designTokens={designTokens} />
        </div>
    );
};

describe('RichTextEditor Component', () => {
    it('should render an empty rich text editor', () => {
        mount(<RichTextEditor />);

        cy.get(RICH_TEXT_EDITOR).should('be.visible');
    });

    it('should render a raw content state', () => {
        const text = 'This is some text that you can not edit';
        mount(<RichTextEditor value={JSON.stringify([{ type: ELEMENT_PARAGRAPH, children: [{ text }] }])} />);

        cy.get(RICH_TEXT_EDITOR).should('contain.text', text);
    });

    it('should render a raw html content state', () => {
        mount(<RichTextEditor value={'<b>this is bold</b> and <i>this italic</i>'} />);

        cy.get(RICH_TEXT_EDITOR).should('contain.text', 'this is bold and this italic');
        cy.get('[contenteditable=true]').should('include.html', 'tw-font-bold');
        cy.get('[contenteditable=true]').should('include.html', 'tw-italic');
    });

    it('should be editable by default ', () => {
        mount(<RichTextEditor />);

        cy.get('[contenteditable=true]').should('exist');
    });

    it('should not the able to edit when readonly ', () => {
        mount(<RichTextEditor readonly />);

        cy.get('[contenteditable=false]').should('exist');
    });

    it('should type and insert text', () => {
        mount(<RichTextEditor />);

        cy.get('[contenteditable=true]').click().type('hello');
    });

    it('should display toolbar when selecting inserted text', () => {
        mount(<RichTextEditor />);

        insertTextAndOpenToolbar();
        cy.get(TOOLBAR).should('be.visible');
    });

    it('should close toolbar on blur', () => {
        mount(<RichTextEditor />);

        insertTextAndOpenToolbar();
        cy.get('[contenteditable=true]').blur();
        cy.get(TOOLBAR).should('not.be.visible');
    });

    it('renders a toolbar with custom controls', () => {
        const actions = [[EditorActions.LINK], [EditorActions.ITALIC, EditorActions.BOLD], [EditorActions.LINK]];
        mount(<RichTextEditor actions={actions} />);

        insertTextAndOpenToolbar();
        cy.get(TOOLBAR).should('be.visible');
        cy.get(TOOLBAR_GROUP_0).find('[data-testid=ToolbarButton]').should('have.length', 1);
        cy.get(TOOLBAR_GROUP_1).find('[data-testid=ToolbarButton]').should('have.length', 2);
        cy.get(TOOLBAR_GROUP_2).find('[data-testid=ToolbarButton]').should('have.length', 1);
        cy.get(TOOLBAR_GROUP_3).should('not.exist');
    });

    it('renders a bold text', () => {
        mount(<RichTextEditor />);

        insertTextAndOpenToolbar();
        cy.get(TOOLBAR).should('be.visible');
        cy.get(TOOLBAR_GROUP_1).children().eq(0).click();
        cy.get('[contenteditable=true]').should('include.html', 'tw-font-bold');
    });

    it('renders italic', () => {
        mount(<RichTextEditor />);

        insertTextAndOpenToolbar();
        cy.get(TOOLBAR).should('be.visible');
        cy.get(TOOLBAR_GROUP_1).children().eq(1).click();
        cy.get('[contenteditable=true]').should('include.html', 'tw-italic');
    });

    it('renders underline', () => {
        mount(<RichTextEditor />);

        insertTextAndOpenToolbar();
        cy.get(TOOLBAR).should('be.visible');
        cy.get(TOOLBAR_GROUP_1).children().eq(2).click();
        cy.get('[contenteditable=true]').should('include.html', 'tw-underline');
    });

    it('renders strikethrough', () => {
        mount(<RichTextEditor />);

        insertTextAndOpenToolbar();
        cy.get(TOOLBAR).should('be.visible');
        cy.get(TOOLBAR_GROUP_1).children().eq(3).click();
        cy.get('[contenteditable=true]').should('include.html', 'tw-line-through');
    });

    it('renders code', () => {
        mount(<RichTextEditor />);

        insertTextAndOpenToolbar();
        cy.get(TOOLBAR).should('be.visible');
        cy.get(TOOLBAR_GROUP_1).children().eq(5).click();
        cy.get('[contenteditable=true]').should(
            'include.html',
            'tw-table-cell tw-rounded tw-bg-box-neutral tw-text-box-neutral-inverse tw-m-0 tw-px-2 tw-py-0.5',
        );
    });

    it('renders an unordered list', () => {
        mount(<RichTextEditor />);

        insertTextAndOpenToolbar();
        cy.get(TOOLBAR).should('be.visible');
        cy.get(TOOLBAR_GROUP_2).children().eq(4).click();
        cy.get('[contenteditable=true]').should('include.html', '<ul');
    });

    it('renders an ordered list', () => {
        mount(<RichTextEditor />);

        insertTextAndOpenToolbar();
        cy.get(TOOLBAR).should('be.visible');
        cy.get(TOOLBAR_GROUP_2).children().eq(6).click();
        cy.get('[contenteditable=true]').should('include.html', '<ol');
    });

    it('renders a right aligned text', () => {
        mount(<RichTextEditor />);

        insertTextAndOpenToolbar();
        cy.get(TOOLBAR).should('be.visible');
        cy.get(TOOLBAR_GROUP_2).children().eq(2).click();
        cy.get('[contenteditable=true]').should('include.html', 'text-align: right');
    });

    it('renders a heading', () => {
        mount(<RichTextEditor />);

        insertTextAndOpenToolbar();
        cy.get(TOOLBAR).should('be.visible');
        cy.get(TEXTSTYLE_DROPDOWN_TRIGGER).click({ force: true });
        cy.get(TEXTSTYLE_OPTION).first().click();
        cy.get('[contenteditable=true]').should('include.html', '<h1');
    });

    it('renders a custom font', () => {
        mount(<RichTextEditor />);

        insertTextAndOpenToolbar();
        cy.get(TOOLBAR).should('be.visible');
        cy.get(TEXTSTYLE_DROPDOWN_TRIGGER).click({ force: true });
        cy.get(TEXTSTYLE_OPTION).eq(6).click();
        cy.get('[contenteditable=true] > p').should(
            'have.attr',
            'style',
            'font-size: 14px; text-decoration: underline;',
        );
    });

    it('renders a passed font style', () => {
        mount(
            <RichTextEditor
                designTokens={{
                    custom1: {
                        fontSize: '42px',
                    },
                }}
            />,
        );

        insertTextAndOpenToolbar();
        cy.get(TOOLBAR).should('be.visible');
        cy.get(TEXTSTYLE_DROPDOWN_TRIGGER).click({ force: true });
        cy.get(TEXTSTYLE_OPTION).eq(4).click();
        cy.get('[contenteditable=true] > p').should('have.attr', 'style', 'font-size: 42px;');
    });

    it('change a passed font style', () => {
        mount(<RichTextWithChangeDesignTokensButton />);

        insertTextAndOpenToolbar();
        cy.get(TOOLBAR).should('be.visible');
        cy.get(TEXTSTYLE_DROPDOWN_TRIGGER).click({ force: true });
        cy.get(TEXTSTYLE_OPTION).eq(4).click();
        cy.get('[contenteditable=true] > p').should('have.attr', 'style', 'font-size: 42px;');

        cy.get(CHANGE_DESIGN_TOKENS_TRIGGER).click();

        cy.get('[contenteditable=true] > p').should('have.attr', 'style', 'font-size: 11px;');
    });

    it('renders multiple editors', () => {
        const text1 = 'editor one content';
        const text2 = 'editor two content';
        mount(
            <>
                <RichTextEditor id="one" value={text1} />
                <RichTextEditor id="two" value={text2} />
            </>,
        );

        cy.get('[contenteditable=true]').first().should('contain.text', text1);
        cy.get('[contenteditable=true]').last().should('contain.text', text2);
    });

    it('renders a checkbox and checks it', () => {
        mount(<RichTextEditor />);

        insertTextAndOpenToolbar();
        cy.get(TOOLBAR).should('be.visible');
        cy.get(TOOLBAR_GROUP_2).children().eq(5).click();
        cy.get(CHECKBOX_INPUT).check().should('be.checked');
    });

    it('switches between checkbox and lists', () => {
        mount(<RichTextEditor />);

        insertTextAndOpenToolbar();
        cy.get(TOOLBAR_GROUP_2).children().eq(5).click();

        cy.get(CHECKBOX_INPUT).should('exist');
        cy.get('ul li').should('not.exist');
        cy.get('ol li').should('not.exist');

        cy.get('[contenteditable=true]').click().type('{selectall}');
        cy.get(TOOLBAR_GROUP_2).children().eq(4).click();

        cy.get(CHECKBOX_INPUT).should('not.exist');
        cy.get('ul li').should('exist');
        cy.get('ol li').should('not.exist');

        cy.get('[contenteditable=true]').click().type('{selectall}');
        cy.get(TOOLBAR_GROUP_2).children().eq(6).click();

        cy.get(CHECKBOX_INPUT).should('not.exist');
        cy.get('ul li').should('not.exist');
        cy.get('ol li').should('exist');

        cy.get(TOOLBAR_GROUP_2).children().eq(5).click();

        cy.get(CHECKBOX_INPUT).should('exist');
        cy.get('ul li').should('not.exist');
        cy.get('ol li').should('not.exist');
    });

    it('emits onTextChange when choosing an inline style', () => {
        const onTextChange = cy.stub();
        mount(<RichTextEditor onTextChange={onTextChange} />);

        insertTextAndOpenToolbar();
        cy.get(TOOLBAR).should('be.visible');
        cy.get(TOOLBAR_GROUP_2)
            .children()
            .eq(0)
            .click()
            .wait(ON_SAVE_DELAY_IN_MS)
            .then(() => {
                expect(onTextChange).to.be.called; // succeeds
            });
    });

    it('emits onTextChange when choosing a block style', () => {
        const onTextChange = cy.stub();
        mount(<RichTextEditor onTextChange={onTextChange} />);

        insertTextAndOpenToolbar();
        cy.get(TOOLBAR).should('be.visible');
        cy.get(TOOLBAR_GROUP_1)
            .children()
            .eq(1)
            .click()
            .wait(ON_SAVE_DELAY_IN_MS)
            .then(() => {
                expect(onTextChange).to.be.called; // succeeds
            });
    });

    it('emits onBlur with the correct value', () => {
        const onBlur = cy.spy();
        const content = 'hello world';
        mount(<RichTextEditor onBlur={onBlur} />);

        cy.get('[contenteditable=true]')
            .click()
            .type(content)
            .blur()
            .then(() => {
                expect(onBlur).to.be.calledWith(
                    JSON.stringify([{ type: ELEMENT_PARAGRAPH, children: [{ text: content }] }]),
                );
            });
    });

    it('should clear editor content', () => {
        const text = 'This is some text';
        mount(<RichTextWithClearButton value={JSON.stringify([{ type: ELEMENT_PARAGRAPH, children: [{ text }] }])} />);

        cy.get(RICH_TEXT_EDITOR).should('contain.text', text);
        cy.get('[data-test-id=clear-button]').click();
        cy.get(RICH_TEXT_EDITOR).should('not.contain.text', text);
    });

    it('should render with link', () => {
        const link = 'https://smartive.ch';
        const text = 'This is a link';
        mount(<RichTextWithLink link={link} text={text} />);

        cy.get('[contenteditable=true] a').should('contain.text', text);
        cy.get('[contenteditable=true] a').should('have.attr', 'href', link);
        cy.get('[contenteditable=true] a').should('have.attr', 'target', '_blank');
    });

    it('should open link chooser flyout and link', () => {
        const link = 'https://smartive.ch';
        mount(<RichTextEditor />);
        insertTextAndOpenToolbar();
        cy.get(TOOLBAR).should('be.visible');
        cy.get(TOOLBAR_GROUP_1).children().eq(4).click();
        cy.get(LINK_CHOOSER_FLYOUT).should('exist');
        cy.get(BUTTON).eq(1).should('be.disabled');
        cy.get('[type=text]').eq(0).should('have.attr', 'value', 'hello');
        cy.get('[type=text]').eq(1).click().type(link);
        cy.get(BUTTON).eq(1).should('not.be.disabled');
        cy.get(LINK_CHOOSER_CHECKBOX).click();
        cy.get(BUTTON).eq(1).click();
        cy.get('[contenteditable=true] a').should('have.attr', 'href', link);
        cy.get('[contenteditable=true] a').should('have.attr', 'target', '_blank');
    });

    it('should open preview link and link chooser flyout', () => {
        const link = 'https://smartive.ch';
        const text = 'This is a link';
        mount(<RichTextWithLink link={link} text={text} />);
        cy.get(PREVIEW_LINK_FLYOUT).should('not.exist');
        cy.get(LINK_CHOOSER_FLYOUT).should('not.exist');
        cy.get(EDIT_LINK_BUTTON).should('not.exist');
        cy.get(REMOVE_LINK_BUTTON).should('not.exist');

        cy.get('[contenteditable=true] a').click();
        cy.get(PREVIEW_LINK_FLYOUT).should('contain', link);
        cy.get(EDIT_LINK_BUTTON).should('exist');
        cy.get(REMOVE_LINK_BUTTON).should('exist');
        cy.get(EDIT_LINK_BUTTON).click();
        cy.get(LINK_CHOOSER_FLYOUT).should('exist');

        cy.get('[type=text]').eq(0).should('have.attr', 'value', text);
        cy.get('[type=text]').eq(1).should('have.attr', 'value', link);
        cy.get('[type=checkbox]').should('be.checked');
    });

    it('should edit link', () => {
        const link = 'https://smartive.ch';
        const text = 'This is a link';
        const additionalText = ' to the team of smartive';
        const additionalLink = '/team';
        mount(<RichTextWithLink link={link} text={text} />);
        cy.get('[contenteditable=true] a').click();
        cy.get(EDIT_LINK_BUTTON).click();

        cy.get('[type=text]').eq(0).click().type(additionalText);
        cy.get('[type=text]').eq(1).click().type(additionalLink);
        cy.get(LINK_CHOOSER_CHECKBOX).click();

        cy.get(BUTTON).eq(1).click();
        cy.get('[contenteditable=true] a').should('contain', text + additionalText);
        cy.get('[contenteditable=true] a').should('have.attr', 'href', link + additionalLink);
        cy.get('[contenteditable=true] a').should('have.attr', 'target', '_self');
    });

    it('should remove link', () => {
        const link = 'https://smartive.ch';
        const text = 'This is a link';
        mount(<RichTextWithLink link={link} text={text} />);
        cy.get('[contenteditable=true] a').click();
        cy.get(REMOVE_LINK_BUTTON).click();

        cy.get('[contenteditable=true]').should('contain.text', text);
        cy.get('[contenteditable=true] a').should('not.exist');
    });

    it('should render with legacy link', () => {
        const url = 'https://frontify.ch';
        const text = 'This is a link';
        mount(<RichTextWithLegacyLink url={url} text={text} />);

        cy.get('[contenteditable=true] a').should('contain.text', text);
        cy.get('[contenteditable=true] a').should('have.attr', 'href', url);
    });

    it('should remove legacy link', () => {
        const url = 'https://frontify.ch';
        const text = 'This is a link';
        mount(<RichTextWithLegacyLink url={url} text={text} />);

        cy.get('[contenteditable=true] a').click();
        cy.get(REMOVE_LINK_BUTTON).click();

        cy.get('[contenteditable=true]').should('contain.text', text);
        cy.get('[contenteditable=true] a').should('not.exist');
    });

    it('renders toolbar responsively', () => {
        mount(<RichTextEditor />);
        insertTextAndOpenToolbar();

        cy.viewport(1200, 1200);
        cy.get(TOOLBAR).children().should('have.length', 1);
        cy.viewport(550, 750);
        cy.get(TOOLBAR).children().should('have.length', 2);
        cy.viewport(320, 480);
        cy.get(TOOLBAR).children().should('have.length', 3);
    });

    it('should convert rich text editor format to plaintext', () => {
        expect(toPlaintext(value)).to.be.eq(
            'This text is bold.\nThis text is italic.\nThis text has an underline.\nThis text has a strikethrough.\nThis text is a code line.\nLorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.\nThis is list item number one.\nThis is list item number two.\nThis is list item number three.\nThis is child item number one.\nThis is child item number two, with more children.\nThis is child of child item number one.\nThis is child of child item number two.\nThis comes first.\nThis comes second.\nAnd last but not least, this comes third.\nThis is a Link.\nThis is also a Link.\nThis is a checked checklist item.\nThis is an unchecked checklist item.\nThis is checked again.\nHeading 1\nHeading 2\nHeading 3\nHeading 4\nCustom 1\nCustom 2',
        );
    });
});
