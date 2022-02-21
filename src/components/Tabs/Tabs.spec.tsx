/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from "@cypress/react";
import React, { useState } from "react";
import { Tabs, TabSize, TabsPaddingX } from "@components/Tabs/Tabs";
import { IconIcons, IconSize } from "@foundation/Icon";
import { Card } from "@components/Card";
import { BadgeStyle } from "@components/Badge";
import { Button } from "@components/Button";
import { TabItem } from "@components/Tabs/TabItem";

const content = [
    {
        id: "tab-1",
        label: "A tab",
        content: "This is content for label 1",
    },
    {
        id: "tab-2",
        label: "Disabled",
        disabled: true,

        content: "This is content for label 2",
    },
    {
        id: "tab-3",
        label: "A long tab name",
        decorator: <IconIcons size={IconSize.Size12} />,

        content: "This is content for label 3",
    },
    {
        id: "tab-4",
        label: "An even longer tab name",
        badge: { style: BadgeStyle.Positive, children: "Badge 1" },

        content: (
            <div>
                <h2>Hello</h2>
                <Card hoverable={false}>
                    <p>This is content for tab 4</p>
                </Card>
            </div>
        ),
    },
    {
        id: "tab-5",
        label: "All disabled",
        decorator: <IconIcons size={IconSize.Size12} />,
        badge: { style: BadgeStyle.Danger, children: "Badge 2" },
        disabled: true,

        content: <Button>This is content for label 5</Button>,
    },
    {
        id: "tab-6",
        label: "Last tab",
        decorator: <IconIcons size={IconSize.Size12} />,
        badge: { style: BadgeStyle.Danger, children: "Badge 2" },

        content: <Button>This is content for label 5</Button>,
    },
];

const TabComponent = () => {
    const [activeItemId, setActiveItemId] = useState("tab-1");
    return (
        <Tabs
            activeItemId={activeItemId}
            onChange={(value) => setActiveItemId(value)}
            paddingX={TabsPaddingX.Small}
            size={TabSize.Small}
        >
            {content.map((item) => (
                <TabItem
                    id={item.id}
                    key={item.id}
                    label={item.label}
                    disabled={item.disabled ?? false}
                    decorator={item.decorator}
                    badge={item.badge}
                >
                    {item.content}
                </TabItem>
            ))}
        </Tabs>
    );
};

describe("Tabs Component", () => {
    beforeEach("Mount Component", () => {
        mount(<TabComponent />);
        cy.get("[data-test-id=tabs]").as("Tabs");
    });

    it("should render correctly", () => {
        cy.get("@Tabs").should("be.visible");
    });

    it("should be active on selected Tab", () => {
        const firstTab = cy.get("[data-test-id=tab-item]").first();

        firstTab.should("have.class", "tw-font-medium");
        firstTab.children("[data-test-id=tab-active-highlight]").should("exist");

        const lastTab = cy.get("[data-test-id=tab-item]").last();
        lastTab.click({ force: true }).then(() => {
            lastTab.should("have.class", "tw-font-medium");
            lastTab.children("[data-test-id=tab-active-highlight]").should("exist");
        });
    });

    it("should display correct content", () => {
        cy.get("[data-test-id=tab-item]").first().click();
        cy.get("[data-test-id=tab-content]").children().not(".tw-hidden").should("contain.html", content[0].content);
        cy.get("[data-test-id=tab-item]").eq(2).click();
        cy.get("[data-test-id=tab-content]").children().not(".tw-hidden").should("contain.html", content[2].content);
    });

    it("should have overflow on smaller screens", () => {
        cy.viewport(480, 850);
        cy.get("[data-test-id=tab-overflow]").as("OverflowBtn");
        cy.get("@OverflowBtn").should("be.visible");
        cy.get("@OverflowBtn").click();
        cy.get("[role=dialog]").as("Menu");
        cy.get("@Menu").should("be.visible");
        cy.get("@Menu").children().last().should("contain.text", content[5].label);
        cy.viewport(1280, 850);
        cy.get("@Tabs").children("[data-test-id=tab-overflow]").should("not.exist");
    });
});
