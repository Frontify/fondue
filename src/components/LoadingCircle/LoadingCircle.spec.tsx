/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from "react";
import { mount } from "@cypress/react";
import { LoadingCircle, LoadingCircleSize, LoadingCircleStyle, sizeClasses, statusClasses } from "./LoadingCircle";

const LOADING_CIRCLE_ID = "[data-test-id=loading-circle]";

describe("LoadingCircle Component", () => {
    it("should render correctly", () => {
        mount(<LoadingCircle />);

        cy.get(LOADING_CIRCLE_ID).should("exist");
    });

    it("should render in progress style", () => {
        mount(<LoadingCircle style={LoadingCircleStyle.Progress} />);

        cy.get(LOADING_CIRCLE_ID).should("have.class", statusClasses[LoadingCircleStyle.Progress]);
    });

    it("should render in positive style", () => {
        mount(<LoadingCircle style={LoadingCircleStyle.Positive} />);

        cy.get(LOADING_CIRCLE_ID).should("have.class", statusClasses[LoadingCircleStyle.Positive]);
    });

    it("should render in warning style", () => {
        mount(<LoadingCircle style={LoadingCircleStyle.Danger} />);

        cy.get(LOADING_CIRCLE_ID).should("have.class", statusClasses[LoadingCircleStyle.Danger]);
    });

    it("should render in extra small size", () => {
        mount(<LoadingCircle size={LoadingCircleSize.ExtraSmall} />);

        cy.get(LOADING_CIRCLE_ID).should("have.class", sizeClasses[LoadingCircleSize.ExtraSmall]);
    });

    it("should render in small size", () => {
        mount(<LoadingCircle size={LoadingCircleSize.Small} />);

        cy.get(LOADING_CIRCLE_ID).should("have.class", sizeClasses[LoadingCircleSize.Small]);
    });

    it("should render in medium size", () => {
        mount(<LoadingCircle size={LoadingCircleSize.Medium} />);

        cy.get(LOADING_CIRCLE_ID).should("have.class", sizeClasses[LoadingCircleSize.Medium]);
    });

    it("should render in large size", () => {
        mount(<LoadingCircle size={LoadingCircleSize.Large} />);

        cy.get(LOADING_CIRCLE_ID).should("have.class", sizeClasses[LoadingCircleSize.Large]);
    });
});
