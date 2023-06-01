/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { Tag, TagSize, TagType } from './Tag';

const TAG_ID = '[data-test-id=tag]';
const TAG_LABEL = 'My awesome tag';
const TAG_REJECT_ICON_ATTRIBUTE = 'svg[name=IconReject]';

describe('Tag Component', () => {
    it('should render a label', () => {
        cy.mount(<Tag type={TagType.Suggested} label={TAG_LABEL} />);

        cy.get(TAG_ID).contains(TAG_LABEL);
    });

    it('should render a small label', () => {
        cy.mount(<Tag type={TagType.Suggested} size={TagSize.Small} label={TAG_LABEL} />);

        cy.get(TAG_ID).should('have.class', 'tw-px-[6px]').should('have.class', 'tw-py-[2px]');
    });

    it('should render a medium label', () => {
        cy.mount(<Tag type={TagType.Suggested} size={TagSize.Medium} label={TAG_LABEL} />);

        cy.get(TAG_ID).should('have.class', 'tw-px-2.5').should('have.class', 'tw-py-1');
    });

    it('should render a suggested tag', () => {
        cy.mount(<Tag type={TagType.Suggested} label={TAG_LABEL} />);

        cy.get(TAG_ID).should('have.class', 'tw-bg-white').and('have.class', 'tw-text-black-80');
        cy.get(TAG_REJECT_ICON_ATTRIBUTE).should('not.exist');
    });

    it('should render a selected tag', () => {
        const onClickStub = cy.stub().as('onClickStub');

        cy.mount(<Tag type={TagType.Selected} label={TAG_LABEL} onClick={onClickStub} />);

        cy.get(TAG_ID).should('have.class', 'tw-bg-black-5');
        cy.get(TAG_ID).should('be.visible', TAG_REJECT_ICON_ATTRIBUTE);
    });

    it('should render a selected with focus tag', () => {
        const onClickStub = cy.stub().as('onClickStub');

        cy.mount(<Tag type={TagType.SelectedWithFocus} label={TAG_LABEL} onClick={onClickStub} />);

        cy.get(TAG_ID).should('have.class', 'tw-bg-violet-60');
        cy.get(TAG_ID).should('be.visible', TAG_REJECT_ICON_ATTRIBUTE);
    });

    it('should render a previously selected tag', () => {
        cy.mount(<Tag type={TagType.PreviouslySelected} label={TAG_LABEL} />);

        cy.get(TAG_ID).should('have.class', 'tw-bg-white').and('have.class', 'tw-text-violet-60');
        cy.get(TAG_REJECT_ICON_ATTRIBUTE).should('not.exist');
    });

    it('should trigger a click event on click when type is selected', () => {
        const onClickStub = cy.stub().as('onClickStub');

        cy.mount(<Tag type={TagType.Selected} label={TAG_LABEL} onClick={onClickStub} />);

        cy.get('@onClickStub').should('not.be.called');
        cy.get(TAG_ID).click();
        cy.get('@onClickStub').should('be.calledOnce');
    });

    it('should trigger a click event on click when type is selected with focus', () => {
        const onClickStub = cy.stub().as('onClickStub');

        cy.mount(<Tag type={TagType.SelectedWithFocus} label={TAG_LABEL} onClick={onClickStub} />);

        cy.get('@onClickStub').should('not.be.called');
        cy.get(TAG_ID).click();
        cy.get('@onClickStub').should('be.calledOnce');
    });

    it('should be focusable and selectable with keyboard', () => {
        const onClickStub = cy.stub().as('onClickStub');

        cy.mount(<Tag type={TagType.SelectedWithFocus} label={TAG_LABEL} onClick={onClickStub} />);

        cy.window().focus();
        cy.get('body').realPress('Tab');
        cy.get(TAG_ID).should('be.focused');
        cy.get('body').type('{enter}');
        cy.get('@onClickStub').should('be.calledOnce');
    });
});
