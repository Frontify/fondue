/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from "@cypress/react";
import Tabs from "./Tabs";
import Tab from "./Tab/Tab";
import tabTitleCss from "./TabTitle/TabTitle.module.css";

const TABS = [
    { label: "Frontify", content: <span>Frontify</span>, expectContentHtml: "<span>Frontify</span>" },
    { label: "Youtube", content: <span>Youtube</span>, expectContentHtml: "<span>Youtube</span>" },
    { label: "Twitter", content: <span>Twitter</span>, expectContentHtml: "<span>Twitter</span>" },
];

const TABS_ID = "my-id";

const TABS_COMPONENT = (selectedIndex?: number) => (
    <Tabs id={TABS_ID} selectedIndex={selectedIndex}>
        {TABS.map((tab, index) => (
            <Tab key={index} title={tab.label}>
                {tab.content}
            </Tab>
        ))}
    </Tabs>
);

describe("Tabs component", () => {
    it("renders", () => {
        mount(TABS_COMPONENT());

        cy.get('[data-test-id="tab-title"]').as("tab-title");

        cy.get("@tab-title").should("have.length", 3);
        cy.get("@tab-title").eq(0).should("have.class", tabTitleCss.selected);
        cy.get("@tab-title").eq(0).should("have.text", TABS[0].label);

        cy.get('[data-test-id="tab-content"]').should("have.html", TABS[0].expectContentHtml);
    });

    it("has a custom tab selected", () => {
        const SELECTED_INDEX = 2;
        mount(TABS_COMPONENT(SELECTED_INDEX));

        cy.get('[data-test-id="tab-title"]').as("tab-title");

        cy.get("@tab-title").should("have.length", 3);
        cy.get("@tab-title").eq(SELECTED_INDEX).should("have.class", tabTitleCss.selected);
        cy.get("@tab-title").eq(SELECTED_INDEX).should("have.text", TABS[SELECTED_INDEX].label);

        cy.get('[data-test-id="tab-content"]').should("have.html", TABS[SELECTED_INDEX].expectContentHtml);
    });

    it("change tab when clicked", () => {
        mount(TABS_COMPONENT());

        cy.get('[data-test-id="tab-title"]').as("tab-title");

        cy.get("@tab-title").eq(1).click();

        cy.get("@tab-title").eq(0).should("not.have.class", tabTitleCss.selected);
        cy.get("@tab-title").eq(1).should("have.class", tabTitleCss.selected);
    });
});
