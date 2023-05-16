/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ELEMENT_LINK, ELEMENT_PARAGRAPH } from '@udecode/plate';
import React, { ReactElement, useState } from 'react';
import { orderedListValue } from '../helpers/exampleValues';
import {
    AlignCenterPlugin,
    AlignJustifyPlugin,
    AlignLeftPlugin,
    AlignRightPlugin,
    BoldPlugin,
    BreakAfterPlugin,
    ButtonPlugin,
    CheckboxListPlugin,
    CodePlugin,
    ELEMENT_BUTTON,
    EmojiPlugin,
    ItalicPlugin,
    LinkPlugin,
    OrderedListPlugin,
    ParagraphPlugin,
    PluginComposer,
    ResetFormattingPlugin,
    RichTextButtonStyle,
    SoftBreakPlugin,
    StrikethroughPlugin,
    TextStylePlugin,
    TextStyles,
    UnderlinePlugin,
    UnorderedListPlugin,
} from '../Plugins';
import { ACTIVE_COLUMN_BREAK_CLASS_NAMES } from '../Plugins/ColumnBreakPlugin/utils/getColumnBreakClasses';
import { RichTextEditor } from '../RichTextEditor';
import { ON_SAVE_DELAY_IN_MS } from '../utils';
import { insertTextAndOpenToolbar } from './fixtures/RichTextEditor';
import {
    BUTTON,
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
    TOOLBAR_BUTTON,
    TOOLBAR_FLOATING,
    TOOLBAR_GROUP_1,
    TOOLBAR_GROUP_2,
} from './fixtures/selectors';
import { Heading1Plugin } from '../Plugins/TextStylePlugin/examples/heading1Plugin';
import { Custom1Plugin } from '../Plugins/TextStylePlugin/examples/custom1Plugin';
import { Custom2Plugin } from '../Plugins/TextStylePlugin/examples/custom2Plugin';
import { Custom3Plugin } from '../Plugins/TextStylePlugin/examples/custom3Plugin';
import { Heading2Plugin } from '../Plugins/TextStylePlugin/examples/heading2Plugin';
import { Heading3Plugin } from '../Plugins/TextStylePlugin/examples/heading3Plugin';
import { Heading4Plugin } from '../Plugins/TextStylePlugin/examples/heading4Plugin';
import { SubscriptPlugin } from '@components/RichTextEditor/Plugins/SubscriptPlugin';
import { SuperscriptPlugin } from '@components/RichTextEditor/Plugins/SuperscriptPlugin';

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

