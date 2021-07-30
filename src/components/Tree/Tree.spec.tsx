/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from "@cypress/react";
import { IconSize } from "@elements/Icon/Icon";
import IconDocument from "@elements/Icon/Generated/IconDocument";
import IconGuidelines from "@elements/Icon/Generated/IconGuidelines";
import { FC, useState } from "react";
import { TreeNodeProps } from "./Node";
import Tree from "./Tree";

type ComponentProps = {
    nodes: TreeNodeProps[];
};
const Component: FC<ComponentProps> = ({ nodes }: ComponentProps) => {
    const [selectedId, setSelectedId] = useState<string | null>();
    return <Tree nodes={nodes} activeNodeId={selectedId} onSelect={(id: string | null) => setSelectedId(id)} />;
};

const TREE_ID = "[data-test-id=tree]";
const NODE_ID = "[data-test-id=node]";
const NODE_LINK_ID = "[data-test-id=node-link]";
const NODE_LINK_NAME_ID = "[data-test-id=node-link-name]";
const TOGGLE_ID = "[data-test-id=toggle]";
const SUB_TREE_ID = "[data-test-id=sub-tree]";

const nodes: TreeNodeProps[] = [
    {
        id: "1",
        name: "Design System Testing",
        label: "Document",
        value: "https://weare.frontify.com/document/1",
        icon: <IconGuidelines size={IconSize.Size16} />,
        nodes: [
            {
                id: "1-1",
                name: "Uncategorizes Pages",
                nodes: [
                    {
                        id: "1-1-1",
                        name: "Home",
                        label: "Page",
                        value: "https://weare.frontify.com/page/1",
                        icon: <IconDocument size={IconSize.Size16} />,
                    },
                    {
                        id: "1-1-2",
                        name: "Members",
                        label: "Page",
                        value: "https://weare.frontify.com/page/2",
                        icon: <IconDocument size={IconSize.Size16} />,
                    },
                    {
                        id: "1-1-3",
                        name: "About us",
                        label: "Page",
                        value: "https://weare.frontify.com/page/3",
                        icon: <IconDocument size={IconSize.Size16} />,
                    },
                ],
            },
            {
                id: "1-2",
                name: "Test Category",
                label: "Document",
                value: "https://weare.frontify.com/document/923#/test",
                nodes: [
                    {
                        id: "1-2-1",
                        name: "Home",
                        label: "Page",
                        value: "https://weare.frontify.com/page/1",
                        icon: <IconDocument size={IconSize.Size16} />,
                    },
                    {
                        id: "1-2-2",
                        name: "Members",
                        label: "Page",
                        value: "https://weare.frontify.com/page/2",
                        icon: <IconDocument size={IconSize.Size16} />,
                    },
                    {
                        id: "1-2-3",
                        name: "About us",
                        label: "Page",
                        value: "https://weare.frontify.com/page/3",
                        icon: <IconDocument size={IconSize.Size16} />,
                    },
                ],
            },
        ],
    },
];

describe("Tree Component", () => {
    it("renders tree", () => {
        mount(<Component nodes={nodes} />);

        cy.get(TREE_ID).should("be.visible");
        cy.get(NODE_ID).should("have.length", 1);
    });

    it("toggles node on click", () => {
        mount(<Component nodes={nodes} />);

        cy.get(`${NODE_ID} ${TOGGLE_ID}`).as("Toggle");
        cy.get("@Toggle").click();
        cy.get(NODE_ID).should("have.length", 3);

        cy.get("@Toggle").click();
        cy.get(NODE_ID).should("have.length", 1);
    });

    it("selects a node with a value on click", () => {
        mount(<Component nodes={nodes} />);

        cy.get(NODE_LINK_NAME_ID).click();
        cy.get(NODE_LINK_ID).should("have.attr", "aria-selected", "true");
    });

    it("doesn't select a node without a value", () => {
        mount(<Component nodes={nodes} />);

        cy.get(`${NODE_ID} ${TOGGLE_ID}`).click();
        cy.get(`${SUB_TREE_ID} > ${NODE_ID}:first ${TOGGLE_ID}`).click();
        cy.get(`${SUB_TREE_ID} > ${NODE_ID}:first a`).should("have.attr", "aria-selected", "false");
    });

    it("deselects all the other nodes when selecting a new one", () => {
        mount(<Component nodes={nodes} />);

        cy.get(`${NODE_ID} ${TOGGLE_ID}`).click();
        cy.get(`${SUB_TREE_ID} > ${NODE_ID}:last > ${NODE_LINK_ID}`).as("InitiallySelectedItem");
        cy.get(`${SUB_TREE_ID} ${NODE_LINK_NAME_ID}:last`).click();
        cy.get("@InitiallySelectedItem").should("have.attr", "aria-selected", "true");

        cy.get(`${NODE_ID}:first ${NODE_LINK_ID}:first`).as("NextSelectedItem");
        cy.get(`${NODE_ID}:first ${NODE_LINK_NAME_ID}:first`).click();
        cy.get("@InitiallySelectedItem").should("have.attr", "aria-selected", "false");
        cy.get(`@NextSelectedItem`).should("have.attr", "aria-selected", "true");
    });
});
