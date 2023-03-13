/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ELEMENT_LINK, ELEMENT_PARAGRAPH } from '@udecode/plate';
import React, { CSSProperties, FC, useState } from 'react';
import { orderedListValue } from '../helpers/exampleValues';
import {
    AlignRightPlugin,
    BoldPlugin,
    BreakAfterPlugin,
    ELEMENT_BUTTON,
    OrderedListPlugin,
    ParagraphPlugin,
    PluginComposer,
    RichTextButtonStyle,
    SoftBreakPlugin,
    TextStylePlugin,
    UnorderedListPlugin,
} from '../Plugins';
import { ACTIVE_COLUMN_BREAK_CLASS_NAMES } from '../Plugins/ColumnBreakPlugin/utils/getColumnBreakClasses';
import { ButtonStyles } from '../Plugins/TextStylePlugin/TextStyles';
import { RichTextEditor } from '../RichTextEditor';
import { DesignTokens } from '../types';
import { ON_SAVE_DELAY_IN_MS } from '../utils';
import { defaultDesignTokens } from '../utils/defaultDesignTokens';
import { insertTextAndOpenToolbar } from './fixtures/RichTextEditor';
import {
    BUTTON,
    CHANGE_DESIGN_TOKENS_TRIGGER,
    CHECKBOX_INPUT,
    CHECKBOX_INPUT_ID,
    EDIT_BUTTON_BUTTON,
    EDIT_LINK_BUTTON,
    FLOATING_BUTTON_EDIT,
    FLOATING_BUTTON_INSERT,
    FLOATING_BUTTON_SECONDARY,
    FLOATING_LINK_EDIT,
    FLOATING_LINK_INSERT,
    REMOVE_BUTTON_BUTTON,
    REMOVE_LINK_BUTTON,
    RICH_TEXT_EDITOR,
    TEXTSTYLE_DROPDOWN_TRIGGER,
    TEXTSTYLE_OPTION,
    TOOLBAR_FLOATING,
    TOOLBAR_GROUP_1,
    TOOLBAR_GROUP_2,
} from './fixtures/selectors';

const checkPosition = (chainers: string, value: number, text: string) => {
    cy.window().then(() => {
        cy.get('[contenteditable=true]')
            .contains(text)
            .then((el) => {
                const position = { left: el.position().left };
                cy.wrap(position).its('left').should(chainers, value);
            });
    });
};

