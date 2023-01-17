/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconDocumentText } from '@foundation/Icon';
import { IconSize } from '@foundation/Icon/IconSize';
import React from 'react';
import { BadgeStyle } from '.';
import { Badge } from './Badge';
import { BadgeEmphasis, BadgeStatus } from './types';

const BADGE_TEXT = 'Frontify';
const BADGE_ID = '[data-test-id=badge]';
const BADGE_STATUS_ID = '[data-test-id=badge-status]';
const BADGE_ICON_ID = '[data-test-id=badge-icon]';
const BADGE_DISMISS = '[data-test-id=badge-dismiss]';

describe('Badge component', () => {
    it('renders', () => {
        cy.mount(<Badge>{BADGE_TEXT}</Badge>);

        cy.get(BADGE_ID).should('exist');
        cy.get(BADGE_STATUS_ID).should('not.exist');
        cy.get(BADGE_ICON_ID).should('not.exist');
        cy.get(BADGE_ID).contains(BADGE_TEXT);
    });

    it('renders the status dot', () => {
        cy.mount(<Badge status={BadgeStatus.Positive}>{BADGE_TEXT}</Badge>);

        cy.get(BADGE_STATUS_ID).should('exist');
    });

    it('should render badge with icon and overwrite size', () => {
        cy.mount(<Badge icon={<IconDocumentText size={IconSize.Size8} />}>{BADGE_TEXT}</Badge>);

        cy.get(BADGE_ICON_ID).should('exist').and('have.css', 'width', '16px');
    });

    it('should be a small circle', () => {
        cy.mount(<Badge status={BadgeStatus.Danger} size="small" />);

        cy.get(BADGE_ID).should('have.css', 'width', '20px').and('have.css', 'height', '20px');
    });

    it('should be a big circle', () => {
        cy.mount(<Badge icon={<IconDocumentText />} />);

        cy.get(BADGE_ID).should('have.css', 'width', '24px').and('have.css', 'height', '24px');
    });

    it('should have disabled style', () => {
        cy.mount(
            <Badge icon={<IconDocumentText />} style={BadgeStyle.Danger} disabled>
                {BADGE_TEXT}
            </Badge>,
        );

        cy.get(BADGE_ID).should('have.class', 'tw-bg-box-disabled');
        cy.get(BADGE_ICON_ID).should('have.css', 'opacity', '0.3');
    });

    it('should have emphasised style', () => {
        cy.mount(
            <Badge icon={<IconDocumentText />} style={BadgeStyle.Positive} emphasis={BadgeEmphasis.Strong}>
                {BADGE_TEXT}
            </Badge>,
        );

        cy.get(BADGE_ID).should('have.class', 'tw-bg-box-positive-strong');
    });

    it('should have hover styles if onClick prop is a function', () => {
        const onClickStub = cy.stub();
        cy.mount(
            <Badge icon={<IconDocumentText />} style={BadgeStyle.Danger} onClick={onClickStub}>
                {BADGE_TEXT}
            </Badge>,
        );

        cy.get(BADGE_ID).should('have.class', 'hover:tw-bg-box-negative-hover');
        cy.get(BADGE_ID).click();
        cy.wrap(onClickStub).should('have.been.calledOnce');
    });

    it.only('should call onDismiss', () => {
        const onDismissStub = cy.stub();
        cy.mount(
            <Badge icon={<IconDocumentText />} onDismiss={onDismissStub}>
                {BADGE_TEXT}
            </Badge>,
        );

        cy.get(BADGE_DISMISS).click();
        cy.wrap(onDismissStub).should('have.been.calledOnce');
    });

    it('should display custom status dot with Color value', () => {
        const red = 30;
        const green = 40;
        const blue = 50;
        const alpha = 0.2;

        const DOT_COLOR = { red, green, blue, alpha };

        cy.mount(
            <Badge icon={<IconDocumentText />} status={DOT_COLOR}>
                {BADGE_TEXT}
            </Badge>,
        );

        cy.get(BADGE_STATUS_ID).should('have.css', 'backgroundColor', `rgba(${red}, ${green}, ${blue}, ${alpha})`);
    });

    it('should display custom status dot with string value', () => {
        const DOT_COLOR = 'rgba(0, 100, 200, 0.9)';

        cy.mount(
            <Badge icon={<IconDocumentText />} status={DOT_COLOR}>
                {BADGE_TEXT}
            </Badge>,
        );

        cy.get(BADGE_STATUS_ID).should('have.css', 'backgroundColor', DOT_COLOR);
    });

    it('should display all text on hover', () => {
        cy.mount(
            <Badge icon={<IconDocumentText />}>
                <span>
                    {BADGE_TEXT}_1_
                    <span>
                        {BADGE_TEXT}_2_
                        <span>{BADGE_TEXT}</span>
                    </span>
                </span>
            </Badge>,
        );

        cy.get(BADGE_ID).invoke('attr', 'title').should('equal', `${BADGE_TEXT}_1_${BADGE_TEXT}_2_${BADGE_TEXT}`);
    });
});
