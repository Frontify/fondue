/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useRef, useState } from 'react';

import { Box } from '@components/Box/Box';
import { Button } from '@components/Button/Button';
import { ButtonEmphasis } from '@components/Button/ButtonTypes';
import { DialogBody } from '@components/DialogBody/DialogBody';
import { Dropdown } from '@components/Dropdown/Dropdown';
import IconDotsVertical16 from '@foundation/Icon/Generated/IconDotsVertical16';

import { Modality } from '../../types/dialog';

import { InlineDialog, type InlineDialogProps } from './InlineDialog';

const INLINE_DIALOG_TRIGGER_SELECTOR = '[data-test-id=fondue-inlineDialog-trigger]';
const INLINE_DIALOG_SELECTOR = '[data-test-id=fondue-inlineDialog-content]';
const OUTSIDE_DIALOG_BUTTON = '[data-test-id=outside-button]';
const INLINE_DIALOG_UNDERLAY = '[data-test-id=fondue-inlineDialog-underlay]';
const INLINE_DIALOG_CONTENT = '[data-test-id=fondue-inlineDialog-content]';

const InlineDialogComponent = (props: Omit<InlineDialogProps, 'open' | 'anchor' | 'handleClose'>) => {
    const [isOpen, setIsOpen] = useState(false);
    const triggerRef = useRef<HTMLButtonElement | null>(null);

    return (
        <>
            <Button
                ref={triggerRef}
                emphasis={ButtonEmphasis.Default}
                icon={<IconDotsVertical16 />}
                onClick={() => setIsOpen(!isOpen)}
                data-test-id="fondue-inlineDialog-trigger"
            ></Button>
            <InlineDialog anchor={triggerRef} open={isOpen} handleClose={() => setIsOpen(false)} {...props}>
                <DialogBody>
                    <Box className="tw-p-4">
                        <Dropdown
                            onChange={(id) => console.log(id)}
                            activeItemId={'1'}
                            menuBlocks={[
                                {
                                    id: 'block1',
                                    menuItems: [
                                        { id: '1', title: 'Item 1' },
                                        { id: '2', title: 'Item 2' },
                                        { id: '3', title: 'Item 3' },
                                        { id: '4', title: 'Item 4' },
                                        { id: '5', title: 'Item 5' },
                                    ],
                                },
                            ]}
                        />
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus accusantium amet beatae
                            consequatur corporis culpa debitis dicta ducimus esse, exercitationem fugiat laudantium
                            magnam, molestiae nam obcaecati quibusdam tempore vel velit!
                        </p>
                        <Button onClick={() => setIsOpen(!isOpen)}>Close</Button>
                    </Box>
                </DialogBody>
            </InlineDialog>
        </>
    );
};
describe('InlineDialog Component', () => {
    describe('Overlay Positioning', () => {
        it('should open and render correctly with a trigger', () => {
            cy.mount(<InlineDialogComponent />);
            cy.get(INLINE_DIALOG_TRIGGER_SELECTOR).should('exist');
            cy.get(INLINE_DIALOG_TRIGGER_SELECTOR).children().eq(0).click();
            cy.get(INLINE_DIALOG_SELECTOR).should('exist');
        });

        it('should render with Top placement', () => {
            cy.mount(<InlineDialogComponent placement="top" />);
            cy.get(INLINE_DIALOG_TRIGGER_SELECTOR).children().eq(0).click();
            cy.get(INLINE_DIALOG_SELECTOR).parent().should('have.attr', 'data-popper-placement', 'top');
        });

        it('should render with start alignment', () => {
            cy.mount(<InlineDialogComponent placement="bottom-start" />);
            cy.get(INLINE_DIALOG_TRIGGER_SELECTOR).children().eq(0).click();
            cy.get(INLINE_DIALOG_SELECTOR).parent().should('have.attr', 'data-popper-placement', 'bottom-start');
        });

        it('should render with middle alignment', () => {
            cy.mount(<InlineDialogComponent placement="bottom" />);
            cy.get(INLINE_DIALOG_TRIGGER_SELECTOR).children().eq(0).click();
            cy.get(INLINE_DIALOG_SELECTOR).parent().should('have.attr', 'data-popper-placement', 'bottom');
        });

        it('should render with end alignment', () => {
            cy.mount(<InlineDialogComponent placement="bottom-end" />);
            cy.get(INLINE_DIALOG_TRIGGER_SELECTOR).children().eq(0).click();
            cy.get(INLINE_DIALOG_SELECTOR).parent().should('have.attr', 'data-popper-placement', 'bottom-end');
        });

        it('should render with Right placement', () => {
            cy.mount(<InlineDialogComponent placement="right" />);
            cy.get(INLINE_DIALOG_TRIGGER_SELECTOR).children().eq(0).click();
            cy.get(INLINE_DIALOG_SELECTOR).parent().should('have.attr', 'data-popper-placement', 'right');
        });

        it('should flip if enabled', () => {
            cy.mount(<InlineDialogComponent placement="top" flip />);
            cy.get(INLINE_DIALOG_TRIGGER_SELECTOR).children().eq(0).click();
            cy.get(INLINE_DIALOG_SELECTOR).parent().should('have.attr', 'data-popper-placement', 'bottom');
        });

        it('should not flip if disabled', () => {
            cy.mount(<InlineDialogComponent placement="top" flip={false} />);
            cy.get(INLINE_DIALOG_TRIGGER_SELECTOR).children().eq(0).click();
            cy.get(INLINE_DIALOG_SELECTOR).parent().should('have.attr', 'data-popper-placement', 'top');
        });
    });

    describe('Modality', () => {
        it('should act as non-modal', () => {
            cy.mount(<InlineDialogComponent modality={Modality.NonModal} />);
            cy.get(INLINE_DIALOG_TRIGGER_SELECTOR).children().eq(0).click();
            cy.get('body').should('have.css', 'pointer-events', 'auto');
            cy.get('body').click(0, 0);
            cy.get(INLINE_DIALOG_SELECTOR).should('not.exist');
            cy.get(INLINE_DIALOG_TRIGGER_SELECTOR).children().eq(0).click();
            cy.get(INLINE_DIALOG_SELECTOR).should('exist');
        });
        it('should act as non-modal with Keyboard navigation', () => {
            const onClickStub = cy.stub().as('onClickStub');
            // TODO: Part of focus management project, test with portal on -> focus sequence is broken
            cy.mount(
                <div>
                    <InlineDialogComponent modality={Modality.NonModal} enablePortal={false} />
                    <div className="tw-mt-32">
                        <Button data-test-id="outside-button" onClick={onClickStub}>
                            Hello
                        </Button>
                    </div>
                </div>,
            );
            cy.get('body').realPress('Tab');
            cy.get(INLINE_DIALOG_TRIGGER_SELECTOR).realPress('Enter');
            cy.get(INLINE_DIALOG_SELECTOR).should('exist');
            cy.get(INLINE_DIALOG_SELECTOR).realPress('Tab');
            cy.get(INLINE_DIALOG_SELECTOR).realPress('Tab');
            cy.get(INLINE_DIALOG_SELECTOR).realPress('Tab');
            cy.get(OUTSIDE_DIALOG_BUTTON).should('be.focused');
            cy.get(OUTSIDE_DIALOG_BUTTON).realPress('Enter');
            cy.get('@onClickStub').should('be.calledOnce');
            cy.get(INLINE_DIALOG_SELECTOR).should('exist');
            cy.get('body').realPress('Escape');
            cy.get(INLINE_DIALOG_SELECTOR).should('not.exist');
        });

        it('should act as modal per default', () => {
            cy.mount(<InlineDialogComponent />);
            cy.get(INLINE_DIALOG_TRIGGER_SELECTOR).children().eq(0).click();
            cy.get('body').should('have.css', 'pointer-events', 'none');
            cy.get(INLINE_DIALOG_TRIGGER_SELECTOR).parent().click({ force: true });
            cy.get(INLINE_DIALOG_SELECTOR).should('not.exist');
            cy.get('body').should('have.css', 'pointer-events', 'auto');
            cy.get(INLINE_DIALOG_TRIGGER_SELECTOR).children().eq(0).click();
            cy.get(INLINE_DIALOG_SELECTOR).should('exist');
        });

        it('should act as modal with Keyboard navigation', () => {
            const onClickStub = cy.stub().as('onClickStub');
            cy.mount(
                <div>
                    <InlineDialogComponent modality={Modality.Modal} enablePortal={false} />
                    <div className="tw-mt-32">
                        <Button data-test-id="outside-button" onClick={onClickStub}>
                            Hello
                        </Button>
                    </div>
                </div>,
            );
            cy.get('body').realPress('Tab');
            cy.get(INLINE_DIALOG_TRIGGER_SELECTOR).realPress('Enter');
            cy.get(INLINE_DIALOG_SELECTOR).should('exist');
            cy.get('body').realPress('Tab');
            cy.get(INLINE_DIALOG_SELECTOR).realPress('Tab');
            cy.get(INLINE_DIALOG_SELECTOR).find('[data-test-id=button]').should('be.focused');
            cy.get(INLINE_DIALOG_SELECTOR).realPress('Tab');
            cy.get(INLINE_DIALOG_SELECTOR).realPress('Tab');
            cy.get(INLINE_DIALOG_SELECTOR).find('[data-test-id=button]').should('be.focused');
            cy.get(OUTSIDE_DIALOG_BUTTON).should('not.be.focused');
            cy.get('body').realPress('Escape');
            cy.get(INLINE_DIALOG_SELECTOR).should('not.exist');
        });

        it('should act as blocking-modal', () => {
            cy.mount(<InlineDialogComponent modality={Modality.BlockingModal} />);
            cy.get(INLINE_DIALOG_TRIGGER_SELECTOR).children().eq(0).click();
            cy.get(INLINE_DIALOG_TRIGGER_SELECTOR).parent().click({ force: true });
            cy.get(INLINE_DIALOG_SELECTOR).should('exist');
        });

        it('should act as blocking-modal with Keyboard navigation and block outside interaction', () => {
            const onClickStub = cy.stub().as('onClickStub');
            cy.mount(
                <div>
                    <InlineDialogComponent modality={Modality.BlockingModal} enablePortal={false} />
                    <div className="tw-mt-32">
                        <Button data-test-id="outside-button" onClick={onClickStub}>
                            Hello
                        </Button>
                    </div>
                </div>,
            );
            cy.get('body').realPress('Tab');
            cy.get(INLINE_DIALOG_TRIGGER_SELECTOR).realPress('Enter');
            cy.get(INLINE_DIALOG_SELECTOR).should('exist');
            cy.get('body').realPress('Tab');
            cy.get(INLINE_DIALOG_SELECTOR).realPress('Tab');
            cy.get(INLINE_DIALOG_SELECTOR).find('[data-test-id=button]').should('be.focused');
            cy.get(INLINE_DIALOG_SELECTOR).realPress('Tab');
            cy.get(INLINE_DIALOG_SELECTOR).realPress('Tab');
            cy.get(INLINE_DIALOG_SELECTOR).find('[data-test-id=button]').should('be.focused');
            cy.get(OUTSIDE_DIALOG_BUTTON).should('not.be.focused');
            cy.get('body').realPress('Escape');
            cy.get(INLINE_DIALOG_SELECTOR).should('exist');
            cy.get('body').should('have.css', 'pointer-events', 'none');
        });
    });
    describe('Dimensions', () => {
        it('renders with minHeight', () => {
            cy.mount(<InlineDialogComponent minHeight={300} />);
            cy.get(INLINE_DIALOG_TRIGGER_SELECTOR).children().eq(0).click();
            cy.get(INLINE_DIALOG_SELECTOR).should('have.css', 'min-height', '300px');
        });

        it('renders with maxHeight', () => {
            cy.mount(<InlineDialogComponent maxHeight={50} />);
            cy.get(INLINE_DIALOG_TRIGGER_SELECTOR).children().eq(0).click();
            cy.get(INLINE_DIALOG_SELECTOR).should('have.css', 'max-height', '50px');
        });

        it('renders with minWidth', () => {
            cy.mount(<InlineDialogComponent minWidth={250} />);
            cy.get(INLINE_DIALOG_TRIGGER_SELECTOR).children().eq(0).click();
            cy.get(INLINE_DIALOG_SELECTOR).should('have.css', 'min-width', '250px');
        });

        it('renders with maxWidth', () => {
            cy.mount(<InlineDialogComponent minWidth={70} />);
            cy.get(INLINE_DIALOG_TRIGGER_SELECTOR).children().eq(0).click();
            cy.get(INLINE_DIALOG_SELECTOR).should('have.css', 'min-width', '70px');
        });

        it('renders with autoHeight and overwrites maxHeight', () => {
            cy.mount(<InlineDialogComponent autoHeight maxHeight={100} />);
            cy.get(INLINE_DIALOG_TRIGGER_SELECTOR).children().eq(0).click();
            cy.viewport(550, 150);
            cy.get(INLINE_DIALOG_SELECTOR).should('have.css', 'height', '130px');
        });
    });

    describe('Styling', () => {
        it('renders with rounded corners by default', () => {
            cy.mount(<InlineDialogComponent />);
            cy.get(INLINE_DIALOG_TRIGGER_SELECTOR).children().eq(0).click();
            cy.get(INLINE_DIALOG_SELECTOR).should('have.css', 'border-radius', '4px');
        });

        it('should render without rounded corners', () => {
            cy.mount(<InlineDialogComponent roundedCorners={false} />);
            cy.get(INLINE_DIALOG_TRIGGER_SELECTOR).children().eq(0).click();
            cy.get(INLINE_DIALOG_SELECTOR).should('have.css', 'border-radius', '0px');
        });

        it('should be responsive', () => {
            cy.mount(<InlineDialogComponent />);
            cy.viewport(700, 900);
            cy.get(INLINE_DIALOG_TRIGGER_SELECTOR).children().eq(0).click();
            cy.get(INLINE_DIALOG_SELECTOR).should('have.css', 'min-width', '360px'); // 360px default on larger screen
            cy.viewport(360, 745);
            cy.get(INLINE_DIALOG_SELECTOR).should('have.css', 'min-width', '324px'); // 90vw on mobile view.
            cy.viewport(1200, 900);
            cy.get(INLINE_DIALOG_SELECTOR).should('have.css', 'min-width', '360px'); // 360px default on larger screen
        });

        it('should render with darkUnderlay on mobile view', () => {
            cy.mount(<InlineDialogComponent />);
            cy.viewport(360, 745);
            cy.get(INLINE_DIALOG_TRIGGER_SELECTOR).children().eq(0).click();
            cy.get(INLINE_DIALOG_UNDERLAY).should('exist');
        });
    });

    describe('Unsafe zIndex', () => {
        it('renders with Unsafe custom zIndex', () => {
            cy.mount(<InlineDialogComponent unsafe_zIndex={2004} />);
            cy.get(INLINE_DIALOG_TRIGGER_SELECTOR).children().eq(0).click();
            cy.get(INLINE_DIALOG_CONTENT).parent().should('have.css', 'z-index', '2004');
        });
    });
});
