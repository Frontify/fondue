/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from "@cypress/react";
import IconSize from "@elements/Icon/IconSize";
import IconTextAlignCenter from "@elements/Icon/Generated/IconTextAlignCenter";
import { FC, useState } from "react";
import Slider, { IconItem, TextItem } from "./Slider";

const SLIDER_ID = "[data-test-id=slider]";
const ICON_ITEM_ID = "[data-test-id=slider-item-icon]";
const TEXT_ITEM_ID = "[data-test-id=slider-item-text]";

const TEXT_ITEMS = [
    { id: "a", name: "abc" },
    { id: "b", name: "def" },
    { id: "c", name: "ghi" },
];

const ICON_ITEMS = [
    { id: "a", icon: <IconTextAlignCenter size={IconSize.Size16} /> },
    { id: "b", icon: <IconTextAlignCenter size={IconSize.Size16} /> },
    { id: "c", icon: <IconTextAlignCenter size={IconSize.Size16} /> },
];

type Props = {
    items: TextItem[] | IconItem[];
};

const Component: FC<Props> = ({ items }: Props) => {
    const [active, setActive] = useState(items[0].id);
    return <Slider items={items} activeItemId={active} onChange={setActive} />;
};

describe("Slider Component", () => {
    it("renders text items", () => {
        mount(<Component items={TEXT_ITEMS} />);

        cy.get(SLIDER_ID).should("be.visible");
        cy.get(TEXT_ITEM_ID).should("have.length", 3);
        cy.get(TEXT_ITEM_ID).first().should("have.attr", "aria-selected", "true");
        cy.get(TEXT_ITEM_ID).first().contains(TEXT_ITEMS[0].name);
    });
    it("renders icon items", () => {
        mount(<Component items={ICON_ITEMS} />);

        cy.get(ICON_ITEM_ID).should("have.length", 3);
        cy.get(ICON_ITEM_ID).first().should("have.attr", "aria-selected", "true");
    });
    it("changes active item on click", () => {
        mount(<Component items={TEXT_ITEMS} />);

        cy.get(TEXT_ITEM_ID).last().click();
        cy.get(TEXT_ITEM_ID).last().should("have.attr", "aria-selected", "true");
        cy.get(TEXT_ITEM_ID).first().should("have.attr", "aria-selected", "false");
    });
});
