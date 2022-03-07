/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from "@cypress/react";
import { IconIcons } from "@foundation/Icon";
import React from "react";
import { AssetType } from "../AssetInput";
import { MultiAssetPreview } from "./MultiAssetPreview";

const MULTI_ASSET_PREVIEW_ID = "[data-test-id=multi-asset-preview]";
const ASSETS_AMOUNT_ID = "[data-test-id=assets-amount]";
const NUMBER_OF_LOCATIONS_ID = "[data-test-id=number-of-locations]";
const ASSETS_IMAGE_ID = "[data-test-id=assets-image]";

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
    it("should render without images", () => {
        mount(<MultiAssetPreview onClick={() => alert("Multi Asset clicked")} />);

        cy.get(MULTI_ASSET_PREVIEW_ID).should("exist");
    });

    it("should render with images", () => {
        mount(
            <MultiAssetPreview
                onClick={() => alert("Multi Asset clicked")}
                numberOfLocations={12}
                assetsAmount={25}
                assets={EXAMPLE_IMAGES}
            />,
        );

        cy.get(MULTI_ASSET_PREVIEW_ID);
    });

    it("should render with mixed assets", () => {
        mount(
            <MultiAssetPreview
                onClick={() => alert("Multi Asset clicked")}
                numberOfLocations={12}
                assetsAmount={25}
                assets={MIXED_ASSETS}
            />,
        );

        cy.get(MULTI_ASSET_PREVIEW_ID);
    });

    it("should render with images", () => {
        mount(
            <MultiAssetPreview
                onClick={() => alert("Multi Asset clicked")}
                numberOfLocations={12}
                assetsAmount={25}
                assets={EXAMPLE_IMAGES.slice(0, 3)}
            />,
        );

        cy.get(MULTI_ASSET_PREVIEW_ID);
    });

    it("image urls should exist", () => {
        mount(<MultiAssetPreview onClick={() => alert("Multi Asset clicked")} assets={EXAMPLE_IMAGES} />);

        cy.get(ASSETS_IMAGE_ID).should("have.attr", "style").and("include", "background-image: url(");
    });

    it("without images, image url should not exist", () => {
        mount(<MultiAssetPreview onClick={() => alert("Multi Asset clicked")} />);

        cy.get(ASSETS_IMAGE_ID).should("not.have.attr", "style");
    });

    it("without images, background color should be set", () => {
        mount(<MultiAssetPreview onClick={() => alert("Multi Asset clicked")} />);

        cy.get(ASSETS_IMAGE_ID).should("have.css", "backgroundColor");
    });

    it("renders correct assets amount", () => {
        mount(<MultiAssetPreview onClick={() => alert("Multi Asset clicked")} assetsAmount={5} />);

        cy.get(ASSETS_AMOUNT_ID).should("contain", "5");
    });

    it("renders correct number of locations", () => {
        mount(<MultiAssetPreview onClick={() => alert("Multi Asset clicked")} numberOfLocations={5} />);

        cy.get(NUMBER_OF_LOCATIONS_ID).should("contain", "5");
    });
});
