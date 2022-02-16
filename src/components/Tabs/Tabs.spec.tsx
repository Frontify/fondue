/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from "@cypress/react";
import React from "react";
import { Tabs, TabSize, TabsPaddingX } from "@components/Tabs/Tabs";
import { IconIcons, IconSize } from "@foundation/Icon";
import { Card } from "@components/Card";
import { BadgeStyle } from "@components/Badge";
import { Button } from "@components/Button";

const content = [
    {
        label: "A tab",
        content: "This is content for label 1",
    },
    {
        label: "Disabled",
        content: "This is content for label 2",
        disabled: true,
    },
    {
        label: "A long tab name",
        content: "This is content for label 3",
        decorator: <IconIcons size={IconSize.Size12} />,
    },
    {
        label: "An even longer tab name",
        content: (
            <div>
                <h2>Hello</h2>
                <Card hoverable={false}>
                    <p>This is content for tab 4</p>
                </Card>
            </div>
        ),
        badge: { style: BadgeStyle.Positive, children: "Badge 1" },
    },
    {
        label: "All disabled",
        content: <Button>This is content for label 5</Button>,
        decorator: <IconIcons size={IconSize.Size12} />,
        badge: { style: BadgeStyle.Danger, children: "Badge 2" },
        disabled: true,
    },
    {
        label: "Last tab",
        content: <Button>This is content for label 5</Button>,
        decorator: <IconIcons size={IconSize.Size12} />,
        badge: { style: BadgeStyle.Danger, children: "Badge 2" },
    },
];

describe("Tabs Component", () => {
    it("should render correctly", () => {
        mount(<Tabs content={content} paddingX={TabsPaddingX.Small} size={TabSize.Small} />);

        cy.get("[data-test-id=tabs]").as("Tabs");
        cy.get("@Tabs").should("be.visible");
    });
});
