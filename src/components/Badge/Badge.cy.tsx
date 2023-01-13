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

    it('renders with children', () => {
        cy.mount(<Badge>{BADGE_TEXT}</Badge>);

        cy.get(BADGE_ID).should('contain', BADGE_TEXT);
    });

    it('renders the status dot', () => {
        cy.mount(<Badge status={BadgeStatus.Positive}>{BADGE_TEXT}</Badge>);

        cy.get(BADGE_STATUS_ID).should('exist');
    });

    it('should render badge with icon', () => {
        cy.mount(<Badge icon={<IconDocumentText />}>{BADGE_TEXT}</Badge>);

        cy.get(BADGE_ICON_ID).find('svg').should('exist');
    });

    it('should render badge with icon and overwrite size', () => {
        cy.mount(<Badge icon={<IconDocumentText size={IconSize.Size8} />}>{BADGE_TEXT}</Badge>);

        cy.get(BADGE_ICON_ID).should('exist').and('have.css', 'width', '16px');
    });

    it('should render with small size', () => {
        cy.mount(<Badge size="small">{BADGE_TEXT}</Badge>);

        cy.get(BADGE_ID)
            .invoke('css', 'width')
            .then((str) => {
                expect(parseInt(String(str))).to.be.closeTo(62, 1);
            });

        cy.get(BADGE_ID)
            .invoke('css', 'height')
            .then((str) => {
                expect(parseInt(String(str))).to.be.closeTo(20, 1);
            });
    });

    // it('should render medium size', () => {
    //     cy.mount(<Badge size="medium">{BADGE_TEXT}</Badge>);

    //     cy.get(BADGE_ID)
    //         .invoke('css', 'width')
    //         .then((str) => {
    //             parseInt(String(str));
    //         })
    //         .should('be.closeTo', 66);

    //     cy.get(BADGE_ID)
    //         .invoke('css', 'height')
    //         .then((str) => {
    //             parseInt(String(str));
    //         })
    //         .should('be.closeTo', 24);
    // });

    // it('should render medium size by default', () => {
    //     cy.mount(<Badge>{BADGE_TEXT}</Badge>);

    //     cy.get(BADGE_ID).invoke('width').should('be.closeTo', 66);

    //     cy.get(BADGE_ID).invoke('height').should('be.closeTo', 24);
    // });

    // it('can be disabled', () => {
    //     cy.mount(<Badge disabled>{BADGE_TEXT}</Badge>);

    //     cy.get(BADGE_ID)
    //         .should('have.class', 'tw-bg-box-disabled')
    //         .should('have.class', 'tw-text-box-disabled-inverse');
    //     cy.get(BADGE_ICON_ID).should('have.css', 'opacity', '0.3');
    // });

    // it('should render with emphasis', () => {
    //     cy.mount(<Badge emphasis={BadgeEmphasis.Strong}>{BADGE_TEXT}</Badge>);

    //     cy.get(BADGE_ID)
    //         .should('have.class', 'tw-bg-box-neutral-strong')
    //         .should('have.class', 'tw-bg-box-neutral-strong-inverse');
    // });

    // it('should have emphasized positive style', () => {
    //     cy.mount(
    //         <Badge style={BadgeStyle.Positive} emphasis={BadgeEmphasis.Strong}>
    //             {BADGE_TEXT}
    //         </Badge>,
    //     );

    //     cy.get(BADGE_ID).should('have.class', 'tw-bg-box-positive-strong');
    // });

    // it('should have positive style', () => {
    //     cy.mount(<Badge style={BadgeStyle.Positive}>{BADGE_TEXT}</Badge>);

    //     cy.get(BADGE_ID).should('have.class', 'tw-bg-box-positive');
    // });

    // it('should have emphasized positive style', () => {
    //     cy.mount(
    //         <Badge style={BadgeStyle.Positive} emphasis={BadgeEmphasis.Strong}>
    //             {BADGE_TEXT}
    //         </Badge>,
    //     );

    //     cy.get(BADGE_ID).should('have.class', 'tw-bg-box-positive-strong');
    // });

    // it('should have progress style', () => {
    //     cy.mount(<Badge style={BadgeStyle.Progress}>{BADGE_TEXT}</Badge>);

    //     cy.get(BADGE_ID)
    //         .should('have.class', 'tw-bg-box-selected')
    //         .should('have.class', 'tw-text-box-selected-inverse');
    // });

    // it('should have emphasized progress style', () => {
    //     cy.mount(
    //         <Badge style={BadgeStyle.Progress} emphasis={BadgeEmphasis.Strong}>
    //             {BADGE_TEXT}
    //         </Badge>,
    //     );

    //     cy.get(BADGE_ID)
    //         .should('have.class', 'tw-bg-box-selected-strong')
    //         .should('have.class', 'tw-text-box-selected-strong-inverse');
    // });

    // it('should have primary style', () => {
    //     cy.mount(<Badge style={BadgeStyle.Primary}>{BADGE_TEXT}</Badge>);

    //     cy.get(BADGE_ID).should('have.class', 'tw-bg-box-neutral');
    // });

    // it('should have emphasized primary style', () => {
    //     cy.mount(
    //         <Badge style={BadgeStyle.Primary} emphasis={BadgeEmphasis.Strong}>
    //             {BADGE_TEXT}
    //         </Badge>,
    //     );

    //     cy.get(BADGE_ID)
    //         .should('have.class', 'tw-bg-box-neutral-strong')
    //         .should('have.class', 'tw-text-box-neutral-strong-inverse');
    // });

    // it('should have warning style', () => {
    //     cy.mount(<Badge style={BadgeStyle.Warning}>{BADGE_TEXT}</Badge>);

    //     cy.get(BADGE_ID).should('have.class', 'tw-bg-box-warning').should('have.class', 'tw-text-box-warning-inverse');
    // });

    // it('should have emphasized warning style', () => {
    //     cy.mount(
    //         <Badge style={BadgeStyle.Warning} emphasis={BadgeEmphasis.Strong}>
    //             {BADGE_TEXT}
    //         </Badge>,
    //     );

    //     cy.get(BADGE_ID)
    //         .should('have.class', 'tw-bg-box-warning-strong')
    //         .should('have.class', 'tw-text-box-warning-strong-inverse');
    // });

    // it('should have danger style', () => {
    //     cy.mount(<Badge style={BadgeStyle.Danger}>{BADGE_TEXT}</Badge>);

    //     cy.get(BADGE_ID)
    //         .should('have.class', 'tw-bg-box-negative')
    //         .should('have.class', 'tw-text-box-negative-inverse');
    // });

    // it('should have emphasized danger style', () => {
    //     cy.mount(
    //         <Badge style={BadgeStyle.Danger} emphasis={BadgeEmphasis.Strong}>
    //             {BADGE_TEXT}
    //         </Badge>,
    //     );

    //     cy.get(BADGE_ID)
    //         .should('have.class', 'tw-bg-box-negative-strong')
    //         .should('have.class', 'tw-text-box-negative-strong-inverse');
    // });

    // it('should have hover styles if onClick prop is a function', () => {
    //     const onClickStub = cy.stub();
    //     cy.mount(
    //         <Badge style={BadgeStyle.Danger} onClick={onClickStub}>
    //             {BADGE_TEXT}
    //         </Badge>,
    //     );

    //     cy.get(BADGE_ID).should('have.class', 'hover:tw-bg-box-negative-hover');
    //     cy.get(BADGE_ID).click();
    //     cy.wrap(onClickStub).should('have.been.calledOnce');
    // });

    // it('should call onDismiss', () => {
    //     const onDismissStub = cy.stub();
    //     cy.mount(<Badge onDismiss={onDismissStub}>{BADGE_TEXT}</Badge>);

    //     cy.get(BADGE_DISMISS).click();
    //     cy.wrap(onDismissStub).should('have.been.calledOnce');
    // });

    // it('should display custom status dot with color value', () => {
    //     const red = 30;
    //     const green = 40;
    //     const blue = 50;
    //     const alpha = 0.2;

    //     const DOT_COLOR = { red, green, blue, alpha };

    //     cy.mount(<Badge status={DOT_COLOR}>{BADGE_TEXT}</Badge>);

    //     cy.get(BADGE_STATUS_ID).should('have.css', 'backgroundColor', `rgba(${red}, ${green}, ${blue}, ${alpha})`);
    // });

    // it('should display custom status dot with string value', () => {
    //     const DOT_COLOR = 'rgba(0, 100, 200, 0.9)';

    //     cy.mount(<Badge status={DOT_COLOR}>{BADGE_TEXT}</Badge>);

    //     cy.get(BADGE_STATUS_ID).should('have.css', 'backgroundColor', DOT_COLOR);
    // });

    // it('should display all text on hover', () => {
    //     cy.mount(
    //         <Badge>
    //             <span>
    //                 {BADGE_TEXT}_1_
    //                 <span>
    //                     {BADGE_TEXT}_2_
    //                     <span>{BADGE_TEXT}</span>
    //                 </span>
    //             </span>
    //         </Badge>,
    //     );

    //     cy.get(BADGE_ID).invoke('attr', 'title').should('equal', `${BADGE_TEXT}_1_${BADGE_TEXT}_2_${BADGE_TEXT}`);
    // });
});
