/* (c) Copyright Frontify Ltd., all rights reserved. */

import { MemoryRouter } from "react-router-dom";
import { mount } from "@cypress/react";
import Sidebar, { SidebarItem, SidebarItemType } from "./Sidebar";

describe("Sidebar component", () => {
    it("renders", () => {
        const sidebarItems: SidebarItem[] = [
            { id: "1", label: "S", type: SidebarItemType.Default, onClick: () => null },
            { id: "2", label: "A", link: "/abc", type: SidebarItemType.Link },
            { id: "3", label: "L", type: SidebarItemType.Default, onClick: () => null },
            { id: "4", label: "U", link: "/def", type: SidebarItemType.Link },
            { id: "5", label: "T", type: SidebarItemType.Default, onClick: () => null },
        ];

        mount(
            <MemoryRouter>
                <Sidebar items={sidebarItems} />
            </MemoryRouter>,
        );

        cy.get("[data-test-id=sidebar-item-default]").should("have.length", 3);
        cy.get("[data-test-id=sidebar-item-link]").should("have.length", 2);
    });

    it("renders with groups", () => {
        const sidebarItems: SidebarItem[] = [
            { id: "1", label: "Foo", type: SidebarItemType.Default, group: "Group A", onClick: () => null },
            { id: "2", label: "Bar", link: "/abc", type: SidebarItemType.Link, group: "Group B" },
        ];

        mount(
            <MemoryRouter>
                <Sidebar items={sidebarItems} />
            </MemoryRouter>,
        );

        cy.get("[data-test=sidebar-group]").should("have.length", 2);
    });
});
