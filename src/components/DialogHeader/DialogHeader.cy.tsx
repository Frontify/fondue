/* (c) Copyright Frontify Ltd., all rights reserved. */

import { DialogHeader } from './DialogHeader';
import { IconIcon } from '@foundation/Icon/Generated';
import { Badge, BadgeStyle } from '@components/Badge';

const DIALOG_HEADER_SELECTOR = '[data-test-id=fondue-dialog-header]';
const DIALOG_HEADER_TITLE = '[data-test-id=fondue-dialog-header-title]';
const DIALOG_HEADER_CLOSE = '[data-test-id=fondue-dialog-header-close]';
const DIALOG_HEADER_ICON = '[data-test-id=fondue-dialog-header-icon]';
const DIALOG_HEADER_BADGE = '[data-test-id=fondue-dialog-header-badge]';
describe('DialogHeader Component', () => {
    it('should render correctly', () => {
        cy.mount(<DialogHeader title="Hello" />);

        cy.get(DIALOG_HEADER_SELECTOR).should('exist');
        cy.get(DIALOG_HEADER_TITLE).should('contain.text', 'Hello');
        cy.get(DIALOG_HEADER_SELECTOR).should('have.class', 'tw-border-b tw-border-b-line');
    });

    it('should render in Medium size', () => {
        cy.mount(<DialogHeader title="Hello" />);
        cy.get(DIALOG_HEADER_SELECTOR).should('have.class', 'tw-p-6');
        cy.get(DIALOG_HEADER_TITLE).find('span').should('have.class', 'tw-text-body-medium');
    });

    it('should render in Small size', () => {
        cy.mount(<DialogHeader title="Hello" size="small" />);
        cy.get(DIALOG_HEADER_SELECTOR).should('have.class', 'tw-p-4');
        cy.get(DIALOG_HEADER_TITLE).find('span').should('have.class', 'tw-text-body-small');
    });

    it('should render in Large size', () => {
        cy.mount(<DialogHeader title="Hello" size="large" />);
        cy.get(DIALOG_HEADER_SELECTOR).should('have.class', 'tw-p-10');
        cy.get(DIALOG_HEADER_TITLE).find('span').should('have.class', 'tw-text-body-large');
    });

    it('should collapseBottom', () => {
        cy.mount(<DialogHeader title="Hello" collapseBottom />);

        cy.get(DIALOG_HEADER_SELECTOR).should('have.class', 'tw-pb-0 tw-border-none');
    });

    it('should render with an icon', () => {
        cy.mount(<DialogHeader title="Hello" icon={<IconIcon />} />);

        cy.get(DIALOG_HEADER_ICON).should('exist');
    });

    it('should render with a badge', () => {
        cy.mount(<DialogHeader title="Hello" badge={<Badge style={BadgeStyle.Positive}>Badge</Badge>} />);

        cy.get(DIALOG_HEADER_BADGE).should('exist');
    });

    it('should render a close button', () => {
        const onActionStub = cy.stub();
        cy.mount(<DialogHeader title="Hello" onClose={onActionStub} />);

        cy.get(DIALOG_HEADER_CLOSE).should('exist');
        cy.get(DIALOG_HEADER_CLOSE).click();
        cy.wrap(onActionStub).should('have.been.calledOnce');
    });

    it('should not render a close button if onClose is not defined', () => {
        cy.mount(<DialogHeader title="Hello" />);

        cy.get(DIALOG_HEADER_CLOSE).should('not.exist');
    });

    it('should access close button by keyboard', () => {
        const onActionStub = cy.stub();
        cy.mount(<DialogHeader title="Hello" onClose={onActionStub} />);

        cy.get(DIALOG_HEADER_CLOSE).should('exist');
        cy.get('body').realPress('Tab');
        cy.get('body').realPress('Enter');
        cy.wrap(onActionStub).should('have.been.calledOnce');
    });
});
