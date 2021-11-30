/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Checkbox, CheckboxState } from "@components/Checkbox/Checkbox";
import { useListData } from "@react-stately/data";
import { ItemDropTarget } from "@react-types/shared";
import { Meta, Story } from "@storybook/react";
import React, { ReactElement } from "react";
import { Button } from "@components/Button/Button";
import { OrderableList } from "./OrderableList";

const List = (props): ReactElement => {
    const list = useListData({
        initialItems: props.items || [
            {
                id: "1",
                type: "item",
                content: (
                    <>
                        <Checkbox value={CheckboxState.Checked} />
                        OneOneOneOneOneOneOneOneOneOne OneOneOneOneOneOnocipae OneOneOneOneOneOneOneOneOne
                        OneOneOneOneOneOne
                    </>
                ),
                alt: "text",
            },
            { id: "2", type: "item", content: "Two", alt: "text" },
            { id: "3", type: "item", content: "Three", alt: "text" },
            { id: "4", type: "item", content: "Four", alt: "text" },
            { id: "5", type: "item", content: "Five", alt: "text" },
            { id: "6", type: "item", content: "Six", alt: "text" },
        ],
    });

    const onMove = (selectedGridItemKeys: React.Key[], gridItemLocation: ItemDropTarget) => {
        if (gridItemLocation.dropPosition === "before") {
            list.moveBefore(gridItemLocation.key, selectedGridItemKeys);
        } else {
            list.moveAfter(gridItemLocation.key, selectedGridItemKeys);
        }
    };

    return (
        <div style={{ width: "200px" }}>
            <OrderableList
                items={list.items}
                onMove={onMove}
                showFocusRing
                renderContent={({ value }, {}) => {
                    return (
                        <div className="tw-break-all tw-bg-black">
                            {value.content}
                            <div contentEditable>TEXTEDITABLE</div>
                            <textarea>TEXTAREA</textarea>
                            <Button>hello</Button>
                        </div>
                    );
                }}
            ></OrderableList>
        </div>
    );
};

export default {
    title: "Components/OrderableList",
    component: List,
} as Meta;

const Template: Story = (args) => {
    return <List {...args} />;
};

export const Default = Template.bind({});

Default.args = {
    foo: "bar",
};
