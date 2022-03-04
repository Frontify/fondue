/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Meta, Story } from "@storybook/react";
import React, { FC, forwardRef, ReactChild, useState } from "react";
import { OrderableList as OrderableListComponent } from "./OrderableList";
import { merge } from "@utilities/merge";
import { DragProperties, OrderableListItem } from "./types";
import { ItemDragState, OrderableListProps } from ".";
import { chain } from "@react-aria/utils";

// eslint-disable-next-line import/no-default-export
export default {
    title: "Components/Orderable List",
    component: OrderableListComponent,
    args: {
        dragDisabled: false,
    },
    argTypes: {
        onMove: { action: "onMove" },
    },
} as Meta<OrderableListProps<StoryListItem>>;

type ControlledTextAreaProps = {
    value: string;
    onChange: (value: string) => void;
};

type HighlightProps = {
    color: HighlightColor;
    children: ReactChild;
};

enum HighlightColor {
    Violet = "Violet",
    Green = "Green",
    Red = "Red",
}

const HighlightClasses: Record<HighlightColor, string> = {
    [HighlightColor.Violet]: "tw-text-violet-60",
    [HighlightColor.Green]: "tw-text-green-60",
    [HighlightColor.Red]: "tw-text-red-60",
};

type StoryListItem = {
    textContent: JSX.Element;
};

const dragStoryStyles: Record<ItemDragState, string> = {
    [ItemDragState.Dragging]: "tw-bg-black-10 tw-border-black-20 tw-opacity-75",
    [ItemDragState.Idle]: "tw-border-black-20",
    [ItemDragState.Preview]: "tw-bg-white tw-border-violet-70 tw-border-2",
};

const ControlledTextArea = forwardRef<HTMLTextAreaElement, ControlledTextAreaProps>(({ value, onChange }, ref) => (
    <textarea
        ref={ref}
        className="tw-w-full tw-block tw-border"
        value={value}
        onChange={(e) => onChange && onChange(e.target.value)}
    />
));
ControlledTextArea.displayName = "ControlledTextArea";

const Highlight: FC<HighlightProps> = ({ color, children }) => (
    <span className={merge(["tw-font-medium", HighlightClasses[color]])}>{children}</span>
);

const storyItems: OrderableListItem<StoryListItem>[] = [
    {
        id: "1",
        textContent: (
            <p>
                The list rendering is completely customizable through the &nbsp;
                <Highlight color={HighlightColor.Green}>renderContent</Highlight> callback prop.
            </p>
        ),
        alt: "one",
        sort: 1,
    },
    {
        id: "3",
        textContent: (
            <p>
                Use the <Highlight color={HighlightColor.Green}>sort</Highlight> property in the &nbsp;
                <Highlight color={HighlightColor.Green}>OrderableListItem</Highlight> to determine the position of items
                items in the list.
            </p>
        ),
        alt: "three",
        sort: 2,
    },
    {
        id: "4",
        textContent: <p>Items can contain multiple focusable elements.</p>,
        alt: "four",
        sort: null,
    },
    {
        id: "7",
        textContent: (
            <p>
                The drag-preview is created as a new element, using the
                <Highlight color={HighlightColor.Green}>renderContent</Highlight> callback with the dragged item key to
                render its content. The state of any interactive items must be managed outside of the list to achieve
                consistent rendering in the drag preview.
            </p>
        ),
        alt: "seven",
        sort: 3,
    },
];

const renderContent = (
    { textContent }: OrderableListItem<StoryListItem>,
    { componentDragState, isFocusVisible }: DragProperties,
) => {
    return (
        <div
            className={merge([
                "tw-break-word tw-border tw-border-black-40 tw-border-solid tw-p-3",
                dragStoryStyles[componentDragState],
                isFocusVisible && "tw-bg-violet-20",
            ])}
        >
            <div className="tw-text-xs tw-text-black-60">Position: Foo</div>
            <hr className="tw-mt-2 tw-mb-2 tw-border-black-20 tw-bg-black-20" />
            <div>{textContent}</div>
            <hr className="tw-mt-3 tw-mb-2 tw-border-black-20 tw-bg-black-20" />
            <div className="tw-flex tw-justify-between tw-text-s">
                {isFocusVisible && <span className="tw-font-medium">Im in keyboard focus</span>}
                <span>Drag State: {componentDragState}</span>
            </div>
        </div>
    );
};

export const OrderableList: Story<OrderableListProps<StoryListItem>> = ({ onMove, dragDisabled }) => {
    const [items, setItems] = useState(storyItems);

    const handleMove = (modifiedItems: OrderableListItem<StoryListItem>[]) => {
        const modifiedArray = items.map((item) => {
            const matchingModifiedItem = modifiedItems.find((modifiedItem) => modifiedItem.id === item.id);
            if (matchingModifiedItem) {
                return { ...matchingModifiedItem };
            }

            return { ...item };
        });

        setItems(modifiedArray);
    };

    return (
        <>
            <div className="tw-m-auto tw-w-[600px] tw-pb-6">
                <OrderableListComponent
                    items={items}
                    onMove={chain(handleMove, onMove)}
                    dragDisabled={dragDisabled}
                    renderContent={(...args) => renderContent(...args)}
                />
            </div>
            <div className="tw-m-auto tw-w-[600px]">
                <OrderableListComponent
                    items={items}
                    onMove={chain(handleMove, onMove)}
                    dragDisabled={dragDisabled}
                    renderContent={(...args) => renderContent(...args)}
                />
            </div>
        </>
    );
};
