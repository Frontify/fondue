/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from "@cypress/react";
import React from "react";
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

describe("Tabs Component", () => {
    it("should render correctly", () => {
        mount(
            // TODO onChange for testing
            <Tabs activeItemId="tab-1" onChange={(value) => value} paddingX={TabsPaddingX.Small} size={TabSize.Small}>
                {content.map((item) => (
                    <TabItem id={item.id} key={item.id} label={item.label} disabled={item.disabled ?? false}>
                        {item.content}
                    </TabItem>
                ))}
            </Tabs>,
        );

        cy.get("[data-test-id=tabs]").as("Tabs");
        cy.get("@Tabs").should("be.visible");
    });
});
