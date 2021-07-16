/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconSize } from "@components/Icon/Icon";
import { ReactComponent as IconDocument } from "@components/Icon/Svg/Document.svg";
import { ReactComponent as IconGuidelines } from "@components/Icon/Svg/Guidelines.svg";
import { mount } from "@cypress/react";
import { FC, useState } from "react";
import { TreeNode } from "./Node";
import Tree from "./Tree";
import css from "./Tree.module.css";

const Tree_FOO = "bar";

const Component: FC<{ nodes: TreeNode[] }> = ({ nodes }) => {
    const [selectedId, setSelectedId] = useState<string | undefined>();
    return <Tree nodes={nodes} selectedNodeId={selectedId} onSelect={(id: string) => setSelectedId(id)} />;
};

const TREE_ID = "[data-test-id=Tree]";

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
    it("renders tree with nodes", () => {
        mount(<Component nodes={[]} />);

        cy.get(TREE_ID).as("Tree");

        cy.get("@Tree").should("have.class", css.tree);
    });
});