const selectTextValue = (value: string) => {
    cy.window().then((win) => {
        cy.get('[contenteditable=true]')
            .focus()
            .contains(value)
            .then((el) => {
                win.getSelection()?.selectAllChildren(el[0]);
            });
    });
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
                            url: link,
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

const RichTextWithButton: FC<{ text: string; link: string; buttonStyle: RichTextButtonStyle }> = ({
    text,
    link,
    buttonStyle,
}) => {
    return (
        <RichTextEditor
            value={JSON.stringify([
                {
                    type: ELEMENT_PARAGRAPH,
                    children: [
                        {
                            type: ELEMENT_BUTTON,
                            url: link,
                            buttonStyle,
                            children: [{ text }],
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

const RichTextEditorWithValueSetOutside = ({ value }: { value: string }) => {
    const [initialValue, setInitialValue] = useState(value);

    return <RichTextEditor onTextChange={(value) => setInitialValue(value)} value={initialValue} />;
};

const RichTextEditorWithOrderedListStyles = () => <RichTextEditor value={JSON.stringify([orderedListValue])} />;

describe('RichTextEditor Component', () => {
    describe('Rendering', () => {
        it('should render an empty rich text editor', () => {
            cy.mount(<RichTextEditor />);

            cy.get(RICH_TEXT_EDITOR).should('be.visible');
        });

        it('should render a raw content state', () => {
            const text = 'This is some text that you can not edit';
            cy.mount(<RichTextEditor value={JSON.stringify([{ type: ELEMENT_PARAGRAPH, children: [{ text }] }])} />);

            cy.get(RICH_TEXT_EDITOR).should('contain.text', text);
        });

        it('should render a raw html content state', () => {
            cy.mount(<RichTextEditor value={'<p><b>this is bold</b> and <i>this italic</i></p>'} />);

            cy.get(RICH_TEXT_EDITOR).should('contain.text', 'this is bold and this italic');
            cy.get('[contenteditable=true]').should('include.html', 'tw-font-bold');
            cy.get('[contenteditable=true]').should('include.html', 'tw-italic');
        });

        it('should render a plain text string content state', () => {
            const TEXT = 'This is text';
            cy.mount(<RichTextEditor value={TEXT} />);

            cy.get(RICH_TEXT_EDITOR).should('contain.text', TEXT);
        });

        it('wraps the Editor in the component ', () => {
            const TEXT = 'This is new text';

            cy.mount(<RichTextEditorWithValueSetOutside value={TEXT} />);
            cy.get(RICH_TEXT_EDITOR).should('contain.text', TEXT);
        });

        it('should render the updated value when updateValueOnChange enabled', () => {
            const INITIAL_TEXT = 'This is the initial text';

            cy.mount(
                <RichTextEditor
                    updateValueOnChange
                    value={JSON.stringify([{ type: ELEMENT_PARAGRAPH, children: [{ text: INITIAL_TEXT }] }])}
                />,
            ).then(({ rerender }) => {
                const UPDATED_TEXT = 'This is the updated text';
                rerender(
                    <RichTextEditor
                        updateValueOnChange
                        value={JSON.stringify([{ type: ELEMENT_PARAGRAPH, children: [{ text: UPDATED_TEXT }] }])}
                    />,
                );
                cy.get(RICH_TEXT_EDITOR).should('contain.text', UPDATED_TEXT);
            });
        });

        it('should render the same value when updateValueOnChange disabled', () => {
            const INITIAL_TEXT = 'This is the initial text';

            cy.mount(
                <RichTextEditor
                    value={JSON.stringify([{ type: ELEMENT_PARAGRAPH, children: [{ text: INITIAL_TEXT }] }])}
                />,
            ).then(({ rerender }) => {
                rerender(
                    <RichTextEditor
                        value={JSON.stringify([
                            { type: ELEMENT_PARAGRAPH, children: [{ text: 'This is the updated text' }] },
                        ])}
                    />,
                );
                cy.get(RICH_TEXT_EDITOR).should('contain.text', INITIAL_TEXT);
            });
        });
    });

    describe('Editable', () => {
        it('should be editable by default ', () => {
            cy.mount(<RichTextEditor />);

            cy.get('[contenteditable=true]').should('exist');
        });

        it('should not the able to edit when readonly ', () => {
            cy.mount(<RichTextEditor readonly />);

            cy.get('[contenteditable=false]').should('exist');
        });

        it('should type and insert text', () => {
            cy.mount(<RichTextEditor />);

            cy.get('[contenteditable=true]').click().type('hello');
        });
    });

    describe('Design of text', () => {
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
            cy.get(TOOLBAR_GROUP_1).children().eq(6).click();
            cy.get('[contenteditable=true]').should(
                'include.html',
                'tw-rounded tw-bg-box-neutral tw-text-box-neutral-inverse tw-m-0 tw-px-[0.2em] tw-font-mono tw-text-[85%]',
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

            cy.get('[contenteditable=true] ol').should('have.class', 'decimal');
            cy.get('[contenteditable=true] ol ol').should('have.class', 'alpha');
            cy.get('[contenteditable=true] ol ol ol').should('have.class', 'roman');
            cy.get('[contenteditable=true] ol ol ol ol').should('have.class', 'decimal');
        });

        it('renders ordered list right aligned', () => {
            cy.mount(<RichTextEditorWithOrderedListStyles />);

            insertTextAndOpenToolbar();
            cy.get(TOOLBAR_FLOATING).should('be.visible');
            cy.get(TOOLBAR_GROUP_2).children().eq(2).click();
            cy.get('[contenteditable=true]').should('include.html', 'tw-justify-end tw-text-right');
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
            cy.mount(<RichTextEditor />);

            insertTextAndOpenToolbar();
            cy.get(TOOLBAR_FLOATING).should('be.visible');
            cy.get(TEXTSTYLE_DROPDOWN_TRIGGER).click({ force: true });
            cy.get(TEXTSTYLE_OPTION).first().click();
            cy.get('[contenteditable=true]').should('include.html', '<h1');
        });

        it('renders a custom font', () => {
            cy.mount(<RichTextEditor />);

            insertTextAndOpenToolbar();
            cy.get(TOOLBAR_FLOATING).should('be.visible');
            cy.get(TEXTSTYLE_DROPDOWN_TRIGGER).click({ force: true });
            cy.get(TEXTSTYLE_OPTION).eq(6).click();
            cy.get('[contenteditable=true] > p').should(
                'have.attr',
                'style',
                'font-size: 14px; font-weight: normal; font-style: normal; text-decoration: underline;',
            );
        });

        it('renders a passed font style', () => {
            cy.mount(
                <RichTextEditor
                    designTokens={{
                        custom1: {
                            fontSize: '42px',
                        },
                    }}
                />,
            );

            insertTextAndOpenToolbar();
            cy.get(TOOLBAR_FLOATING).should('be.visible');
            cy.get(TEXTSTYLE_DROPDOWN_TRIGGER).click({ force: true });
            cy.get(TEXTSTYLE_OPTION).eq(4).click();
            cy.get('[contenteditable=true] > p').should('have.attr', 'style', 'font-size: 42px;');
        });

        it('change a passed font style', () => {
            cy.mount(<RichTextWithChangeDesignTokensButton />);

            insertTextAndOpenToolbar();
            cy.get(TOOLBAR_FLOATING).should('be.visible');
            cy.get(TEXTSTYLE_DROPDOWN_TRIGGER).click({ force: true });
            cy.get(TEXTSTYLE_OPTION).eq(4).click();
            cy.get('[contenteditable=true] > p').should('have.attr', 'style', 'font-size: 42px;');

            cy.get(CHANGE_DESIGN_TOKENS_TRIGGER).click();

            cy.get('[contenteditable=true] > p').should('have.attr', 'style', 'font-size: 11px;');
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
            cy.mount(
                <RichTextEditor
                    designTokens={{
                        heading2: {
                            fontSize: '12px',
                            fontWeight: 200,
                        },
                    }}
                />,
            );
            const heading2Styles = 'font-size: 12px; font-weight: 200;';

            insertTextAndOpenToolbar();
            cy.get(TOOLBAR_GROUP_2).children().eq(5).click();
            cy.get(TEXTSTYLE_DROPDOWN_TRIGGER).click({ force: true });
            cy.get(TEXTSTYLE_OPTION).eq(1).click();
            cy.get('[contenteditable=true] > div > span').should('have.attr', 'style', heading2Styles);
            //remove checklist again and textStyle stays
            cy.get('[contenteditable=true]').click().type('{selectall}');
            cy.get(TOOLBAR_GROUP_2).children().eq(5).click();
            cy.get('[contenteditable=true]').should('have.attr', 'style', heading2Styles);
        });

        it('renders switches a custom checkbox to list and keeps textStyle', () => {
            cy.mount(
                <RichTextEditor
                    designTokens={{
                        heading1: {
                            fontSize: '48px',
                            fontWeight: 700,
                            fontStyle: 'normal',
                        },
                    }}
                />,
            );
            const heading1Styles = 'font-size: 48px; font-weight: 700; font-style: normal;';

            insertTextAndOpenToolbar();
            cy.get(TOOLBAR_GROUP_2).children().eq(5).click();
            cy.get(TEXTSTYLE_DROPDOWN_TRIGGER).click({ force: true });
            cy.get(TEXTSTYLE_OPTION).first().click();
            cy.get('[contenteditable=true] > div > span').should('have.attr', 'style', heading1Styles);
            //remove checklist again and textStyle stays
            cy.get('[contenteditable=true]').click().type('{selectall}');
            cy.get(TOOLBAR_GROUP_2).children().eq(4).click();
            cy.get('[contenteditable=true] > ul > li').should('have.attr', 'style', heading1Styles);
        });
    });

    describe('Emits event', () => {
        it('emits onTextChange when choosing an inline style', () => {
            const onTextChange = cy.stub();
            cy.mount(<RichTextEditor onTextChange={onTextChange} />);

            insertTextAndOpenToolbar();
            cy.get(TOOLBAR_FLOATING).should('be.visible');
            cy.get(TOOLBAR_GROUP_2)
                .children()
                .eq(0)
                .click()
                .wait(ON_SAVE_DELAY_IN_MS)
                .then(() => {
                    expect(onTextChange).to.be.called;
                });
        });

        it('emits onTextChange when choosing a block style', () => {
            const onTextChange = cy.stub();
            cy.mount(<RichTextEditor onTextChange={onTextChange} />);

            insertTextAndOpenToolbar();
            cy.get(TOOLBAR_FLOATING).should('be.visible');
            cy.get(TOOLBAR_GROUP_1)
                .children()
                .eq(1)
                .click()
                .wait(ON_SAVE_DELAY_IN_MS)
                .then(() => {
                    expect(onTextChange).to.be.called;
                });
        });

        it('emits onBlur with the correct value', () => {
            const onBlur = cy.spy();
            const content = 'hello world';
            cy.mount(<RichTextEditor onBlur={onBlur} />);

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
    });

    describe('link plugin', () => {
        it('should render with link', () => {
            const link = 'https://smartive.ch';
            const text = 'This is a link';
            cy.mount(<RichTextWithLink link={link} text={text} />);

            cy.get('[contenteditable=true] a').should('contain.text', text);
            cy.get('[contenteditable=true] a').should('have.attr', 'href', link);
            cy.get('[contenteditable=true] a').should('have.attr', 'target', '_blank');
        });

        it('should open floating link insert', () => {
            const link = 'https://smartive.ch';
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
            const link = 'https://smartive.ch';
            const text = 'This is a link';
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
            const link = 'https://smartive.ch';
            const text = 'This is a link';
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
            const link = 'https://smartive.ch';
            const text = 'This is a link';
            cy.mount(<RichTextWithLink link={link} text={text} />);
            cy.get('[contenteditable=true] a').realClick();
            cy.get(REMOVE_LINK_BUTTON).click();

            cy.get('[contenteditable=true]').should('contain.text', text);
            cy.get('[contenteditable=true] a').should('not.exist');
        });

        it('should render with legacy link', () => {
            const url = 'https://frontify.ch';
            const text = 'This is a link';
            cy.mount(<RichTextWithLegacyLink url={url} text={text} />);

            cy.get('[contenteditable=true] a').should('contain.text', text);
            cy.get('[contenteditable=true] a').should('have.attr', 'href', url);
        });

        it('should remove legacy link', () => {
            const url = 'https://frontify.ch';
            const text = 'This is a link';
            cy.mount(<RichTextWithLegacyLink url={url} text={text} />);

            cy.get('[contenteditable=true] a').realClick();
            cy.get(REMOVE_LINK_BUTTON).click();

            cy.get('[contenteditable=true]').should('contain.text', text);
            cy.get('[contenteditable=true] a').should('not.exist');
        });

        it('should edit legacy link', () => {
            const link = 'https://smartive.ch';
            const text = 'This is a link';
            const additionalLink = '/team';
            cy.mount(<RichTextWithLegacyLink url={link} text={text} />);
            cy.get('[contenteditable=true] a').realClick();
            cy.get(EDIT_LINK_BUTTON).click();

            cy.get('[type=text]').eq(1).click().type(additionalLink);
            cy.get(CHECKBOX_INPUT_ID).click({ force: true });

            cy.get(BUTTON).eq(1).click();
            cy.get('[contenteditable=true] a').should('have.attr', 'href', link + additionalLink);
            cy.get('[contenteditable=true] a').should('have.attr', 'target', '_self');
        });
    });

    describe('button plugin', () => {
        it('should render with button', () => {
            const link = 'https://smartive.ch';
            const text = 'This is a link';
            cy.mount(<RichTextWithButton link={link} text={text} buttonStyle="primary" />);

            cy.get('[contenteditable=true] a').should('contain.text', text);
            cy.get('[contenteditable=true] a').should('have.attr', 'href', link);
            cy.get('[contenteditable=true] a').should('have.attr', 'target', '_blank');
        });

        it('should open floating button insert', () => {
            const link = 'https://smartive.ch';
            cy.mount(<RichTextEditor />);
            insertTextAndOpenToolbar();
            cy.get(TOOLBAR_FLOATING).should('be.visible');
            cy.get(TOOLBAR_GROUP_1).children().eq(5).click();
            cy.get(FLOATING_BUTTON_INSERT).should('exist');
            cy.get(BUTTON).eq(1).should('be.disabled');
            cy.get('[type=text]').eq(0).should('have.attr', 'value', 'hello');
            cy.get('[type=text]').eq(1).click().type(link);
            cy.get(BUTTON).eq(1).should('not.be.disabled');
            cy.get(CHECKBOX_INPUT_ID).click({ force: true });
            cy.get(BUTTON).eq(1).click();
            cy.get('[contenteditable=true] a').should('have.attr', 'href', link);
            cy.get('[contenteditable=true] a').should('have.attr', 'target', '_blank');
        });

        it('should open floating button insert and edit', () => {
            const link = 'https://smartive.ch';
            const text = 'This is a link';
            cy.mount(<RichTextWithButton link={link} text={text} buttonStyle="primary" />);
            cy.get(FLOATING_BUTTON_EDIT).should('not.exist');
            cy.get(FLOATING_BUTTON_INSERT).should('not.exist');
            cy.get(EDIT_BUTTON_BUTTON).should('not.exist');
            cy.get(REMOVE_BUTTON_BUTTON).should('not.exist');

            cy.get('[contenteditable=true] a').realClick();
            cy.get(FLOATING_BUTTON_EDIT).should('contain', link);
            cy.get(EDIT_BUTTON_BUTTON).should('exist');
            cy.get(REMOVE_BUTTON_BUTTON).should('exist');
            cy.get(EDIT_BUTTON_BUTTON).click();
            cy.get(FLOATING_BUTTON_INSERT).should('exist');

            cy.get('[type=text]').eq(0).should('have.attr', 'value', text);
            cy.get('[type=text]').eq(1).should('have.attr', 'value', link);
            cy.get('[type=checkbox]').should('be.checked');
        });

        it('should edit button link', () => {
            const link = 'https://smartive.ch';
            const text = 'This is a link';
            const additionalLink = '/team';
            cy.mount(<RichTextWithButton link={link} text={text} buttonStyle="primary" />);
            cy.get('[contenteditable=true] a').realClick();
            cy.get(EDIT_BUTTON_BUTTON).click();

            cy.get('[type=text]').eq(1).click().type(additionalLink);
            cy.get(CHECKBOX_INPUT_ID).click({ force: true });

            cy.get(BUTTON).eq(1).click();
            cy.get('[contenteditable=true] a').should('have.attr', 'href', link + additionalLink);
            cy.get('[contenteditable=true] a').should('have.attr', 'target', '_self');
        });

        it('should edit button style', () => {
            const link = 'https://smartive.ch';
            const text = 'This is a link';
            const designTokens = defaultDesignTokens as Partial<
                Record<ButtonStyles, CSSProperties & { hover: CSSProperties }>
            >;

            cy.mount(<RichTextWithButton link={link} text={text} buttonStyle="primary" />);
            cy.get('[contenteditable=true] a')
                .invoke('attr', 'style')
                .should('contain', `color: ${designTokens.buttonPrimary?.color}`);

            cy.get('[contenteditable=true] a').realClick();
            cy.get(EDIT_BUTTON_BUTTON).click();

            cy.get(FLOATING_BUTTON_SECONDARY).realClick();
            cy.get(BUTTON).eq(1).click();

            cy.get('[contenteditable=true] a')
                .invoke('attr', 'style')
                .should('contain', `color: ${designTokens.buttonSecondary?.color}`);
        });

        it('should remove button', () => {
            const link = 'https://smartive.ch';
            const text = 'This is a link';
            cy.mount(<RichTextWithButton link={link} text={text} buttonStyle="primary" />);
            cy.get('[contenteditable=true] a').realClick();
            cy.get(REMOVE_BUTTON_BUTTON).click();

            cy.get('[contenteditable=true]').should('contain.text', text);
            cy.get('[contenteditable=true] a').should('not.exist');
        });
    });

    describe('reset formatting plugin', () => {
        it('should reset bold', () => {
            cy.mount(<RichTextEditor />);

            insertTextAndOpenToolbar();
            cy.get(TOOLBAR_FLOATING).should('be.visible');
            cy.get(TOOLBAR_GROUP_1).children().eq(0).click();
            cy.get('[contenteditable=true]').should('include.html', 'tw-font-bold');

            cy.get(TOOLBAR_GROUP_2).children().last().click();
            cy.get('[contenteditable=true]').should('not.include.html', 'tw-font-bold');
        });

        it('should reset italic', () => {
            cy.mount(<RichTextEditor />);

            insertTextAndOpenToolbar();
            cy.get(TOOLBAR_FLOATING).should('be.visible');
            cy.get(TOOLBAR_GROUP_1).children().eq(1).click();
            cy.get('[contenteditable=true]').should('include.html', 'tw-italic');

            cy.get(TOOLBAR_GROUP_2).children().last().click();
            cy.get('[contenteditable=true]').should('not.include.html', 'tw-italic');
        });

        it('should reset underline', () => {
            cy.mount(<RichTextEditor />);

            insertTextAndOpenToolbar();
            cy.get(TOOLBAR_FLOATING).should('be.visible');
            cy.get(TOOLBAR_GROUP_1).children().eq(2).click();
            cy.get('[contenteditable=true]').should('include.html', 'tw-underline');

            cy.get(TOOLBAR_GROUP_2).children().last().click();
            cy.get('[contenteditable=true]').should('not.include.html', 'tw-underline');
        });

        it('should reset strikethrough', () => {
            cy.mount(<RichTextEditor />);

            insertTextAndOpenToolbar();
            cy.get(TOOLBAR_FLOATING).should('be.visible');
            cy.get(TOOLBAR_GROUP_1).children().eq(3).click();
            cy.get('[contenteditable=true]').should('include.html', 'tw-line-through');

            cy.get(TOOLBAR_GROUP_2).children().last().click();
            cy.get('[contenteditable=true]').should('not.include.html', 'tw-line-through');
        });

        it('should reset code', () => {
            cy.mount(<RichTextEditor />);

            insertTextAndOpenToolbar();
            cy.get(TOOLBAR_FLOATING).should('be.visible');
            cy.get(TOOLBAR_GROUP_1).children().eq(6).click();
            cy.get('[contenteditable=true]').should(
                'include.html',
                'tw-rounded tw-bg-box-neutral tw-text-box-neutral-inverse tw-m-0 tw-px-[0.2em] tw-font-mono tw-text-[85%]',
            );

            cy.get(TOOLBAR_GROUP_2).children().last().click();
            cy.get('[contenteditable=true]').should(
                'not.include.html',
                'tw-rounded tw-bg-box-neutral tw-text-box-neutral-inverse tw-m-0 tw-px-[0.2em] tw-font-mono tw-text-[85%]',
            );
        });

        it('should reset all marks', () => {
            cy.mount(<RichTextEditor />);

            insertTextAndOpenToolbar();
            cy.get(TOOLBAR_FLOATING).should('be.visible');
            cy.get(TOOLBAR_GROUP_1).children().eq(0).click();
            cy.get(TOOLBAR_GROUP_1).children().eq(1).click();
            cy.get(TOOLBAR_GROUP_1).children().eq(2).click();
            cy.get(TOOLBAR_GROUP_1).children().eq(3).click();
            cy.get(TOOLBAR_GROUP_1).children().eq(6).click();
            cy.get('[contenteditable=true]').should(
                'include.html',
                'tw-rounded tw-bg-box-neutral tw-text-box-neutral-inverse tw-m-0 tw-px-[0.2em] tw-font-mono tw-text-[85%]',
            );
            cy.get('[contenteditable=true]').should('include.html', 'tw-font-bold');
            cy.get('[contenteditable=true]').should('include.html', 'tw-italic');
            cy.get('[contenteditable=true]').should('include.html', 'tw-underline');
            cy.get('[contenteditable=true]').should('include.html', 'tw-line-through');

            cy.get(TOOLBAR_GROUP_2).children().last().click();
            cy.get('[contenteditable=true]').should(
                'not.include.html',
                'tw-rounded tw-bg-box-neutral tw-text-box-neutral-inverse tw-m-0 tw-px-[0.2em] tw-font-mono tw-text-[85%]',
            );
            cy.get('[contenteditable=true]').should('not.include.html', 'tw-font-bold');
            cy.get('[contenteditable=true]').should('not.include.html', 'tw-italic');
            cy.get('[contenteditable=true]').should('not.include.html', 'tw-underline');
            cy.get('[contenteditable=true]').should('not.include.html', 'tw-line-through');
        });

        it('should resets a checkbox', () => {
            cy.mount(<RichTextEditor />);

            insertTextAndOpenToolbar();
            cy.get(TOOLBAR_FLOATING).should('be.visible');
            cy.get(TOOLBAR_GROUP_2).children().eq(5).click();
            cy.get(CHECKBOX_INPUT).should('exist');

            cy.get(TOOLBAR_GROUP_2).children().last().click();
            cy.get(CHECKBOX_INPUT).should('not.exist');
        });

        it('should unwrap an unordered list', () => {
            cy.mount(<RichTextEditor />);

            insertTextAndOpenToolbar();
            cy.get(TOOLBAR_FLOATING).should('be.visible');
            cy.get(TOOLBAR_GROUP_2).children().eq(4).click();
            cy.get('[contenteditable=true]').should('include.html', '<ul');

            cy.get(TOOLBAR_GROUP_2).children().last().click();
            cy.get('[contenteditable=true]').should('not.include.html', '<ul');
            cy.get('[contenteditable=true]').should('include.html', '<p');
        });

        it('should unwrap an ordered list', () => {
            cy.mount(<RichTextEditor />);

            insertTextAndOpenToolbar();
            cy.get(TOOLBAR_FLOATING).should('be.visible');
            cy.get(TOOLBAR_GROUP_2).children().eq(6).click();
            cy.get('[contenteditable=true]').should('include.html', '<ol');

            cy.get(TOOLBAR_GROUP_2).children().last().click();
            cy.get('[contenteditable=true]').should('not.include.html', '<ol');
        });

        it('should reset a right aligned text', () => {
            cy.mount(<RichTextEditor />);

            insertTextAndOpenToolbar();
            cy.get(TOOLBAR_FLOATING).should('be.visible');
            cy.get(TOOLBAR_GROUP_2).children().eq(2).click();
            cy.get('[contenteditable=true]').should('include.html', 'tw-text-right');

            cy.get(TOOLBAR_GROUP_2).children().last().click();
            cy.get('[contenteditable=true]').should('not.include.html', 'tw-text-right');
        });

        it('should unwrap an ordered list and remove bold at the same time', () => {
            cy.mount(<RichTextEditor />);

            insertTextAndOpenToolbar();
            cy.get(TOOLBAR_FLOATING).should('be.visible');
            cy.get(TOOLBAR_GROUP_1).children().eq(0).click();
            cy.get('[contenteditable=true]').should('include.html', 'tw-font-bold');

            cy.get(TOOLBAR_GROUP_2).children().eq(6).click();
            cy.get('[contenteditable=true]').should('include.html', '<ol');

            cy.get(TOOLBAR_GROUP_2).children().last().click();
            cy.get('[contenteditable=true]').should('include.html', '<p');
            cy.get('[contenteditable=true]').should('not.include.html', 'tw-font-bold');
            cy.get('[contenteditable=true]').should('not.include.html', '<ol');
        });

        it('should reset a heading', () => {
            cy.mount(<RichTextEditor />);

            insertTextAndOpenToolbar();
            cy.get(TOOLBAR_FLOATING).should('be.visible');
            cy.get(TEXTSTYLE_DROPDOWN_TRIGGER).click({ force: true });
            cy.get(TEXTSTYLE_OPTION).first().click();
            cy.get('[contenteditable=true]').should('include.html', '<h1');

            cy.get(TOOLBAR_GROUP_2).children().last().click();
            cy.get('[contenteditable=true]').should('not.include.html', '<h1');
        });
    });

    const RichTextEditorWithTwoColumns = ({ value }: { value?: string }) => {
        const [initialValue, setInitialValue] = useState(value);

        const pluginsWithColumns = new PluginComposer();
        pluginsWithColumns
            .setPlugin([new SoftBreakPlugin(), new ParagraphPlugin()])
            .setPlugin(new TextStylePlugin())
            .setPlugin(
                [new BoldPlugin(), new BreakAfterPlugin({ columns: 2, gap: 20 })],
                [new AlignRightPlugin(), new UnorderedListPlugin(), new OrderedListPlugin()],
            );

        return (
            <RichTextEditor
                border={false}
                plugins={pluginsWithColumns}
                value={initialValue}
                onTextChange={(value) => setInitialValue(value)}
            />
        );
    };

    const activeButtonClassNames = '!tw-bg-box-selected tw-rounded !tw-text-box-selected-inverse';
    const disabledButtonClassNames = '!tw-cursor-not-allowed !tw-opacity-50';

    describe('column break plugin', () => {
        it('it should add column break on paragraph', () => {
            cy.mount(<RichTextEditorWithTwoColumns />);

            insertTextAndOpenToolbar();
            cy.get(TOOLBAR_FLOATING).should('be.visible');
            cy.get('[contenteditable=true]').should('not.include.html', ACTIVE_COLUMN_BREAK_CLASS_NAMES);
            cy.get(TOOLBAR_GROUP_1).children().eq(-1).click();
            cy.get('[contenteditable=true]').should('include.html', ACTIVE_COLUMN_BREAK_CLASS_NAMES);
        });

        it('it should add column break on unordered list', () => {
            cy.mount(<RichTextEditorWithTwoColumns />);

            insertTextAndOpenToolbar();
            cy.get(TOOLBAR_FLOATING).should('be.visible');
            cy.get(TOOLBAR_GROUP_2).children().eq(1).click();
            cy.get('[contenteditable=true]').should('not.include.html', ACTIVE_COLUMN_BREAK_CLASS_NAMES);
            cy.get(TOOLBAR_GROUP_1).children().eq(-1).click();
            cy.get('[contenteditable=true]').should('include.html', ACTIVE_COLUMN_BREAK_CLASS_NAMES);
        });

        it('it should add column break on ordered list', () => {
            cy.mount(<RichTextEditorWithTwoColumns />);

            insertTextAndOpenToolbar();
            cy.get(TOOLBAR_FLOATING).should('be.visible');
            cy.get(TOOLBAR_GROUP_2).children().eq(2).click();
            cy.get('[contenteditable=true]').should('not.include.html', ACTIVE_COLUMN_BREAK_CLASS_NAMES);
            cy.get(TOOLBAR_GROUP_1).children().eq(-1).click();
            cy.get('[contenteditable=true]').should('include.html', ACTIVE_COLUMN_BREAK_CLASS_NAMES);
        });

        it('it should add column break on heading', () => {
            cy.mount(<RichTextEditorWithTwoColumns />);

            insertTextAndOpenToolbar();
            cy.get(TOOLBAR_FLOATING).should('be.visible');
            cy.get(TEXTSTYLE_DROPDOWN_TRIGGER).click({ force: true });
            cy.get(TEXTSTYLE_OPTION).first().click();
            cy.get('[contenteditable=true]')
                .click('topLeft')
                .should('not.include.html', ACTIVE_COLUMN_BREAK_CLASS_NAMES);
            selectTextValue('hello');
            cy.get(TOOLBAR_GROUP_1).children().eq(-1).click();
            cy.get('[contenteditable=true]').should('include.html', ACTIVE_COLUMN_BREAK_CLASS_NAMES);
        });

        it('it should add column break on custom textstyle', () => {
            cy.mount(<RichTextEditorWithTwoColumns />);

            insertTextAndOpenToolbar();
            cy.get(TOOLBAR_FLOATING).should('be.visible');
            cy.get(TEXTSTYLE_DROPDOWN_TRIGGER).click({ force: true });
            cy.get(TEXTSTYLE_OPTION).eq(4).click();
            cy.get('[contenteditable=true]').click().should('not.include.html', ACTIVE_COLUMN_BREAK_CLASS_NAMES);
            selectTextValue('hello');
            cy.get(TOOLBAR_GROUP_1).children().eq(-1).click();
            cy.get('[contenteditable=true]').should('include.html', ACTIVE_COLUMN_BREAK_CLASS_NAMES);
        });

        it('it should add column break on right aligned text', () => {
            cy.mount(<RichTextEditorWithTwoColumns />);

            insertTextAndOpenToolbar();
            cy.get(TOOLBAR_FLOATING).should('be.visible');
            cy.get(TOOLBAR_GROUP_2).children().eq(0).click();
            cy.get('[contenteditable=true]').should('not.include.html', ACTIVE_COLUMN_BREAK_CLASS_NAMES);
            cy.get(TOOLBAR_GROUP_1).children().eq(-1).click();
            cy.get('[contenteditable=true]').should('include.html', ACTIVE_COLUMN_BREAK_CLASS_NAMES);
        });

        it('it should add column break on when bold is applied', () => {
            cy.mount(<RichTextEditorWithTwoColumns />);
            insertTextAndOpenToolbar();
            cy.get(TOOLBAR_FLOATING).should('be.visible');
            cy.get(TOOLBAR_GROUP_1).children().eq(0).click();
            cy.get('[contenteditable=true]').should('not.include.html', ACTIVE_COLUMN_BREAK_CLASS_NAMES);
            cy.get(TOOLBAR_GROUP_1).children().eq(-1).click();
            cy.get('[contenteditable=true]').should('include.html', ACTIVE_COLUMN_BREAK_CLASS_NAMES);
        });

        it('it should move the text after the column break to the second column', () => {
            cy.mount(<RichTextEditorWithTwoColumns value={JSON.stringify([orderedListValue])} />);

            selectTextValue('first');
            cy.get(TOOLBAR_FLOATING).should('be.visible');
            cy.get(TOOLBAR_GROUP_1).children().eq(-1).click();
            cy.get('[contenteditable=true]').should('include.html', ACTIVE_COLUMN_BREAK_CLASS_NAMES);
            checkPosition('be.lessThan', 100, 'first');
            checkPosition('be.gt', 100, 'second');
            checkPosition('be.gt', 100, 'Level 5');
        });

        it('should add only one column break after the first break, when there is a maximum of two columns', () => {
            cy.mount(<RichTextEditorWithTwoColumns />);
            const content = 'hello{enter} World {enter} another newline{enter} last newline{selectAll}';

            cy.get('[contenteditable=true]').click().type(content);
            cy.get(TOOLBAR_GROUP_1).children().eq(-1).click();

            // break after should not be enabled
            cy.get('[contenteditable=true]').click();
            selectTextValue('hello');
            cy.get(TOOLBAR_GROUP_1).children().eq(-1).realHover().should('not.include.html', activeButtonClassNames);
            checkPosition('be.lessThan', 100, 'hello');

            // toolbar button should be active
            cy.get('[contenteditable=true]').click();
            selectTextValue('last newline');
            cy.get(TOOLBAR_GROUP_1).children().eq(-1).realHover().should('include.html', activeButtonClassNames);
            checkPosition('be.lessThan', 500, 'last newline');
            checkPosition('be.lessThan', 500, 'World');
        });

        it('should disable the column break button when already at max column breaks', () => {
            cy.mount(<RichTextEditorWithTwoColumns />);

            insertTextAndOpenToolbar();
            cy.get(TOOLBAR_GROUP_1).children().eq(-1).click();
            cy.get('[contenteditable=true]').click().type('{enter}content');

            selectTextValue('content');
            cy.get(TOOLBAR_GROUP_1).children().eq(-1).realHover().should('include.html', disabledButtonClassNames);
        });

        it('should set column break with hotkeys', () => {
            cy.mount(<RichTextEditorWithTwoColumns />);

            insertTextAndOpenToolbar();
            cy.get('[contenteditable=true]').type('content{shift+ctrl+enter}{enter}newline');
            selectTextValue('content');
            cy.get(TOOLBAR_GROUP_1).children().eq(-1).realHover().should('include.html', activeButtonClassNames);
            cy.get('[contenteditable=true]').click();
            selectTextValue('newline');
            cy.get(TOOLBAR_GROUP_1).children().eq(-1).realHover().should('not.include.html', activeButtonClassNames);
        });

        it('should delete a column break with backspace key', () => {
            cy.mount(<RichTextEditorWithTwoColumns />);
            cy.get('[contenteditable=true]').click().type('hello{shift+ctrl+enter}{enter}W{leftArrow}{backspace}');
            cy.get('[contenteditable=true]').should('not.include.html', activeButtonClassNames);

            // checks that the words are still separated 'hello' and 'W'
            selectTextValue('hello');
            cy.get(TOOLBAR_FLOATING).should('be.visible');
        });

        it('should delete a column break with del key', () => {
            cy.mount(<RichTextEditorWithTwoColumns />);
            cy.get('[contenteditable=true]').click().type('hello{shift+ctrl+enter}{enter}W{leftArrow}{leftArrow}{del}');
            cy.get('[contenteditable=true]').should('not.include.html', activeButtonClassNames);
            // checks that the words are still separated 'hello' and 'W', as only the column break should be deleted
            selectTextValue('hello');
            cy.get(TOOLBAR_FLOATING).should('be.visible');
        });

        it('should only add one column break with hotkeys, when there is a maximum of two columns', () => {
            cy.mount(<RichTextEditorWithTwoColumns />);
            const content =
                'hello{enter} World {enter} another newline{enter} last newline{selectAll}{shift+ctrl+enter}';
            cy.get('[contenteditable=true]').click().type(content);

            selectTextValue('hello');
            cy.get(TOOLBAR_GROUP_1).children().eq(-1).realHover().should('include.html', disabledButtonClassNames);
            cy.get('[contenteditable=true]').click();
            selectTextValue('last newline');
            cy.get(TOOLBAR_GROUP_1).children().eq(-1).realHover().should('include.html', activeButtonClassNames);
        });

        it('should set column breaks inactive when initialized with more column breaks than allowed', () => {
            cy.mount(
                <RichTextEditorWithTwoColumns
                    value={JSON.stringify([
                        {
                            type: ELEMENT_PARAGRAPH,
                            children: [{ text: 'This text is followed by a break 3.' }],
                            breakAfterColumn: 'active',
                        },
                        {
                            type: ELEMENT_PARAGRAPH,
                            children: [{ text: 'This text is followed by a break 3.' }],
                            breakAfterColumn: 'active',
                        },
                        {
                            type: ELEMENT_PARAGRAPH,
                            children: [{ text: 'This text is followed by a break 3.' }],
                            breakAfterColumn: 'active',
                        },
                    ])}
                />,
            );
            cy.get('[contenteditable=true] .tw-break-after-column').should('have.length', 1);
        });
    });

    describe('initial value', () => {
        it('it should normalize the initial html value', () => {
            const onBlur = cy.spy();
            cy.mount(<RichTextEditor value="<ul><li>foo</li><li>bar</li></ul>" onBlur={onBlur} />);

            cy.get('[contenteditable=true]')
                .click()
                .blur()
                .then(() => {
                    expect(onBlur).to.be.calledWith(
                        JSON.stringify([
                            {
                                type: 'ul',
                                children: [
                                    { type: 'li', children: [{ type: 'lic', children: [{ text: 'foo' }] }] },
                                    { type: 'li', children: [{ type: 'lic', children: [{ text: 'bar' }] }] },
                                ],
                            },
                        ]),
                    );
                });
        });
    });
});
