/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from "@cypress/react";
import TabTitle from "./TabTitle";
import css from "./TabTitle.module.css";

const TAB_TITLE = "Some title";
const TAB_ID = "my-id";
const TAB_INDEX = 123;

describe("Tab Title component", () => {
    it("renders", () => {
        const onClickStub = cy.stub().withArgs(TAB_INDEX).as("onClickStub");

        mount(<TabTitle id={TAB_ID} title={TAB_TITLE} index={TAB_INDEX} onClick={onClickStub} />);

        cy.get("[data-test-id=tab-title]").as("tab-title");

        cy.get("@tab-title").should("have.class", css.title);
        cy.get("@tab-title").should("not.have.class", css.selected);

        cy.get("@tab-title").contains(TAB_TITLE);

        cy.get("@tab-title").click();

        cy.get("@onClickStub").should("have.been.calledOnce");
    });

    it("has a selected state", () => {
        mount(<TabTitle id={TAB_ID} title={TAB_TITLE} index={123} selected={true} onClick={() => null} />).as(
            "tab-title",
        );

        cy.get("[data-test-id=tab-title]").as("tab-title");

        cy.get("@tab-title").should("have.class", css.selected);
    });

    it("react to space key pressed", () => {
        const onClickStub = cy.stub().withArgs(TAB_INDEX).as("onClickStub");

        mount(<TabTitle id={TAB_ID} title={TAB_TITLE} index={TAB_INDEX} onClick={onClickStub} />);

        cy.get("[data-test-id=tab-title]").as("tab-title");

        cy.get("@tab-title").trigger("keyup", { keyCode: 32 }); // Simulate spacebar pressed

        cy.get("@onClickStub").should("have.been.calledOnce");
    });
});
