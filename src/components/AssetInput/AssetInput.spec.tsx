/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from "@cypress/react";
import React from "react";
import { assetInputActions } from "./asset-input-actions";
import { AssetInput, AssetInputSize } from "./AssetInput";
import { EXAMPLE_IMAGES, MIXED_ASSETS } from "./example-assets";

const MULTI_ASSET_PREVIEW_ID = "[data-test-id=multi-asset-preview]";
const ASSETS_AMOUNT_ID = "[data-test-id=assets-amount]";
const NUMBER_OF_LOCATIONS_ID = "[data-test-id=number-of-locations]";
const ASSETS_IMAGE_ID = "[data-test-id=assets-image]";
const ASSET_PLACEHOLDER_ID = "[data-test-id=asset-input-placeholder]";
const ASSET_PLACEHOLDER_UPLOAD_ID = "[data-test-id=asset-input-upload]";
const ASSET_PLACEHOLDER_LIBRARY_ID = "[data-test-id=asset-input-library]";
const ASSET_SINGLE_INPUT_ID = "[data-test-id=asset-single-input]";
const ASSET_SINGLE_INPUT_THUMBNAIL_ID = "[data-test-id=asset-input-thumbnail]";
const ASSET_SINGLE_INPUT_THUMBNAIL_IMAGE_ID = "[data-test-id=asset-input-thumbnail-image]";
const ASSET_SINGLE_INPUT_THUMBNAIL_AUDIO_ID = "[data-test-id=asset-input-thumbnail-audio]";

describe("MultiAssetPreview Component", () => {
    it("renders asset input placeholders", () => {
        mount(
            <AssetInput
                size={AssetInputSize.Small}
                onLibraryClick={() => alert("Library clicked")}
                onUploadClick={() => alert("Upload clicked")}
            />,
        );

        cy.get(ASSET_PLACEHOLDER_ID).should("exist");
        cy.get(ASSET_PLACEHOLDER_UPLOAD_ID).should("exist");
        cy.get(ASSET_PLACEHOLDER_LIBRARY_ID).should("exist");
    });

    it("renders asset input with single image", () => {
        mount(<AssetInput size={AssetInputSize.Small} assets={[EXAMPLE_IMAGES[0]]} actions={assetInputActions} />);

        cy.get(ASSET_SINGLE_INPUT_ID).should("contain", "2000");
        cy.get(ASSET_SINGLE_INPUT_ID).should("contain", "Upload");
        cy.get(ASSET_SINGLE_INPUT_ID).should("contain", "JPG");
        cy.get(ASSET_SINGLE_INPUT_THUMBNAIL_ID).should("have.css", "backgroundColor", "rgb(247, 247, 247)");
        cy.get(ASSET_SINGLE_INPUT_THUMBNAIL_IMAGE_ID).should("have.attr", "src", "https://picsum.photos/100/150");
    });

    it("renders asset input with audio", () => {
        mount(<AssetInput size={AssetInputSize.Small} assets={[MIXED_ASSETS[3]]} actions={assetInputActions} />);

        cy.get(ASSET_SINGLE_INPUT_THUMBNAIL_AUDIO_ID);
        cy.get(ASSET_SINGLE_INPUT_ID).should("contain", "Foobar");
        cy.get(ASSET_SINGLE_INPUT_ID).should("contain", "MP3");
    });

    it("renders with three images", () => {
        mount(
            <AssetInput
                onMultiAssetClick={() => alert("Multi Asset clicked")}
                numberOfLocations={12}
                assets={EXAMPLE_IMAGES.slice(0, 3)}
                size={AssetInputSize.Small}
                actions={[]}
            />,
        );
        cy.get(MULTI_ASSET_PREVIEW_ID);
        cy.get(ASSETS_IMAGE_ID).first().should("have.attr", "style").and("include", "background-image: url(");
        cy.get(ASSETS_IMAGE_ID).eq(1).should("have.attr", "style").and("include", "background-image: url(");
        cy.get(ASSETS_IMAGE_ID).eq(2).should("have.attr", "style").and("include", "background-image: url(");
        cy.get(ASSETS_AMOUNT_ID).should("contain", "3");
        cy.get(ASSETS_IMAGE_ID).last().should("not.have.attr", "style");
        cy.get(ASSETS_IMAGE_ID).last().should("have.css", "backgroundColor", "rgb(247, 247, 247)");
    });

    it("renders correct assets amount, if assets are more than four", () => {
        mount(
            <AssetInput
                assets={EXAMPLE_IMAGES}
                onMultiAssetClick={() => alert("Multi Asset clicked")}
                size={AssetInputSize.Small}
                actions={[]}
            />,
        );
        cy.get(ASSETS_AMOUNT_ID).should("contain", "5");
    });

    it("renders correct number of locations", () => {
        mount(
            <AssetInput
                onMultiAssetClick={() => alert("Multi Asset clicked")}
                assets={MIXED_ASSETS}
                numberOfLocations={5}
                size={AssetInputSize.Small}
                actions={[]}
            />,
        );

        cy.get(NUMBER_OF_LOCATIONS_ID).should("contain", "5");
    });
});
