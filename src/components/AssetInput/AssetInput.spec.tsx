/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from "@cypress/react";
import { IconIcons } from "@foundation/Icon";
import React from "react";
import { actions } from "./actions";
import { AssetInput, AssetInputSize, AssetType } from "./AssetInput";

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

const EXAMPLE_IMAGES: AssetType[] = [
    {
        name: "foo1",
        size: 2000,
        type: "image",
        extension: "JPG",
        src: "https://picsum.photos/100/150",
        source: "library",
        sourceName: "",
    },
    {
        name: "foo2",
        size: 2000,
        type: "image",
        extension: "JPG",
        src: "https://picsum.photos/200/200",
        source: "library",
        sourceName: "",
    },
    {
        name: "foo3",
        size: 2000,
        type: "image",
        extension: "JPG",
        src: "https://picsum.photos/100/100",
        source: "library",
        sourceName: "",
    },
    {
        name: "foo4",
        size: 1000,
        type: "image",
        extension: "JPG",
        src: "https://picsum.photos/400/200",
        source: "library",
        sourceName: "",
    },
    {
        name: "foo5",
        size: 1000,
        type: "image",
        extension: "JPG",
        src: "https://picsum.photos/400/200",
        source: "library",
        sourceName: "",
    },
];

const MIXED_ASSETS = EXAMPLE_IMAGES.slice(0, 2);

MIXED_ASSETS.push(
    {
        source: "library",
        sourceName: "Foobar",
        name: "foo",
        type: "icon",
        icon: <IconIcons />,
    },
    {
        source: "library",
        sourceName: "Foobar",
        name: "foo",
        extension: "MP3",
        size: 2000,
        type: "audio",
    },
);

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
        mount(
            <AssetInput
                size={AssetInputSize.Small}
                assets={[
                    {
                        source: "upload",
                        name: "foo",
                        size: 2000,
                        type: "image",
                        extension: "JPG",
                        src: "https://picsum.photos/200/300",
                    },
                ]}
                actions={actions}
            />,
        );

        cy.get(ASSET_SINGLE_INPUT_ID).should("contain", "2000");
        cy.get(ASSET_SINGLE_INPUT_ID).should("contain", "Upload");
        cy.get(ASSET_SINGLE_INPUT_ID).should("contain", "JPG");
        cy.get(ASSET_SINGLE_INPUT_THUMBNAIL_ID).should("have.css", "backgroundColor");
        cy.get(ASSET_SINGLE_INPUT_THUMBNAIL_IMAGE_ID).should("have.attr", "src", "https://picsum.photos/200/300");
    });

    it("renders asset input with audio", () => {
        mount(
            <AssetInput
                size={AssetInputSize.Small}
                assets={[
                    {
                        source: "library",
                        sourceName: "Foobar",
                        name: "foo",
                        extension: "MP3",
                        size: 2000,
                        type: "audio",
                    },
                ]}
                actions={actions}
            />,
        );

        cy.get(ASSET_SINGLE_INPUT_THUMBNAIL_AUDIO_ID);
        cy.get(ASSET_SINGLE_INPUT_ID).should("contain", "Foobar");
        cy.get(ASSET_SINGLE_INPUT_ID).should("contain", "MP3");
    });

    it("without images, image url should not exist", () => {
        mount(
            <AssetInput
                assets={[
                    {
                        source: "upload",
                        name: "foo",
                        size: 2000,
                        type: "image",
                        extension: "JPG",
                        src: "https://picsum.photos/200/300",
                    },
                    {
                        source: "upload",
                        name: "foo",
                        size: 2000,
                        type: "image",
                        extension: "JPG",
                        src: "https://picsum.photos/200/300",
                    },
                ]}
                onMultiAssetClick={() => alert("Multi Asset clicked")}
                size={AssetInputSize.Small}
                actions={[]}
            />,
        );

        cy.get(ASSETS_IMAGE_ID).last().should("not.have.attr", "style");
        cy.get(ASSETS_IMAGE_ID).last().should("have.css", "backgroundColor");
    });

    it("renders with images", () => {
        mount(
            <AssetInput
                onMultiAssetClick={() => alert("Multi Asset clicked")}
                numberOfLocations={12}
                assets={EXAMPLE_IMAGES}
                size={AssetInputSize.Small}
                actions={[]}
            />,
        );

        cy.get(MULTI_ASSET_PREVIEW_ID);
    });

    it("renders with mixed assets", () => {
        mount(
            <AssetInput
                onMultiAssetClick={() => alert("Multi Asset clicked")}
                numberOfLocations={12}
                size={AssetInputSize.Small}
                assets={MIXED_ASSETS}
                actions={[]}
            />,
        );

        cy.get(MULTI_ASSET_PREVIEW_ID);
    });

    it("renders with images", () => {
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
    });

    it("image urls should exist", () => {
        mount(
            <AssetInput
                onMultiAssetClick={() => alert("Multi Asset clicked")}
                assets={EXAMPLE_IMAGES}
                size={AssetInputSize.Small}
                actions={[]}
            />,
        );

        cy.get(ASSETS_IMAGE_ID).should("have.attr", "style").and("include", "background-image: url(");
    });

    it("renders correct assets amount", () => {
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
                assets={EXAMPLE_IMAGES}
                numberOfLocations={5}
                size={AssetInputSize.Small}
                actions={[]}
            />,
        );

        cy.get(NUMBER_OF_LOCATIONS_ID).should("contain", "5");
    });
});
