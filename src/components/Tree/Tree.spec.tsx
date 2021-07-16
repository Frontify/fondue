/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconSize } from "@components/Icon/Icon";
import { ReactComponent as IconDocument } from "@components/Icon/Svg/Document.svg";
import { ReactComponent as IconGuidelines } from "@components/Icon/Svg/Guidelines.svg";
import { mount } from "@cypress/react";
import { FC, useState } from "react";
import { TreeNode } from "./Node";
import Tree from "./Tree";
import css from "./Tree.module.css";

const Component: FC<{ nodes: TreeNode[] }> = ({ nodes }) => {
    const [selectedId, setSelectedId] = useState<string | undefined>();
    return <Tree nodes={nodes} activeNodeId={selectedId} onSelect={(id: string) => setSelectedId(id)} />;
};

const TREE_ID = "[data-test-id=tree]";
const NODE_ID = "[data-test-id=node]";
const TOGGLE_ID = "[data-test-id=toggle]";
const SUB_TREE_ID = "[data-test-id=sub-tree]";

const nodes: TreeNode[] = [
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

        cy.get(TREE_ID).should("have.class", css.tree);
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

        cy.get(`${NODE_ID} > a`).as("NodeLink");
        cy.get("@NodeLink").click();
        cy.get("@NodeLink").should("have.class", css.nodeLinkSelected);
    });

    it("doesn't select a node without a value", () => {
        mount(<Component nodes={nodes} />);

        cy.get(`${NODE_ID} ${TOGGLE_ID}`).click();
        cy.get(`${SUB_TREE_ID} > ${NODE_ID}:first ${TOGGLE_ID}`).click();
        cy.get(`${SUB_TREE_ID} > ${NODE_ID}:first a`).should("not.have.class", css.nodeLinkSelected);
    });

    it("deselects all the other nodes when selecting a new one", () => {
        mount(<Component nodes={nodes} />);

        cy.get(`${NODE_ID} ${TOGGLE_ID}`).click();
        cy.get(`${SUB_TREE_ID} > ${NODE_ID}:last > a`).as("InitiallySelectedItem");
        cy.get("@InitiallySelectedItem").click();
        cy.get("@InitiallySelectedItem").should("have.class", css.nodeLinkSelected);

        cy.get(`${NODE_ID}:first > a`).as("NextSelectedItem");
        cy.get(`@NextSelectedItem`).click();
        cy.get("@InitiallySelectedItem").should("not.have.class", css.nodeLinkSelected);
        cy.get(`@NextSelectedItem`).should("have.class", css.nodeLinkSelected);
    });
});
