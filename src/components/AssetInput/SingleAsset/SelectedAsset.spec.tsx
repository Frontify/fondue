/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from '@cypress/react';
import React from 'react';
import { assetInputActions } from '../asset-input-actions';
import { AssetInputSize } from '../AssetInput';
import { EXAMPLE_IMAGES } from '../example-assets';
import { SelectedAsset } from './SelectedAsset';

const SELECTED_ASSET_ID = '[data-test-id=asset-single-input]';
const SELECTED_ASSET_FLYOUT_ID = '[data-test-id=asset-single-input-flyout]';

describe('SelectedAsset Component', () => {
    it('renders selected asset without crashing', () => {
        mount(
            <SelectedAsset
                isLoading={false}
                asset={EXAMPLE_IMAGES[0]}
                size={AssetInputSize.Small}
                actions={assetInputActions}
            />,
        );
        cy.get(SELECTED_ASSET_ID).should('exist');
    });

    it('calculates the appropriate width for the flyout on resize', () => {
        mount(
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
});
