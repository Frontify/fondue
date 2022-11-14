/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ELEMENT_LINK, ELEMENT_PARAGRAPH } from '@udecode/plate';
import React, { CSSProperties, FC, useState } from 'react';
import { Position } from './EditorPositioningWrapper';
import {
    BoldPlugin,
    ButtonStyle,
    ELEMENT_BUTTON,
    InitPlugin,
    ItalicPlugin,
    LinkPlugin,
    PluginComposer,
    UnorderedListPlugin,
} from './Plugins';
import { ButtonStyles } from './Plugins/TextStylePlugin/TextStyles';
import { RichTextEditor } from './RichTextEditor';
import { DesignTokens } from './types';
import { ON_SAVE_DELAY_IN_MS } from './utils';
import { defaultDesignTokens } from './utils/defaultDesignTokens';

const RICH_TEXT_EDITOR = '[data-test-id=rich-text-editor]';
const TOOLBAR_FLOATING = '[data-test-id=toolbar-floating]';
const TOOLBAR_BOTTOM = '[data-test-id=toolbar-bottom]';
const TOOLBAR_TOP = '[data-test-id=toolbar-top]';
const TOOLBAR_GROUP_0 = '[data-test-id=toolbar-group-0]';
const TOOLBAR_GROUP_1 = '[data-test-id=toolbar-group-1]';
const TOOLBAR_GROUP_2 = '[data-test-id=toolbar-group-2]';
const TOOLBAR_GROUP_3 = '[data-test-id=toolbar-group-3]';
const TEXTSTYLE_DROPDOWN_TRIGGER = '[data-test-id=textstyle-dropdown-trigger]';
const CHANGE_DESIGN_TOKENS_TRIGGER = '[data-test-id=change-design-tokens-button]';
const TEXTSTYLE_OPTION = '[data-test-id=textstyle-option]';
const CHECKBOX_INPUT = '[data-test-id=checkbox-input]';
const EDIT_LINK_BUTTON = '[data-test-id=edit-link-button]';
const EDIT_BUTTON_BUTTON = '[data-test-id=edit-button-button]';
const REMOVE_LINK_BUTTON = '[data-test-id=remove-link-button]';
const REMOVE_BUTTON_BUTTON = '[data-test-id=remove-button-button]';
const FLOATING_LINK_INSERT = '[data-test-id=floating-link-insert]';
const FLOATING_BUTTON_INSERT = '[data-test-id=floating-button-insert]';
const FLOATING_LINK_EDIT = '[data-test-id=floating-link-edit]';
const FLOATING_BUTTON_EDIT = '[data-test-id=floating-button-edit]';
const FLOATING_BUTTON_SECONDARY = '[data-test-id=floating-button-insert-secondary]';
const BUTTON = '[data-test-id=button]';
const LINK_CHOOSER_CHECKBOX = '.tw-group > .tw-inline-flex > .tw-flex-1 > .tw-select-none';

const insertTextAndOpenToolbar = () => cy.get('[contenteditable=true]').click().type('hello{selectall}');

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

