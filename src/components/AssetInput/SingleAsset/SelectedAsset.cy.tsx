/* (c) Copyright Frontify Ltd., all rights reserved. */

import { assetInputActions } from '../asset-input-actions';
import { AssetInputSize } from '../AssetInput';
import { EXAMPLE_IMAGES } from '../example-assets';
import { SelectedAsset } from './SelectedAsset';

const SELECTED_ASSET_ID = '[data-test-id=asset-single-input]';
const SELECTED_ASSET_FLYOUT_ID = '[data-test-id=asset-single-input-flyout]';
const MENU_ITEM_ID = '[data-test-id=menu-item]';

describe('SelectedAsset Component', () => {
    it('renders selected asset without crashing', () => {
        cy.mount(
            <SelectedAsset
                isLoading={false}
                asset={EXAMPLE_IMAGES[0]}
                size={AssetInputSize.Small}
                actions={assetInputActions}
            />,
        );
        cy.get(SELECTED_ASSET_ID).should('exist');
        cy.get(SELECTED_ASSET_ID).should('contain', 'Upload');
        cy.get(SELECTED_ASSET_ID).should('contain', '2000');
        cy.get(SELECTED_ASSET_ID).should('contain', 'JPG');
    });

    it('does not render size and extension if they are hidden', () => {
        cy.mount(
            <SelectedAsset
                isLoading={false}
                asset={EXAMPLE_IMAGES[0]}
                size={AssetInputSize.Small}
                actions={assetInputActions}
                hideSize={true}
                hideExtension={true}
            />,
        );
        cy.get(SELECTED_ASSET_ID).should('exist');
        cy.get(SELECTED_ASSET_ID).should('contain', 'Upload');
        cy.get(SELECTED_ASSET_ID).should('not.contain', '2000');
        cy.get(SELECTED_ASSET_ID).should('not.contain', 'JPG');
    });

    it('calculates the appropriate width for the flyout on resize', () => {
        cy.mount(
            <div style={{ width: 0 }} id="resize-container">
                <SelectedAsset
                    isLoading={false}
                    asset={EXAMPLE_IMAGES[0]}
                    size={AssetInputSize.Small}
                    actions={assetInputActions}
                />
            </div>,
        );
        cy.get('#resize-container').then(($container) => {
            $container.css('width', 500);
        });
        cy.get(SELECTED_ASSET_ID).click();
        cy.get(SELECTED_ASSET_FLYOUT_ID).invoke('width').should('eq', 500);
        cy.get('#resize-container').then(($container) => {
            $container.css('width', 300);
        });
        cy.get(SELECTED_ASSET_FLYOUT_ID).invoke('width').should('eq', 300);
    });

    it('closes on select', () => {
        cy.mount(
            <SelectedAsset
                isLoading={false}
                asset={EXAMPLE_IMAGES[0]}
                size={AssetInputSize.Small}
                actions={assetInputActions}
            />,
        );
        cy.get(SELECTED_ASSET_ID).click();

        cy.get(MENU_ITEM_ID).first().click();
        cy.get(MENU_ITEM_ID).should('not.exist');
    });
});
