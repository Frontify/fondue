/* (c) Copyright Frontify Ltd., all rights reserved. */
import { useListData } from "@react-stately/data";
import { ItemDropTarget } from "@react-types/shared";
import { Meta, Story } from "@storybook/react";
import React, { FC, forwardRef, useState } from "react";
import { Button, ButtonSize } from "@components/Button";
import { OrderableList as OrderableListComponent } from "./OrderableList";
import { merge } from "@utilities/merge";
import { GridNode } from "@react-types/grid";
import { DragProperties, OrderableListItem } from "./types";
import {
    dragStoryStyles,
    FocusController,
    FocusControllerWidth,
    HighlightClasses,
    HighlightColor,
    HighlightProps,
    OrderableListProps,
    StoryListItem,
} from ".";
import { chain } from "@react-aria/utils";
import { Checklist, ChecklistDirection } from "@components/Checklist";
import { Textarea } from "@components/Textarea";
import { ButtonGroup } from "@components/ButtonGroup";

export default {
    title: "Components/Orderable List",
    component: OrderableListComponent,
    args: {
        dragDisabled: false,
        disableTypeAhead: true,
    },
    argTypes: {
        onMove: { action: "onMove" },
    },
} as Meta<OrderableListProps<StoryListItem>>;

const renderContent = (
    { value, prevKey, nextKey }: GridNode<OrderableListItem<StoryListItem>>,
    { componentDragState, isFocusVisible }: DragProperties,
) => {
    let position = "Middle";
    if (!prevKey) {
        position = "First";
    } else if (!nextKey) {
        position = "Last";
    }
    return (
        <div
            className={merge([
                "tw-break-word tw-border tw-border-black-40 tw-border-solid tw-p-3",
                dragStoryStyles[componentDragState],
                isFocusVisible && "tw-bg-violet-20",
            ])}
        >
            <div className="tw-text-xs tw-text-black-60">Position: {position}</div>
            <hr className="tw-mt-2 tw-mb-2 tw-border-black-20 tw-bg-black-20" />
            {value.content}
            <hr className="tw-mt-3 tw-mb-2 tw-border-black-20 tw-bg-black-20" />
            <div className="tw-flex tw-justify-between tw-text-s">
                <span className="tw-font-medium">{isFocusVisible && "Im in keyboard focus"}</span>
                <span>Drag State: {componentDragState}</span>
            </div>
        </div>
    );
};

const ToggleableChecklist = () => {
    const [checked, setChecked] = useState<string[]>([]);
    return (
        <Checklist
            direction={ChecklistDirection.Horizontal}
            setActiveValues={setChecked}
            activeValues={checked}
            checkboxes={[
                {
                    label: "First Input",
                    value: "input 1",
                },
                {
                    label: "Second Input",
                    value: "input 2",
                },
                {
                    label: "Third Input",
                    value: "input 3",
                },
                {
                    label: "Fourth Input",
                    value: "input 4",
                },
            ]}
        />
    );
};

const TextAreaWithRef = forwardRef<HTMLTextAreaElement>((_, ref) => (
    <textarea ref={ref} className="tw-w-full tw-block tw-border" />
));
TextAreaWithRef.displayName = "TextareaWithRef";

const Highlight: FC<HighlightProps> = ({ color, children }) => (
    <span className={merge(["tw-font-medium", HighlightClasses[color]])}>{children}</span>
);

const storyItems: OrderableListItem<StoryListItem>[] = [
    {
        id: "0",
        content: (
            <p>
                The list rendering is completely customizable through the &nbsp;
                <Highlight color={HighlightColor.Green}>renderContent</Highlight> callback prop.
            </p>
        ),
        alt: "item 0",
    },

    {
        id: "1",
        content: (
            <>
                <p>
                    To navigate through the list use the <Highlight color={HighlightColor.Red}>up</Highlight>
                    ,&nbsp;
                    <Highlight color={HighlightColor.Red}>down</Highlight>,&nbsp;
                    <Highlight color={HighlightColor.Red}>left</Highlight> and &nbsp;
                    <Highlight color={HighlightColor.Red}>right</Highlight> arrow keys.
                </p>
                <p>
                    Press <Highlight color={HighlightColor.Red}>Space</Highlight> or&nbsp;
                    <Highlight color={HighlightColor.Red}>Enter</Highlight> to select an item to drag, and&nbsp;
                    <Highlight color={HighlightColor.Red}>Escape</Highlight> to exit the drag.
                </p>
            </>
        ),
        alt: "item 1",
    },
    {
        id: "2",
        content: (
            <p>
                Use the <Highlight color={HighlightColor.Green}>prevKey</Highlight> and &nbsp;
                <Highlight color={HighlightColor.Green}>nextKey</Highlight> properties in the &nbsp;
                <Highlight color={HighlightColor.Green}>renderContent</Highlight> function to determine the position of
                items in the list.
            </p>
        ),
        alt: "item two",
    },

    {
        id: "3",
        content: (
            <div>
                <p>Items can contain multiple focusable elements.</p>
                <div className="tw-flex tw-justify-around tw-mt-2"></div>
                <ToggleableChecklist />
            </div>
        ),
        alt: "item three",
    },
    {
        id: "4",
        content: (
            <div>
                <p>
                    Important: If your list item contains typable elements, make sure the&nbsp;
                    <Highlight color={HighlightColor.Green}>disableTypeAhead</Highlight> prop is set to&nbsp;
                    <Highlight color={HighlightColor.Violet}>true</Highlight>, otherwise typing will shift focus to a
                    new element based on the items&nbsp;
                    <Highlight color={HighlightColor.Green}>alt</Highlight> text
                </p>
                <Textarea placeholder="Type 'test' to see the effect of the typeahead"></Textarea>
            </div>
        ),
        alt: "item four",
    },
    {
        id: "5",
        content: (
            <div>
                <p>
                    Wrap your typable component in a&nbsp;
                    <Highlight color={HighlightColor.Green}>Focus Controller</Highlight> to enable navigation by
                    keyboard. Press <Highlight color={HighlightColor.Red}>Space</Highlight> to enter the textarea
                    and&nbsp;
                    <Highlight color={HighlightColor.Red}>Escape</Highlight> to exit.
                </p>
                <p>Note: The child component must expose a ref for the focus controller to work</p>
                <FocusController width={FocusControllerWidth.Full}>
                    <TextAreaWithRef />
                </FocusController>
            </div>
        ),
        alt: "item five",
    },
    {
        id: "6",
        content: (
            <ButtonGroup size={ButtonSize.Small}>
                <Button>List Item With Buttons</Button>
                <Button>List Item With Buttons</Button>
                <Button>List Item With Buttons</Button>
            </ButtonGroup>
        ),
        alt: "test",
    },
];

export const OrderableList: Story<OrderableListProps<StoryListItem>> = ({ disableTypeAhead, onMove, dragDisabled }) => {
    const list = useListData({
        initialItems: storyItems,
    });

    const moveItems = (selectedGridItemKeys: React.Key[], gridItemLocation: ItemDropTarget) =>
        gridItemLocation.dropPosition === "before"
            ? list.moveBefore(gridItemLocation.key, selectedGridItemKeys)
            : list.moveAfter(gridItemLocation.key, selectedGridItemKeys);

    return (
        <div className="tw-m-auto tw-w-[600px]">
            <OrderableListComponent
                items={list.items}
                onMove={chain(moveItems, onMove)}
                dragDisabled={dragDisabled}
                renderContent={renderContent}
                disableTypeAhead={disableTypeAhead}
            />
        </div>
    );
};
