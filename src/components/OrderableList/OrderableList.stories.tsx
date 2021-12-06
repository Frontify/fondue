/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Checkbox, CheckboxState } from "@components/Checkbox/Checkbox";
import { useListData } from "@react-stately/data";
import { ItemDropTarget } from "@react-types/shared";
import { Meta, Story } from "@storybook/react";
import React, { FC, useState } from "react";
import { Button } from "@components/Button/Button";
import { OrderableList } from "./OrderableList";
import { merge } from "@utilities/merge";
import { GridNode } from "@react-types/grid";
import { DragProperties, OrderableListItem } from "./types";
import { dragStoryStyles } from ".";

const renderContent = (
    { value, prevKey, nextKey }: GridNode<OrderableListItem>,
    { componentDragState, isFocusVisible }: DragProperties,
) => (
    <div
        className={merge([
            "tw-break-word tw-border tw-border-solid tw-rounded tw-p-3",
            dragStoryStyles[componentDragState],
            isFocusVisible && "tw-bg-violet-20",
            (nextKey === null || prevKey === null) && "tw-bg-green-20",
        ])}
    >
        {value.content}
        <hr className="tw-mt-3 tw-mb-2 tw-border-black-20 tw-bg-black-20" />
        <div className="tw-flex tw-justify-between">
            <span className="tw-bold">{isFocusVisible && "Im in keyboard focus"}</span>
            <span>Drag State: {componentDragState}</span>
        </div>
    </div>
);

const List: FC = () => {
    const [dragDisabled, setDragDisabled] = useState(false);

    const list = useListData({
        initialItems: [
            {
                id: "0",
                type: "item",
                content: (
                    <ul>
                        <li>The List rendering is completely customizable through the renderContent prop</li>
                        <hr className="tw-my-2 tw-border-black-20 tw-bg-black-20" />
                        <li>Use the up and down arrow keys to traverse the list</li>
                        <hr className="tw-my-2 tw-border-black-20 tw-bg-black-20" />
                        <li>Use the left and right arrow keys to switch focus to the prev/next element</li>
                    </ul>
                ),
                alt: "Six",
            },
            {
                id: "1",
                type: "item",
                content: (
                    <div>
                        <p>Use the prevKey and nextKey props to determine the position of items in the list</p>
                    </div>
                ),
                alt: "Four",
            },
            {
                id: "2",
                type: "item",
                content: (
                    <>
                        <Checkbox value={CheckboxState.Checked} label="List Item With Checkbox" />
                    </>
                ),
                alt: "Checkbox Item",
            },
            {
                id: "3",
                type: "item",
                content: <Button>List Item With Button</Button>,
                alt: "List Item With Checkbox",
            },
            {
                id: "4",
                type: "item",
                content: (
                    <div>
                        <p>List Item With multiple focusable elements</p>
                        <div className="tw-flex tw-justify-around tw-mt-2">
                            <Checkbox value={CheckboxState.Unchecked} label="First Input" />
                            <Checkbox value={CheckboxState.Unchecked} label="Second Input" />
                            <Checkbox value={CheckboxState.Unchecked} label="Third Input" />
                            <Checkbox value={CheckboxState.Unchecked} label="Fourth Input" />
                        </div>
                    </div>
                ),
                alt: "text",
            },
            { id: "5", type: "item", content: "Five", alt: "Five" },
        ],
    });

    const onMove = (selectedGridItemKeys: React.Key[], gridItemLocation: ItemDropTarget) =>
        gridItemLocation.dropPosition === "before"
            ? list.moveBefore(gridItemLocation.key, selectedGridItemKeys)
            : list.moveAfter(gridItemLocation.key, selectedGridItemKeys);

    return (
        <div className="tw-m-auto  tw-w-[600px]">
            <OrderableList
                items={list.items}
                onMove={onMove}
                dragDisabled={dragDisabled}
                renderContent={renderContent}
            />
            <div className="tw-flex tw-justify-center tw-mt-3">
                <Button onClick={() => setDragDisabled((prev) => !prev)}>
                    {`${dragDisabled ? "Enable" : "Disable"} Drag`}
                </Button>
            </div>
        </div>
    );
};

export default {
    title: "Components/OrderableList",
    component: List,
} as Meta;

const Template: Story = (args) => <List {...args} />;

export const Default = Template.bind({});
