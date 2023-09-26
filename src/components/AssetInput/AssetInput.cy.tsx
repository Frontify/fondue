/* (c) Copyright Frontify Ltd., all rights reserved. */

import { assetInputActions } from './asset-input-actions';
import { AssetInput, AssetInputSize } from './AssetInput';
import { EXAMPLE_IMAGES, MIXED_ASSETS } from './example-assets';

const MULTI_ASSET_PREVIEW_ID = '[data-test-id=multi-asset-preview]';
const ASSETS_AMOUNT_ID = '[data-test-id=assets-amount]';
const NUMBER_OF_LOCATIONS_ID = '[data-test-id=number-of-locations]';
const ASSETS_IMAGE_ID = '[data-test-id=assets-image]';
const ASSET_PLACEHOLDER_ID = '[data-test-id=asset-input-placeholder]';
const ASSET_PLACEHOLDER_UPLOAD_ID = '[data-test-id=asset-input-upload]';
const ASSET_PLACEHOLDER_LIBRARY_ID = '[data-test-id=asset-input-library]';
const ASSET_SINGLE_INPUT_ID = '[data-test-id=asset-single-input]';
const ASSET_SINGLE_INPUT_THUMBNAIL_ID = '[data-test-id=asset-input-thumbnail]';
const ASSET_SINGLE_INPUT_THUMBNAIL_IMAGE_ID = '[data-test-id=asset-input-thumbnail-image]';
const ASSET_SINGLE_INPUT_THUMBNAIL_AUDIO_ID = '[data-test-id=asset-input-thumbnail-audio]';
const ASSET_SINGLE_INPUT_THUMBNAIL_ICON_WRAPPER_ID = '[data-test-id=asset-input-thumbnail-icon]';
const SPINNING_CIRCLE_ID = '[data-test-id=spinning-circle]';

describe('MultiAssetPreview Component', () => {
    it('renders empty asset input with placeholders', () => {
        const onLibraryClickStub = cy.stub().as('onLibraryClickStub');
        const onUploadClickStub = cy.stub().as('onUploadClickStub');
        cy.mount(
            <AssetInput
                size={AssetInputSize.Small}
                onLibraryClick={onLibraryClickStub}
                onUploadClick={onUploadClickStub}
            />,
        );

        cy.get(ASSET_PLACEHOLDER_ID).should('exist');
        cy.get('@onUploadClickStub').should('not.be.called');
        cy.get(ASSET_PLACEHOLDER_UPLOAD_ID).click();
        cy.get('input[type=file]').selectFile('cypress/fixtures/Hiking.jpg', { force: true });
        cy.get('@onUploadClickStub').should('be.calledOnce');
        cy.get('@onLibraryClickStub').should('not.be.called');
        cy.get(ASSET_PLACEHOLDER_LIBRARY_ID).click();
        cy.get('@onLibraryClickStub').should('be.calledOnce');
    });

    it('renders asset input with single image', () => {
        cy.mount(<AssetInput size={AssetInputSize.Small} assets={[EXAMPLE_IMAGES[0]]} actions={assetInputActions} />);

        cy.get(ASSET_SINGLE_INPUT_ID).should('contain', '2000');
        cy.get(ASSET_SINGLE_INPUT_ID).should('contain', 'Upload');
        cy.get(ASSET_SINGLE_INPUT_ID).should('contain', 'JPG');
        cy.get(ASSET_SINGLE_INPUT_THUMBNAIL_ID).should('have.class', 'tw-bg-black-5');
        cy.get(ASSET_SINGLE_INPUT_THUMBNAIL_IMAGE_ID).should('have.attr', 'src', 'https://picsum.photos/100/150');
    });

    it('does not render size and extension if they are hidden', () => {
        cy.mount(
            <AssetInput
                size={AssetInputSize.Small}
                assets={[EXAMPLE_IMAGES[0]]}
                actions={assetInputActions}
                hideSize={true}
                hideExtension={true}
            />,
        );

        cy.get(ASSET_SINGLE_INPUT_ID).should('contain', 'Upload');
        cy.get(ASSET_SINGLE_INPUT_ID).should('not.contain', '2000');
        cy.get(ASSET_SINGLE_INPUT_ID).should('not.contain', 'JPG');
        cy.get(ASSET_SINGLE_INPUT_THUMBNAIL_ID).should('have.class', 'tw-bg-black-5');
        cy.get(ASSET_SINGLE_INPUT_THUMBNAIL_IMAGE_ID).should('have.attr', 'src', 'https://picsum.photos/100/150');
    });

    it('renders asset input with audio', () => {
        cy.mount(<AssetInput size={AssetInputSize.Small} assets={[MIXED_ASSETS[3]]} actions={assetInputActions} />);

        cy.get(ASSET_SINGLE_INPUT_THUMBNAIL_AUDIO_ID);
        cy.get(ASSET_SINGLE_INPUT_ID).should('contain', 'Foobar');
        cy.get(ASSET_SINGLE_INPUT_ID).should('contain', 'MP3');
    });

    it('renders with three image assets', () => {
        const onMultiAssetClick = cy.stub().as('onMultiAssetClick');
        cy.mount(
            <AssetInput
                onMultiAssetClick={onMultiAssetClick}
                numberOfLocations={12}
                assets={EXAMPLE_IMAGES.slice(0, 3)}
                size={AssetInputSize.Small}
            />,
        );

        cy.get(ASSETS_IMAGE_ID)
            .first()
            .should('have.attr', 'style')
            .and('include', 'background-image: url("https://picsum.photos/100/150")');
        cy.get(ASSETS_AMOUNT_ID).should('contain', '3');
        cy.get(ASSETS_IMAGE_ID).last().should('have.class', 'tw-bg-black-5');
        cy.get('@onMultiAssetClick').should('not.be.called');
        cy.get(MULTI_ASSET_PREVIEW_ID).click();
        cy.get('@onMultiAssetClick').should('be.calledOnce');
    });

    it('renders mixed assets', () => {
        const onMultiAssetClick = cy.stub().as('onMultiAssetClick');
        cy.mount(
            <AssetInput
                assets={MIXED_ASSETS}
                onMultiAssetClick={onMultiAssetClick}
                size={AssetInputSize.Small}
                numberOfLocations={2}
            />,
        );

        cy.get(ASSETS_AMOUNT_ID).should('contain', '5');
        cy.get(NUMBER_OF_LOCATIONS_ID).should('contain', '2');
        cy.get(ASSETS_IMAGE_ID).should('exist');
        cy.get(ASSET_SINGLE_INPUT_THUMBNAIL_AUDIO_ID).should('exist');
        cy.get(ASSET_SINGLE_INPUT_THUMBNAIL_ICON_WRAPPER_ID).should('exist').find('svg').should('exist');
    });

    it('displays loading animation', () => {
        cy.mount(<AssetInput size={AssetInputSize.Small} isLoading={true} />);

        cy.get(ASSET_SINGLE_INPUT_ID).should('contain', 'Uploading').and('contain', 'Your Asset');
        cy.get(SPINNING_CIRCLE_ID).should('exist');
    });
});