const RichTextWithButton: FC<{ text: string; link: string; buttonStyle: ButtonStyle }> = ({
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

const RichTextWithToolbarPositioning = ({ position }: { position?: Position }) => (
    <RichTextEditor position={position} />
);

const RichTextEditorWithValueSetOutside = ({ value }: { value: string }) => {
    const [initialValue, setInitialValue] = useState(value);

    return <RichTextEditor onTextChange={(value) => setInitialValue(value)} value={initialValue} />;
};

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
            cy.mount(<RichTextEditor value={'<b>this is bold</b> and <i>this italic</i>'} />);

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
    describe('Toolbar', () => {
        it('should display toolbar when selecting inserted text', () => {
            cy.mount(<RichTextEditor />);

            insertTextAndOpenToolbar();
            cy.get(TOOLBAR_FLOATING).should('be.visible');
        });

        it('renders a toolbar with custom controls', () => {
            const plugins = new PluginComposer();
            plugins
                .setPlugin([new InitPlugin()])
                .setPlugin([new LinkPlugin()])
                .setPlugin([new BoldPlugin(), new ItalicPlugin()])
                .setPlugin([new UnorderedListPlugin()]);
            cy.mount(<RichTextEditor plugins={plugins} />);

            insertTextAndOpenToolbar();
            cy.get(TOOLBAR_FLOATING).should('be.visible');
            cy.get(TOOLBAR_GROUP_0).find('[data-testid=ToolbarButton]').should('have.length', 1);
            cy.get(TOOLBAR_GROUP_1).find('[data-testid=ToolbarButton]').should('have.length', 2);
            cy.get(TOOLBAR_GROUP_2).find('[data-testid=ToolbarButton]').should('have.length', 1);
            cy.get(TOOLBAR_GROUP_3).should('not.exist');
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
                'tw-table-cell tw-rounded tw-bg-box-neutral tw-text-box-neutral-inverse tw-m-0 tw-px-2 tw-py-0.5',
            );
        });

        it('renders an unordered list', () => {
            cy.mount(<RichTextEditor />);

            insertTextAndOpenToolbar();
            cy.get(TOOLBAR_FLOATING).should('be.visible');
            cy.get(TOOLBAR_GROUP_2).children().eq(4).click();
            cy.get('[contenteditable=true]').should('include.html', '<ul');
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
                'font-size: 14px; text-decoration: underline;',
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
            cy.get(LINK_CHOOSER_CHECKBOX).click();
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

            cy.get('[contenteditable=true] a').click();
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
            cy.get('[contenteditable=true] a').click();
            cy.get(EDIT_LINK_BUTTON).click();

            cy.get('[type=text]').eq(1).click().type(additionalLink);
            cy.get(LINK_CHOOSER_CHECKBOX).click();

            cy.get(BUTTON).eq(1).click();
            cy.get('[contenteditable=true] a').should('have.attr', 'href', link + additionalLink);
            cy.get('[contenteditable=true] a').should('have.attr', 'target', '_self');
        });

        it('should remove link', () => {
            const link = 'https://smartive.ch';
            const text = 'This is a link';
            cy.mount(<RichTextWithLink link={link} text={text} />);
            cy.get('[contenteditable=true] a').click();
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

            cy.get('[contenteditable=true] a').click();
            cy.get(REMOVE_LINK_BUTTON).click();

            cy.get('[contenteditable=true]').should('contain.text', text);
            cy.get('[contenteditable=true] a').should('not.exist');
        });

        it('should edit legacy link', () => {
            const link = 'https://smartive.ch';
            const text = 'This is a link';
            const additionalLink = '/team';
            cy.mount(<RichTextWithLegacyLink url={link} text={text} />);
            cy.get('[contenteditable=true] a').click();
            cy.get(EDIT_LINK_BUTTON).click();

            cy.get('[type=text]').eq(1).click().type(additionalLink);
            cy.get(LINK_CHOOSER_CHECKBOX).click();

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
            cy.get(LINK_CHOOSER_CHECKBOX).click();
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

            cy.get('[contenteditable=true] a').click();
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
            cy.get('[contenteditable=true] a').click();
            cy.get(EDIT_BUTTON_BUTTON).click();

            cy.get('[type=text]').eq(1).click().type(additionalLink);
            cy.get(LINK_CHOOSER_CHECKBOX).click();

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
                .should('contain', `color: ${designTokens.button_primary?.color}`);

            cy.get('[contenteditable=true] a').click();
            cy.get(EDIT_BUTTON_BUTTON).click();

            cy.get(FLOATING_BUTTON_SECONDARY).click();
            cy.get(BUTTON).eq(1).click();

            cy.get('[contenteditable=true] a')
                .invoke('attr', 'style')
                .should('contain', `color: ${designTokens.button_secondary?.color}`);
        });

        it('should remove button', () => {
            const link = 'https://smartive.ch';
            const text = 'This is a link';
            cy.mount(<RichTextWithButton link={link} text={text} buttonStyle="primary" />);
            cy.get('[contenteditable=true] a').click();
            cy.get(REMOVE_BUTTON_BUTTON).click();

            cy.get('[contenteditable=true]').should('contain.text', text);
            cy.get('[contenteditable=true] a').should('not.exist');
        });
    });
});

describe('RichTextEditor Component: Positioning of Toolbar', () => {
    it('should render with fixed top toolbar', () => {
        cy.mount(<RichTextWithToolbarPositioning position={Position.TOP} />);

        cy.get(RICH_TEXT_EDITOR).should('be.visible');
        cy.get(TOOLBAR_TOP).should('be.visible');
    });

    it('should render with fixed bottom toolbar', () => {
        cy.mount(<RichTextWithToolbarPositioning position={Position.BOTTOM} />);

        cy.get(RICH_TEXT_EDITOR).should('be.visible');
        cy.get(TOOLBAR_BOTTOM).should('be.visible');
    });
});