const RichTextWithButton = ({
    text,
    link,
    buttonStyle,
}: {
    text: string;
    link: string;
    buttonStyle: RichTextButtonStyle;
}): ReactElement => {
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

const RichTextEditorWithValueSetOutside = ({ value }: { value: string }): ReactElement => {
    const [initialValue, setInitialValue] = useState(value);

    return <RichTextEditor onTextChange={(value) => setInitialValue(value)} value={initialValue} />;
};

const RichTextEditorWithOrderedListStyles = (): ReactElement => (
    <RichTextEditor value={JSON.stringify([orderedListValue])} />
);

const TextStylePlugins = [
    new Heading1Plugin(),
    new Heading2Plugin(),
    new Heading3Plugin(),
    new Heading4Plugin(),
    new ParagraphPlugin(),
    new Custom1Plugin(),
    new Custom2Plugin(),
    new Custom3Plugin(),
];

const RichTextWithCustomTextStyles = (): ReactElement => {
    const plugins = new PluginComposer();
    plugins
        .setPlugin(new SoftBreakPlugin())
        .setPlugin(
            new TextStylePlugin({
                textStyles: TextStylePlugins,
            }),
        )
        .setPlugin(
            [
                new BoldPlugin(),
                new ItalicPlugin(),
                new UnderlinePlugin(),
                new StrikethroughPlugin(),
                new LinkPlugin(),
                new ButtonPlugin(),
                new CodePlugin(),
            ],
            [
                new AlignLeftPlugin(),
                new AlignCenterPlugin(),
                new AlignRightPlugin(),
                new AlignJustifyPlugin(),
                new UnorderedListPlugin(),
                new CheckboxListPlugin(),
                new OrderedListPlugin(),
                new ResetFormattingPlugin(),
                new EmojiPlugin(),
            ],
        );

    return <RichTextEditor plugins={plugins} />;
};

const activeButtonClassNames = '!tw-bg-box-selected tw-rounded !tw-text-box-selected-inverse';
const disabledButtonClassNames = '!tw-cursor-not-allowed !tw-opacity-50';

import './fixtures/theme.css';

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
            cy.mount(<RichTextWithCustomTextStyles />);

            insertTextAndOpenToolbar();
            cy.get(TOOLBAR_FLOATING).should('be.visible');
            cy.get(TEXTSTYLE_DROPDOWN_TRIGGER).click({ force: true });
            cy.get(TEXTSTYLE_OPTION).first().click();
            cy.get('[contenteditable=true]').should('include.html', '<h1');
        });

        it('renders a custom text style', () => {
            cy.mount(<RichTextWithCustomTextStyles />);

            insertTextAndOpenToolbar();
            cy.get(TOOLBAR_FLOATING).should('be.visible');
            cy.get(TEXTSTYLE_DROPDOWN_TRIGGER).click({ force: true });
            cy.get(TEXTSTYLE_OPTION).eq(6).click();
            cy.get('[contenteditable=true] > p').should(
                'have.attr',
                'style',
                'color: var(--f-theme-settings-custom2-color); font-family: var(--f-theme-settings-custom2-font-family); font-size: var(--f-theme-settings-custom2-font-size); font-style: var(--f-theme-settings-custom2-font-style); font-weight: var(--f-theme-settings-custom2-font-weight); letter-spacing: var(--f-theme-settings-custom2-letter-spacing); line-height: var(--f-theme-settings-custom2-line-height); text-decoration: var(--f-theme-settings-custom2-text-decoration); text-transform: var(--f-theme-settings-custom2-text-transform);',
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
            cy.mount(<RichTextWithCustomTextStyles />);
            const heading2Styles =
                'color: var(--f-theme-settings-heading2-color); font-family: var(--f-theme-settings-heading2-font-family); font-size: var(--f-theme-settings-heading2-font-size); font-style: var(--f-theme-settings-heading2-font-style); font-weight: var(--f-theme-settings-heading2-font-weight); letter-spacing: var(--f-theme-settings-heading2-letter-spacing); line-height: var(--f-theme-settings-heading2-line-height); text-decoration: var(--f-theme-settings-heading2-text-decoration); text-transform: var(--f-theme-settings-heading2-text-transform);';

            insertTextAndOpenToolbar();
            cy.get(TOOLBAR_GROUP_2).children().eq(5).click();
            cy.get(TEXTSTYLE_DROPDOWN_TRIGGER).click({ force: true });
            cy.get(TEXTSTYLE_OPTION).eq(1).click();
            cy.get('[contenteditable=true] > div > span').should('have.attr', 'style', heading2Styles);
            //remove checklist again and textStyle stays
            cy.get('[contenteditable=true]').click().type('{selectall}');
            cy.get(TOOLBAR_GROUP_2).children().eq(5).click();
            cy.get('[contenteditable=true] > h2').should('have.attr', 'style', heading2Styles);
        });

        it('switches a custom checkbox to list and keeps textStyle', () => {
            cy.mount(<RichTextWithCustomTextStyles />);
            const heading1Styles =
                'color: var(--f-theme-settings-heading1-color); font-family: var(--f-theme-settings-heading1-font-family); font-size: var(--f-theme-settings-heading1-font-size); font-style: var(--f-theme-settings-heading1-font-style); font-weight: var(--f-theme-settings-heading1-font-weight); letter-spacing: var(--f-theme-settings-heading1-letter-spacing); line-height: var(--f-theme-settings-heading1-line-height); text-decoration: var(--f-theme-settings-heading1-text-decoration); text-transform: var(--f-theme-settings-heading1-text-transform);';

            insertTextAndOpenToolbar();
            cy.get(TOOLBAR_GROUP_2).children().eq(5).click();
            cy.get(TEXTSTYLE_DROPDOWN_TRIGGER).click({ force: true });
            cy.get(TEXTSTYLE_OPTION).first().click();
            cy.get('[contenteditable=true] > div ').should('include.html', heading1Styles);
            //remove checklist again and textStyle stays
            cy.get('[contenteditable=true]').click().type('{selectall}');
            cy.get(TOOLBAR_GROUP_2).children().eq(4).click();
            cy.get('[contenteditable=true] > ul ').should('include.html', heading1Styles);
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

        it('should disable link-button when multiple blocks are selected', () => {
            const plugins = new PluginComposer();
            plugins.setPlugin([new LinkPlugin()]);

            cy.mount(<RichTextEditor plugins={plugins} />);

            cy.get('[contenteditable=true]').click().type('block1{enter}block2{selectall}');
            cy.get(TOOLBAR_FLOATING).should('be.visible');
            cy.get(`${TOOLBAR_FLOATING} ${TOOLBAR_BUTTON}`).should('have.class', disabledButtonClassNames);
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

            cy.mount(<RichTextWithButton link={link} text={text} buttonStyle="primary" />);

            cy.get('[contenteditable=true] a').realClick();
            cy.get(EDIT_BUTTON_BUTTON).click();

            cy.get(FLOATING_BUTTON_SECONDARY).realClick();
            cy.get(BUTTON).eq(1).click();
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

        it('should disable button-button when multiple blocks are selected', () => {
            const plugins = new PluginComposer();
            plugins.setPlugin([new ButtonPlugin()]);

            cy.mount(<RichTextEditor plugins={plugins} />);

            cy.get('[contenteditable=true]').click().type('block1{enter}block2{selectall}');
            cy.get(TOOLBAR_FLOATING).should('be.visible');
            cy.get(`${TOOLBAR_FLOATING} ${TOOLBAR_BUTTON}`).should('have.class', disabledButtonClassNames);
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
            cy.mount(<RichTextWithCustomTextStyles />);

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
            .setPlugin([new SoftBreakPlugin()])
            .setPlugin([new TextStylePlugin({ textStyles: TextStylePlugins })])
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

    describe('Subscript and Superscript', () => {
        beforeEach(() => {
            const plugins = new PluginComposer();
            plugins
                .setPlugin([
                    new TextStylePlugin({
                        textStyles: [TextStyles.ELEMENT_HEADING1, TextStyles.ELEMENT_PARAGRAPH],
                    }),
                ])
                .setPlugin([
                    new ItalicPlugin(),
                    new BoldPlugin(),
                    new UnderlinePlugin(),
                    new SubscriptPlugin(),
                    new SuperscriptPlugin(),
                ]);

            cy.mount(<RichTextEditor plugins={plugins} />);
            insertTextAndOpenToolbar();
        });

        it('renders subscript', () => {
            cy.get(TOOLBAR_FLOATING).should('be.visible');
            cy.get(TOOLBAR_GROUP_1).children().eq(3).click();
            cy.get('[contenteditable=true]').should('include.html', 'sub');
        });

        it('renders superscript', () => {
            cy.get(TOOLBAR_FLOATING).should('be.visible');
            cy.get(TOOLBAR_GROUP_1).children().eq(4).click();
            cy.get('[contenteditable=true]').should('include.html', 'sup');
        });

        it('should reset format', () => {
            cy.get(TOOLBAR_FLOATING).should('be.visible');
            cy.get(TOOLBAR_GROUP_1).children().eq(3).click();
            cy.get('[contenteditable=true]').should('include.html', 'sub');
            cy.get(TOOLBAR_GROUP_1).children().eq(4).click();
            cy.get('[contenteditable=true]').should('not.include.html', 'sub');
            cy.get('[contenteditable=true]').should('include.html', 'sup');
            cy.get(TOOLBAR_GROUP_1).children().eq(3).click();
            cy.get('[contenteditable=true]').should('not.include.html', 'sup');
            cy.get('[contenteditable=true]').should('include.html', 'sub');
        });
    });
});
