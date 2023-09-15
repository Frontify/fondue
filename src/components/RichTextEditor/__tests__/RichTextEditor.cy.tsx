/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ELEMENT_PARAGRAPH } from '@udecode/plate';
import { useState } from 'react';
import { orderedListValue } from '../helpers/exampleValues';
import {
    AlignRightPlugin,
    AutoformatPlugin,
    BOLD_CLASSES,
    BoldPlugin,
    BreakAfterPlugin,
    CODE_CLASSES,
    CodePlugin,
    Heading1Plugin,
    Heading2Plugin,
    Heading3Plugin,
    Heading4Plugin,
    ITALIC_CLASSES,
    ItalicPlugin,
    OrderedListPlugin,
    ParagraphPlugin,
    PluginComposer,
    STRIKETHROUGH_CLASSES,
    SoftBreakPlugin,
    StrikethroughPlugin,
    TextStylePlugin,
    UL_CLASSES,
    UNDERLINE_CLASSES,
    UnderlinePlugin,
    UnorderedListPlugin,
    getOrderedListClasses,
} from '../Plugins';
import { ACTIVE_COLUMN_BREAK_CLASS_NAMES } from '../Plugins/ColumnBreakPlugin/utils/getColumnBreakClasses';
import { RichTextEditor } from '../RichTextEditor';
import { ON_SAVE_DELAY_IN_MS } from '../utils';
import {
    RichTextWithCustomTextStylesDefaultValues,
    TextStylePlugins,
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

const activeButtonClassNames = '!tw-bg-box-selected tw-rounded !tw-text-box-selected-inverse';
const disabledButtonClassNames = '!tw-cursor-not-allowed !tw-opacity-50';

describe('RichTextEditor Component', () => {
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
            cy.get(TOOLBAR_GROUP_1).children().eq(5).click();
            cy.get('[contenteditable=true]').should(
                'include.html',
                'tw-rounded tw-bg-box-neutral tw-text-violet-90 tw-m-0 tw-px-[0.2em] tw-font-mono tw-text-[85%]',
            );

            cy.get(TOOLBAR_GROUP_2).children().last().click();
            cy.get('[contenteditable=true]').should(
                'not.include.html',
                'tw-rounded tw-bg-box-neutral tw-text-violet-90 tw-m-0 tw-px-[0.2em] tw-font-mono tw-text-[85%]',
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
            cy.get(TOOLBAR_GROUP_1).children().eq(5).click();
            cy.get('[contenteditable=true]').should(
                'include.html',
                'tw-rounded tw-bg-box-neutral tw-text-violet-90 tw-m-0 tw-px-[0.2em] tw-font-mono tw-text-[85%]',
            );
            cy.get('[contenteditable=true]').should('include.html', 'tw-font-bold');
            cy.get('[contenteditable=true]').should('include.html', 'tw-italic');
            cy.get('[contenteditable=true]').should('include.html', 'tw-underline');
            cy.get('[contenteditable=true]').should('include.html', 'tw-line-through');

            cy.get(TOOLBAR_GROUP_2).children().last().click();
            cy.get('[contenteditable=true]').should(
                'not.include.html',
                'tw-rounded tw-bg-box-neutral tw-text-violet-90 tw-m-0 tw-px-[0.2em] tw-font-mono tw-text-[85%]',
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
            cy.mount(<RichTextWithCustomTextStylesDefaultValues />);

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
            cy.get(TEXTSTYLE_OPTION).eq(5).click();
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

    describe('Subscript and Superscript', () => {
        beforeEach(() => {
            const plugins = new PluginComposer();
            plugins
                .setPlugin([
                    new TextStylePlugin({
                        textStyles: [new Heading1Plugin(), new ParagraphPlugin()],
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

    describe('Accessbility', () => {
        it('should be able to tab between multiple rich text editors.', () => {
            cy.mount(
                <>
                    <RichTextEditor value="<p>Mock</p>" />
                    <RichTextEditor value="<p>Mock2</p>" />
                </>,
            );

            cy.get('[contenteditable=true]').eq(0).click();
            cy.get('[contenteditable=true]').eq(0).should('be.focused');
            cy.realPress('Tab');
            cy.get('[contenteditable=true]').eq(1).should('be.focused');
            cy.realPress(['Shift', 'Tab']);
            cy.get('[contenteditable=true]').eq(0).should('be.focused');
        });
    });

    describe('Blur behavior', () => {
        it('should be able to collapse toolbar on outside click', () => {
            cy.mount(
                <>
                    <RichTextEditor value="<p>Mock</p>" />
                    <div id="outside">Not part of the RTE</div>
                </>,
            );
            cy.get('[contenteditable=true]').eq(0).click();
            cy.get('[contenteditable=true]').eq(0).should('be.focused');
            cy.get('[contenteditable=true]').eq(0).type('{selectall}');
            cy.get(TOOLBAR_FLOATING).should('be.visible');
            cy.get('#outside').click({ force: true });
            cy.get('[contenteditable=true]').eq(0).should('not.be.focused');
            cy.get(TOOLBAR_FLOATING).should('not.exist');
        });

        it('should be able to collapse floating modal on outside click', () => {
            cy.mount(
                <>
                    <RichTextEditor value="<p>Mock</p>" />
                    <div id="outside">Not part of the RTE</div>
                </>,
            );
            cy.get('[contenteditable=true]').eq(0).click();
            cy.get('[contenteditable=true]').eq(0).should('be.focused');
            cy.get('[contenteditable=true]').eq(0).type('{selectall}');
            cy.get('[data-plugin-id="a"]').click();
            cy.get('[data-test-id="floating-link-insert"]').should('be.visible');
            cy.get('#outside').click({ force: true });
            cy.get('[data-test-id="floating-link-insert"]').should('not.exist');
            cy.get(TOOLBAR_FLOATING).should('not.exist');
        });
    });

    describe('Autoformat', () => {
        beforeEach(() => {
            const plugins = new PluginComposer();
            plugins
                .setPlugin([
                    new TextStylePlugin({
                        textStyles: [
                            new Heading1Plugin(),
                            new Heading2Plugin(),
                            new Heading3Plugin(),
                            new Heading4Plugin(),
                            new ParagraphPlugin(),
                        ],
                    }),
                ])
                .setPlugin([
                    new ItalicPlugin(),
                    new BoldPlugin(),
                    new UnderlinePlugin(),
                    new StrikethroughPlugin(),
                    new CodePlugin(),
                    new UnorderedListPlugin(),
                    new OrderedListPlugin(),
                    new AutoformatPlugin(),
                ]);

            cy.mount(<RichTextEditor plugins={plugins} />);
        });

        it('should autoformat ** to bold', () => {
            cy.get('[contenteditable=true]').click().type('**hello**');
            cy.get('[contenteditable=true]').should('include.html', BOLD_CLASSES);
        });

        it('should autoformat * to italic', () => {
            cy.get('[contenteditable=true]').click().type('*hello*');
            cy.get('[contenteditable=true]').should('include.html', ITALIC_CLASSES);
        });

        it('should autoformat _ to underline', () => {
            cy.get('[contenteditable=true]').click().type('_hello_');
            cy.get('[contenteditable=true]').should('include.html', UNDERLINE_CLASSES);
        });

        it('should autoformat ~~ to strikethrough', () => {
            cy.get('[contenteditable=true]').click().type('~~hello~~');
            cy.get('[contenteditable=true]').should('include.html', STRIKETHROUGH_CLASSES);
        });

        it('should autoformat - to code block', () => {
            cy.get('[contenteditable=true]').click().type('`hello`');
            cy.get('[contenteditable=true]').should('include.html', CODE_CLASSES);
        });

        it('should autoformat # to heading 1', () => {
            cy.get('[contenteditable=true]').click().type('# hello');
            cy.get('[contenteditable=true]').should('include.html', '<h1');
        });

        it('should autoformat ## to heading 2', () => {
            cy.get('[contenteditable=true]').click().type('## hello');
            cy.get('[contenteditable=true]').should('include.html', '<h2');
        });

        it('should autoformat ### to heading 3', () => {
            cy.get('[contenteditable=true]').click().type('### hello');
            cy.get('[contenteditable=true]').should('include.html', '<h3');
        });

        it('should autoformat #### to heading 4', () => {
            cy.get('[contenteditable=true]').click().type('#### hello');
            cy.get('[contenteditable=true]').should('include.html', '<h4');
        });

        it('should autoformat - to unordered list', () => {
            cy.get('[contenteditable=true]').click().type('- hello');
            cy.get('[contenteditable=true]').should('include.html', '<ul');
            cy.get('[contenteditable=true]').should('include.html', '<li');
            cy.get('[contenteditable=true]').get('ul').should('have.class', UL_CLASSES);
        });

        it('should autoformat 1. to ordered list', () => {
            cy.get('[contenteditable=true]').click().type('1. hello');
            cy.get('[contenteditable=true]').should('include.html', '<ol');
            cy.get('[contenteditable=true]').should('include.html', '<li');
            cy.get('[contenteditable=true]').get('ol').should('have.class', getOrderedListClasses(0));
        });
    });
});
