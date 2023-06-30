/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ELEMENT_PARAGRAPH } from '@udecode/plate';
import React, { ReactElement, useState } from 'react';
import { RichTextEditor } from '../RichTextEditor';
import { RICH_TEXT_EDITOR } from './fixtures/selectors';

const RichTextEditorWithValueSetOutside = ({ value }: { value: string }): ReactElement => {
    const [initialValue, setInitialValue] = useState(value);

    return <RichTextEditor onTextChange={(value) => setInitialValue(value)} value={initialValue} />;
};

describe('RichTextEditor Rendering', () => {
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
        const text = '<p><b>this is bold</b> and <i>this italic</i></p>';
        cy.mount(<RichTextEditor value={text} />);

        cy.get(RICH_TEXT_EDITOR).should('contain.text', 'this is bold and this italic');
        cy.get('[contenteditable=true]').should('include.html', 'tw-font-bold');
        cy.get('[contenteditable=true]').should('include.html', 'tw-italic');
    });

    it('should render a plain text string content state', () => {
        const text = 'This is text';
        cy.mount(<RichTextEditor value={text} />);

        cy.get(RICH_TEXT_EDITOR).should('contain.text', text);
    });

    it('should render the updated value when updateValueOnChange enabled', () => {
        const initialText = 'This is the initial text';

        cy.mount(
            <RichTextEditor
                updateValueOnChange
                value={JSON.stringify([{ type: ELEMENT_PARAGRAPH, children: [{ text: initialText }] }])}
            />,
        ).then(({ rerender }) => {
            const updatedText = 'This is the updated text';
            rerender(
                <RichTextEditor
                    updateValueOnChange
                    value={JSON.stringify([{ type: ELEMENT_PARAGRAPH, children: [{ text: updatedText }] }])}
                />,
            );
            cy.get(RICH_TEXT_EDITOR).should('contain.text', updatedText);
        });
    });

    it('should render the same value when updateValueOnChange disabled', () => {
        const text = 'This is the initial text';

        cy.mount(<RichTextEditor value={JSON.stringify([{ type: ELEMENT_PARAGRAPH, children: [{ text }] }])} />).then(
            ({ rerender }) => {
                rerender(
                    <RichTextEditor
                        value={JSON.stringify([
                            { type: ELEMENT_PARAGRAPH, children: [{ text: 'This is the updated text' }] },
                        ])}
                    />,
                );
                cy.get(RICH_TEXT_EDITOR).should('contain.text', text);
            },
        );
    });

    it('it should normalize the initial html value', () => {
        const text = '<ul><li>foo</li><li>bar</li></ul>';
        const onBlur = cy.spy();

        const expectedResult = JSON.stringify([
            {
                type: 'ul',
                children: [
                    { type: 'li', children: [{ type: 'lic', children: [{ text: 'foo' }] }] },
                    { type: 'li', children: [{ type: 'lic', children: [{ text: 'bar' }] }] },
                ],
            },
        ]);

        cy.mount(<RichTextEditor value={text} onBlur={onBlur} />);
        cy.get('[contenteditable=true]')
            .click()
            .blur()
            .then(() => expect(onBlur).to.be.calledWith(expectedResult));
    });

    it('renders normal text set outside', () => {
        const text = 'This is new text';

        cy.mount(<RichTextEditorWithValueSetOutside value={text} />);
        cy.get(RICH_TEXT_EDITOR).should('contain.text', text);
    });
});

describe('RichTextEditor Rendering - without proper parent Tag', () => {
    it('it renders break BR', () => {
        const text = '<br />';

        cy.mount(<RichTextEditor value={text} />);
        cy.get(RICH_TEXT_EDITOR).should('contain.text', '\n\n');
    });

    it('it renders multiple BR', () => {
        const text = '<br /><br /><br />';

        cy.mount(<RichTextEditor value={text} />);
        cy.get(RICH_TEXT_EDITOR).should('contain.text', '\n\n\n\n');
    });

    it('it renders empty string on spaces', () => {
        const text = '        ';

        cy.mount(<RichTextEditor value={text} />);
        cy.get(RICH_TEXT_EDITOR).should('contain.text', '');
    });

    it('it renders text with STRONG tag', () => {
        const text = '<strong>This is new text</strong>';

        cy.mount(<RichTextEditor value={text} />);
        cy.get('[contenteditable=true]').should('include.html', 'tw-font-bold');
    });

    it('it renders text when DIV tag', () => {
        const text = '<div>This is new text</div>';

        cy.mount(<RichTextEditor value={text} />);
        cy.get(RICH_TEXT_EDITOR).should('contain.text', 'This is new text');
    });

    it('it renders text when SPAN tag', () => {
        const text = '<span>This is new text</span>';

        cy.mount(<RichTextEditor value={text} />);
        cy.get(RICH_TEXT_EDITOR).should('contain.text', 'This is new text');
    });
});
