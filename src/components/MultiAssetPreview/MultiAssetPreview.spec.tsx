/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from "@cypress/react";
import React from "react";
import { MultiAssetPreview } from "./MultiAssetPreview";

const MULTI_ASSET_PREVIEW_ID = "[data-test-id=multi-asset-preview]";

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
                images={[
                    {
                        name: "foo1",
                        size: 2000,
                        type: "image",
                        extension: "JPG",
                        src: "https://picsum.photos/100/150",
                    },
                    {
                        name: "foo2",
                        size: 2000,
                        type: "image",
                        extension: "JPG",
                        src: "https://picsum.photos/200/200",
                    },
                    {
                        name: "foo3",
                        size: 2000,
                        type: "image",
                        extension: "JPG",
                        src: "https://picsum.photos/100/100",
                    },
                    {
                        name: "foo4",
                        size: 1000,
                        type: "image",
                        extension: "JPG",
                        src: "https://picsum.photos/400/200",
                    },
                ]}
            />,
        );

        cy.get(MULTI_ASSET_PREVIEW_ID).should("exist");
    });
});
