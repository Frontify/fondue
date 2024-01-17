/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Position } from '../EditorPositioningWrapper';
import { RichTextEditor } from '../RichTextEditor';
import {
    RichTextEditorWithOrderedListStyles,
    RichTextWithCustomTextStylesDefaultValues,
    insertTextAndOpenToolbar,
} from './fixtures/RichTextEditor';
import {
    CHECKBOX_INPUT,
    TEXTSTYLE_DROPDOWN_TRIGGER,
    TEXTSTYLE_OPTION,
    TOOLBAR_FLOATING,
    TOOLBAR_GROUP_1,
    TOOLBAR_GROUP_2,
} from './fixtures/selectors';

describe('TextStylePlugin', () => {
    it('renders a bold text', () => {
        cy.mount(<RichTextEditor />);

        insertTextAndOpenToolbar();
        cy.get(TOOLBAR_FLOATING).should('be.visible');
        cy.get(TOOLBAR_GROUP_1).children().eq(0).click();
        cy.get('[contenteditable=true]').should('include.html', 'tw-font-bold');
    });

    it('renders italic', () => {
        cy.mount(<RichTextEditor />);

        insertTextAndOpenToolbar();
        cy.get(TOOLBAR_FLOATING).should('be.visible');
        cy.get(TOOLBAR_GROUP_1).children().eq(1).click();
        cy.get('[contenteditable=true]').should('include.html', 'tw-italic');
    });

    it('renders underline', () => {
        cy.mount(<RichTextEditor />);

        insertTextAndOpenToolbar();
        cy.get(TOOLBAR_FLOATING).should('be.visible');
        cy.get(TOOLBAR_GROUP_1).children().eq(2).click();
        cy.get('[contenteditable=true]').should('include.html', 'tw-underline');
    });

    it('renders strikethrough', () => {
        cy.mount(<RichTextEditor />);

        insertTextAndOpenToolbar();
        cy.get(TOOLBAR_FLOATING).should('be.visible');
        cy.get(TOOLBAR_GROUP_1).children().eq(3).click();
        cy.get('[contenteditable=true]').should('include.html', 'tw-line-through');
    });

    it('renders code', () => {
        cy.mount(<RichTextEditor />);

        insertTextAndOpenToolbar();
        cy.get(TOOLBAR_FLOATING).should('be.visible');
        cy.get(TOOLBAR_GROUP_1).children().eq(5).click();
        cy.get('[contenteditable=true]').should(
            'include.html',
            'tw-rounded tw-bg-box-neutral tw-text-violet-90 tw-m-0 tw-px-[0.2em] tw-font-mono tw-text-[85%]',
        );
    });

    it('renders an unordered list', () => {
        cy.mount(<RichTextEditor />);

        insertTextAndOpenToolbar();
        cy.get(TOOLBAR_FLOATING).should('be.visible');
        cy.get(TOOLBAR_GROUP_2).children().eq(4).click();
        cy.get('[contenteditable=true]').should('include.html', '<ul');
    });

    it('renders ordered list with correct list style types', () => {
        cy.mount(<RichTextEditorWithOrderedListStyles />);

        cy.get('[contenteditable=true] ol').should(
            'have.class',
            "[&>li>p]:before:tw-content-[counter(count,decimal)_'._']",
        );
        cy.get('[contenteditable=true] ol ol').should(
            'have.class',
            "[&>li>p]:before:tw-content-[counter(count,_lower-alpha)_'._']",
        );
        cy.get('[contenteditable=true] ol ol ol').should(
            'have.class',
            "[&>li>p]:before:tw-content-[counter(count,lower-roman)_'._']",
        );
        cy.get('[contenteditable=true] ol ol ol ol').should(
            'have.class',
            "[&>li>p]:before:tw-content-[counter(count,decimal)_'._']",
        );
    });

    it('renders an ordered list', () => {
        cy.mount(<RichTextEditor />);

        insertTextAndOpenToolbar();
        cy.get(TOOLBAR_FLOATING).should('be.visible');
        cy.get(TOOLBAR_GROUP_2).children().eq(6).click();
        cy.get('[contenteditable=true]').should('include.html', '<ol');
    });

    it('renders a right aligned text', () => {
        cy.mount(<RichTextEditor />);

        insertTextAndOpenToolbar();
        cy.get(TOOLBAR_FLOATING).should('be.visible');
        cy.get(TOOLBAR_GROUP_2).children().eq(2).click();
        cy.get('[contenteditable=true]').should('include.html', 'tw-text-right');
    });

    it('renders a heading', () => {
        cy.mount(<RichTextWithCustomTextStylesDefaultValues />);

        insertTextAndOpenToolbar();
        cy.get(TOOLBAR_FLOATING).should('be.visible');
        cy.get(TEXTSTYLE_DROPDOWN_TRIGGER).click({ force: true });
        cy.get(TEXTSTYLE_OPTION).first().click();
        cy.get('[contenteditable=true]').should('include.html', '<h1');
    });

    it('renders a custom text style', () => {
        cy.mount(<RichTextWithCustomTextStylesDefaultValues />);

        insertTextAndOpenToolbar();
        cy.get(TOOLBAR_FLOATING).should('be.visible');
        cy.get(TEXTSTYLE_DROPDOWN_TRIGGER).click({ force: true });
        cy.get(TEXTSTYLE_OPTION).eq(6).click();
        cy.get('[contenteditable=true] > p').should(
            'have.attr',
            'style',
            'font-size: 14px; font-weight: 600; font-style: normal;',
        );
    });

    it('renders multiple editors', () => {
        const text1 = 'editor one content';
        const text2 = 'editor two content';
        cy.mount(
            <>
                <RichTextEditor id="one" value={text1} />
                <RichTextEditor id="two" value={text2} />
            </>,
        );

        cy.get('[contenteditable=true]').first().should('contain.text', text1);
        cy.get('[contenteditable=true]').last().should('contain.text', text2);
    });

    it('renders a checkbox and checks it', () => {
        cy.mount(<RichTextEditor />);

        insertTextAndOpenToolbar();
        cy.get(TOOLBAR_FLOATING).should('be.visible');
        cy.get(TOOLBAR_GROUP_2).children().eq(5).click();
        cy.get(CHECKBOX_INPUT).check().should('be.checked');
    });

    it('switches between checkbox and lists', () => {
        cy.mount(<RichTextEditor />);

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

    it('renders a checkbox with custom textStyle', () => {
        cy.mount(<RichTextWithCustomTextStylesDefaultValues />);
        const heading2Styles = 'font-size: 32px; font-weight: 700; font-style: normal;';

        insertTextAndOpenToolbar();
        cy.get(TOOLBAR_GROUP_2).children().eq(5).click();
        cy.get(TEXTSTYLE_DROPDOWN_TRIGGER).click({ force: true });
        cy.get(TEXTSTYLE_OPTION).eq(1).click();
        cy.get('[contenteditable=true] > div > span').should('have.attr', 'style', heading2Styles);

        // remove checklist again and textStyle stays
        cy.get('[contenteditable=true]').click({ force: true }).type('{selectall}');
        cy.get(TOOLBAR_GROUP_2).children().eq(5).click();
        cy.get('[contenteditable=true] > h2').should('have.attr', 'style', heading2Styles);
    });

    it('switches a custom checkbox to list and keeps textStyle', () => {
        cy.mount(<RichTextWithCustomTextStylesDefaultValues />);
        const heading1Styles = 'font-size: 48px; font-weight: 700; font-style: normal;';

        insertTextAndOpenToolbar();
        cy.get(TOOLBAR_GROUP_2).children().eq(5).click();
        cy.get(TEXTSTYLE_DROPDOWN_TRIGGER).click({ force: true });
        cy.get(TEXTSTYLE_OPTION).first().click();
        cy.get('[contenteditable=true] > div ').should('include.html', heading1Styles);

        // remove checklist again and textStyle stays
        cy.get('[contenteditable=true]').click({ force: true }).type('{selectall}');
        cy.get(TOOLBAR_GROUP_2).children().eq(4).click();
        cy.get('[contenteditable=true] > ul ').should('include.html', heading1Styles);
    });
});
