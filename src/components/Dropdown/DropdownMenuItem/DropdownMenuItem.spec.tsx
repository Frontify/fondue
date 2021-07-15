/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconSize } from "@components/Icon/Icon";
import { ReactComponent as Audio } from "@components/Icon/Svg/Audio.svg";
import { mount } from "@cypress/react";
import { Size } from "@utilities/enum";
import DropdownMenuItem from "./DropdownMenuItem";
import css from "./DropdownMenuItem.module.css";

export const MENU_ITEM_ACTIVE_ID = "[data-test-id=dropdown-menu-item-active]";
export const MENU_ITEM_TITLE_ID = "[data-test-id=dropdown-menu-item-title]";
export const MENU_ITEM_TEXT_ID = "[data-test-id=dropdown-menu-item-text]";
const MENU_ITEM_ICON_ID = "[data-test-id=dropdown-menu-item-icon]";
const MENU_ITEM_SUBTITLE_ID = "[data-test-id=dropdown-menu-item-subtitle]";

const ITEMS = [
    {
        id: "1",
        title: "Small",
        icon: <Audio size={IconSize.Size16} />,
    },
    {
        id: "2",
        title: "Small warning",
        warning: true,
    },
    {
        id: "3",
        title: "Small disabled",
        disabled: true,
    },
    {
        id: "4",
        title: "Small warning disabled",
        warning: true,
        disabled: true,
    },
    {
        id: "5",
        title: "Large icon",
        subtitle: "Large icon subtitle",
        icon: <Audio size={IconSize.Size16} />,
        size: Size.Large,
    },
    {
        id: "6",
        title: "Large warning",
        subtitle: "Large warning subtitle",
        size: Size.Large,
        warning: true,
    },
    {
        id: "7",
        title: "Large disabled",
        subtitle: "Large disabled subtitle",
        size: Size.Large,
        disabled: true,
    },
    {
        id: "8",
        title: "Large warning disabled",
        subtitle: "Large warning disabled subtitle",
        size: Size.Large,
        warning: true,
        disabled: true,
    },
];
describe("DropdownMenuItem Component", () => {
    it("renders small item with icon", () => {
        mount(<DropdownMenuItem {...ITEMS[0]} />);
        cy.get(MENU_ITEM_ICON_ID).contains("Small");
    });
    it("renders small active item", () => {
        mount(<DropdownMenuItem {...ITEMS[0]} active />);
        cy.get(MENU_ITEM_ACTIVE_ID).should("exist");
    });
    it("renders small warning item", () => {
        mount(<DropdownMenuItem {...ITEMS[1]} />);
        cy.get(MENU_ITEM_TITLE_ID).contains("Small warning");
        cy.get(MENU_ITEM_TEXT_ID).should("have.class", css.warning);
    });
    it("renders small disabled item", () => {
        mount(<DropdownMenuItem {...ITEMS[2]} />);
        cy.get(MENU_ITEM_TITLE_ID).contains("Small disabled");
        cy.get(MENU_ITEM_TEXT_ID).should("have.class", css.disabled);
    });
    it("renders small disabled warning item", () => {
        mount(<DropdownMenuItem {...ITEMS[3]} />);
        cy.get(MENU_ITEM_TITLE_ID).contains("Small warning disabled");
        cy.get(MENU_ITEM_TEXT_ID).should("have.class", css.warning);
        cy.get(MENU_ITEM_TEXT_ID).should("have.class", css.disabled);
    });
    it("renders large item with icon", () => {
        mount(<DropdownMenuItem {...ITEMS[4]} />);
        cy.get(MENU_ITEM_TITLE_ID).contains("Large icon");
        cy.get(MENU_ITEM_SUBTITLE_ID).contains("Large icon subtitle");
        cy.get(MENU_ITEM_ICON_ID).should("have.class", css.large);
    });
    it("renders large active item", () => {
        mount(<DropdownMenuItem {...ITEMS[4]} active />);
        cy.get(MENU_ITEM_ACTIVE_ID).should("exist");
    });
    it("renders large warning item", () => {
        mount(<DropdownMenuItem {...ITEMS[5]} />);
        cy.get(MENU_ITEM_TITLE_ID).contains("Large warning");
        cy.get(MENU_ITEM_SUBTITLE_ID).contains("Large warning subtitle");
        cy.get(MENU_ITEM_TEXT_ID).should("have.class", css.large);
        cy.get(MENU_ITEM_TEXT_ID).should("have.class", css.warning);
    });
    it("renders large disabled item", () => {
        mount(<DropdownMenuItem {...ITEMS[6]} />);
        cy.get(MENU_ITEM_TITLE_ID).contains("Large disabled");
        cy.get(MENU_ITEM_SUBTITLE_ID).contains("Large disabled subtitle");
        cy.get(MENU_ITEM_TEXT_ID).should("have.class", css.large);
        cy.get(MENU_ITEM_TEXT_ID).should("have.class", css.disabled);
    });
    it("renders large disabled warning item", () => {
        mount(<DropdownMenuItem {...ITEMS[7]} />);
        cy.get(MENU_ITEM_TITLE_ID).contains("Large warning disabled");
        cy.get(MENU_ITEM_SUBTITLE_ID).contains("Large warning disabled subtitle");
        cy.get(MENU_ITEM_TEXT_ID).should("have.class", css.large);
        cy.get(MENU_ITEM_TEXT_ID).should("have.class", css.warning);
        cy.get(MENU_ITEM_TEXT_ID).should("have.class", css.disabled);
    });
});
