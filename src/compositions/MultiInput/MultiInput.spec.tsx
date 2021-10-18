/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from "@cypress/react";
import React from "react";
import { MultiInput, MultiInputLayout } from "./MultiInput";
import { TextInput } from "@elements/TextInput/TextInput";

describe("Multi Input Component", () => {
    it("should render the Multi Input with columns", () => {
        mount(
            <MultiInput layout={MultiInputLayout.Columns}>
                <TextInput />
                <TextInput />
                <TextInput />
                <TextInput />
            </MultiInput>,
        );

        cy.get("[data-test-id=multi-input-grid-columns]")
            .as("MultiInputColumns")
            .should("have.class", "tw-grid")
            .and("have.class", "tw-grid-cols-2");
    });

    it("should render the Multi Input with spider layout", () => {
        mount(
            <MultiInput layout={MultiInputLayout.Spider}>
                <TextInput />
                <TextInput />
                <TextInput />
                <TextInput />
            </MultiInput>,
        );

        cy.get("[data-test-id=multi-input-grid-spider]")
            .as("MultiInputSpider")
            .should("have.class", "tw-grid")
            .and("have.class", "tw-grid-cols-8");
    });
});
