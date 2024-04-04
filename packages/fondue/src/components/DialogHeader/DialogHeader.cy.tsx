/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Badge, BadgeStyle } from '@components/Badge';
import IconIcon from '@foundation/Icon/Generated/IconIcon';

import { DialogHeader } from './DialogHeader';

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

    it('should render in Comfortable size', () => {
        cy.mount(<DialogHeader title="Hello" padding="comfortable" />);
        cy.get(DIALOG_HEADER_SELECTOR).should('have.class', 'tw-p-6');
        cy.get(DIALOG_HEADER_TITLE).find('p').should('have.class', 'tw-text-heading-x-large');
    });

    it('should render in Compact size', () => {
        cy.mount(<DialogHeader title="Hello" padding="compact" />);
        cy.get(DIALOG_HEADER_SELECTOR).should('have.class', 'tw-p-4');
        cy.get(DIALOG_HEADER_TITLE).find('p').should('have.class', 'tw-text-heading-large');
    });

    it('should render in Spacious size', () => {
        cy.mount(<DialogHeader title="Hello" padding="spacious" />);
        cy.get(DIALOG_HEADER_SELECTOR).should('have.class', 'tw-p-10');
        cy.get(DIALOG_HEADER_TITLE).find('p').should('have.class', 'tw-text-heading-xx-large');
    });

    it('should render without separator and padding at the bottom', () => {
        cy.mount(<DialogHeader title="Hello" separator={false} />);

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
