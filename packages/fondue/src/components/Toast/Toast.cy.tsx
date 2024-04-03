/* (c) Copyright Frontify Ltd., all rights reserved. */

import IconLinkBox24 from '@foundation/Icon/Generated/IconLinkBox24';

import { Button } from '../Button';

import { Toast } from './Toast';
import { ToastStyle, toastStylesBackgroundColorsMap } from './types';

const TOAST_ID = '[data-test-id=toast]';

describe('Toast Rendering', () => {
    it('should render toast', () => {
        cy.mount(<Toast isOpen={true} style={ToastStyle.Loud} icon={<IconLinkBox24 />} />);
        cy.get(TOAST_ID).should('exist');
    });

    it('should not render toast', () => {
        cy.mount(<Toast isOpen={false} style={ToastStyle.Loud} icon={<IconLinkBox24 />} />);
        cy.get(TOAST_ID).should('not.exist');
    });

    it('should render toast with correct children', () => {
        cy.mount(
            <Toast isOpen={true} style={ToastStyle.Loud} icon={<IconLinkBox24 />}>
                Toast
            </Toast>,
        );
        cy.get(TOAST_ID).should('contain', 'Toast');
    });

    it('should render toast with correct icon', () => {
        cy.mount(<Toast isOpen={true} style={ToastStyle.Loud} icon={<IconLinkBox24 />} />);
        cy.get(TOAST_ID)
            .find('svg')
            .should(($svg) => {
                expect($svg).to.have.attr('name', 'IconLinkBox24');
            });
    });

    it('should render toast with the correct background color', () => {
        const style = ToastStyle.Loud;
        cy.mount(<Toast isOpen={true} style={style} icon={<IconLinkBox24 />} />);
        cy.get(TOAST_ID)
            .children()
            .first()
            .children()
            .first()
            .should('have.class', toastStylesBackgroundColorsMap[style]);
    });

    it('should render a dark themed version of the toast', () => {
        const style = ToastStyle.Loud;
        cy.mount(<Toast isOpen={true} theme="dark" style={style} icon={<IconLinkBox24 />} />);
        cy.get(TOAST_ID).should('have.class', 'tw-bg-box-neutral-mighty');
    });

    it('should be able to use the keyboard for navigation within the toast', () => {
        const onClickStub = cy.stub();
        cy.mount(
            <Toast isOpen={true} style={ToastStyle.Loud} icon={<IconLinkBox24 />}>
                <Button onClick={onClickStub}>I am focusable</Button>
            </Toast>,
        );
        cy.window().focus();
        cy.get('body').realPress('Tab');
        cy.get('button').should('have.focus');
        cy.get('button').type('{enter}');
        cy.wrap(onClickStub).should('have.been.calledOnce');
    });
});
