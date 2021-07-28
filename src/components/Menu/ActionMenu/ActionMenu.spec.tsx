/* (c) Copyright Frontify Ltd., all rights reserved. */

import { MenuItemContentSize } from "@components/Menu/MenuItem/MenuItemContent";
import { mount } from "@cypress/react";
import { MenuBlock } from "../SelectMenu";
import { ActionMenu } from "./ActionMenu";

const MENU_ITEM_ID = "[data-test-id=menu-item]";
const MENU_BLOCK_DIVIDER = "[data-test-id=menu-block-divider]";
const MENU_ITEM_LIST_ID = "[data-test-id=menu-item-list]";

const MENU_BLOCKS: MenuBlock[] = [
    {
        id: "small-block-1",
        menuItems: [
            {
                id: "small1",
                title: "Small first",
                size: MenuItemContentSize.Small,
            },
            {
                id: "small2",
                title: "Small second",
                size: MenuItemContentSize.Small,
            },
        ],
    },
    {
        id: "small-block-2",
        menuItems: [
            {
                id: "small3",
                title: "Small third",
                size: MenuItemContentSize.Small,
            },
            {
                id: "small4",
                title: "Small fourth",
                size: MenuItemContentSize.Small,
            },
        ],
    },
];

describe("ActionMenu Component", () => {
    it("renders action menu with divider", () => {
        const onClickStub = cy.stub().as("onClickStub");
        const menuBlocks = MENU_BLOCKS.map((block) => ({
            ...block,
            menuItems: block.menuItems.map((item) => ({
                ...item,
                onClick: onClickStub,
            })),
        }));

        mount(<ActionMenu menuBlocks={menuBlocks} />);

        cy.get(MENU_ITEM_LIST_ID).should("have.length", 2);
        cy.get(MENU_BLOCK_DIVIDER).should("have.length", 2);
        cy.get("@onClickStub").should("not.be.called");
        cy.get(MENU_ITEM_ID).first().click();
        cy.get("@onClickStub").should("be.calledOnce");
    });
});
