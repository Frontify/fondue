/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from "@cypress/react";
import IconTextAlignCenter from "@elements/Icon/Generated/IconTextAlignCenter";
import IconTextAlignLeft from "@elements/Icon/Generated/IconTextAlignLeft";
import IconTextAlignRight from "@elements/Icon/Generated/IconTextAlignRight";
import IconSize from "@elements/Icon/IconSize";
import { FC, useState } from "react";
import Slider, { IconItem, TextItem } from "./Slider";

const SLIDER_ID = "[data-test-id=slider]";
const ICON_ITEM_ID = "[data-test-id=slider-item-icon]";
const TEXT_ITEM_ID = "[data-test-id=slider-item-text]";
const INPUT_ID = "[data-test-id=slider-input]";

const TEXT_ITEMS = [
    { id: "a", name: "abc" },
    { id: "b", name: "def" },
    { id: "c", name: "ghi" },
];

const ICON_ITEMS = [
    { id: "a", icon: <IconTextAlignLeft size={IconSize.Size16} />, ariaLabel: "Text Align Left" },
    { id: "b", icon: <IconTextAlignCenter size={IconSize.Size16} />, ariaLabel: "Text Align Center" },
    { id: "c", icon: <IconTextAlignRight size={IconSize.Size16} />, ariaLabel: "Text Align Right" },
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
        cy.get(INPUT_ID).first().should("be.checked");
        cy.get(INPUT_ID).first().should("have.attr", "aria-label", "abc");
        cy.get(TEXT_ITEM_ID).first().contains(TEXT_ITEMS[0].name);
    });
    it("renders icon items", () => {
        mount(<Component items={ICON_ITEMS} />);

        cy.get(ICON_ITEM_ID).should("have.length", 3);
        cy.get(INPUT_ID).first().should("be.checked");
        cy.get(INPUT_ID).first().should("have.attr", "aria-label", "Text Align Left");
    });
    it("changes active item on click", () => {
        mount(<Component items={TEXT_ITEMS} />);

        cy.get(TEXT_ITEM_ID).last().click();
        cy.get(INPUT_ID).last().should("be.checked");
        cy.get(INPUT_ID).first().should("not.be.checked");
    });
    it("changes active item via keyboard", () => {
        mount(<Component items={TEXT_ITEMS} />);

        cy.get("body").tab();
        cy.get(INPUT_ID).first().should("be.focused");
        cy.get("body").type("{rightarrow}{rightarrow}");
        cy.get(INPUT_ID).last().should("be.focused");
        cy.get(INPUT_ID).last().should("be.checked");
        cy.get("body").type("{rightarrow}");
        cy.get(INPUT_ID).first().should("be.checked");
    });
});
