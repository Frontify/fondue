/* (c) Copyright Frontify Ltd., all rights reserved. */
import { useListData } from "@react-stately/data";
import { ItemDropTarget } from "@react-types/shared";
import { Meta, Story } from "@storybook/react";
import React, { FC, forwardRef, Key, ReactChild, useState } from "react";
import { Button, ButtonSize } from "@components/Button";
import { OrderableList as OrderableListComponent } from "./OrderableList";
import { merge } from "@utilities/merge";
import { GridNode } from "@react-types/grid";
import { DragProperties, OrderableListItem } from "./types";
import { FocusController, FocusControllerWidth, ItemDragState, OrderableListProps } from ".";
import { chain } from "@react-aria/utils";
import { ButtonGroup } from "@components/ButtonGroup";
import { Checklist, ChecklistDirection } from "@components/Checklist";
import { TextInput } from "@components/TextInput";

// eslint-disable-next-line import/no-default-export
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

const dragStoryStyles: Record<ItemDragState, string> = {
    [ItemDragState.Dragging]: "tw-bg-black-10 tw-border-black-20 tw-opacity-75",
    [ItemDragState.Idle]: "tw-border-black-20",
    [ItemDragState.Preview]: "tw-bg-white tw-border-violet-70 tw-border-2",
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

type ControlledTextAreaProps = {
    value: string;
    onChange: (value: string) => void;
};

type HighlightProps = {
    color: HighlightColor;
    children: ReactChild;
};

type StoryListItem = {
    textContent: JSX.Element;
    actionContentType?: ActionContentTypes;
};

enum ActionContentTypes {
    Textarea = "Textarea",
    Input = "Input",
    ButtonGroup = "ButtonGroup",
    Checklist = "Checklist",
}

type ActionStateValueTypes = {
    [ActionContentTypes.Checklist]: string[];
    [ActionContentTypes.Input]: string;
    [ActionContentTypes.Textarea]: string;
};

type ActionState = {
    updateActionState: (value: ValueOf<ActionStateValueTypes>, key: Key) => void;
    actionState: Record<Key, ValueOf<ActionStateValueTypes>>;
};

type ValueOf<T> = T[keyof T];

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
    },
    {
        id: "2",
        textContent: (
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
        alt: "two",
    },
    {
        id: "3",
        textContent: (
            <p>
                Use the <Highlight color={HighlightColor.Green}>prevKey</Highlight> and &nbsp;
                <Highlight color={HighlightColor.Green}>nextKey</Highlight> properties in the &nbsp;
                <Highlight color={HighlightColor.Green}>renderContent</Highlight> function to determine the position of
                items in the list.
            </p>
        ),
        alt: "three",
    },
    {
        id: "4",
        textContent: <p>Items can contain multiple focusable elements.</p>,
        actionContentType: ActionContentTypes.ButtonGroup,
        alt: "four",
    },
    {
        id: "5",
        textContent: (
            <p>
                Important: If your list item contains typable elements, make sure the&nbsp;
                <Highlight color={HighlightColor.Green}>disableTypeAhead</Highlight> prop is set to&nbsp;
                <Highlight color={HighlightColor.Violet}>true</Highlight>, otherwise typing will shift focus to a new
                element based on the items&nbsp;
                <Highlight color={HighlightColor.Green}>alt</Highlight> text (Type &quot;one&quot; to see the effect).
            </p>
        ),
        actionContentType: ActionContentTypes.Input,
        alt: "five",
    },
    {
        id: "6",
        textContent: (
            <>
                <p>
                    Wrap your typable component in a&nbsp;
                    <Highlight color={HighlightColor.Green}>Focus Controller</Highlight> to enable navigation by
                    keyboard. Press <Highlight color={HighlightColor.Red}>Space</Highlight> to enter the textarea
                    and&nbsp;
                    <Highlight color={HighlightColor.Red}>Escape</Highlight> to exit.
                </p>
                <p>
                    Note: The child component must expose a <Highlight color={HighlightColor.Green}>ref</Highlight> for
                    the focus controller to work
                </p>
            </>
        ),
        actionContentType: ActionContentTypes.Textarea,
        alt: "six",
    },
    {
        id: "7",
        textContent: (
            <p>
                The drag-preview is created as a new element, using dragged item&apos;s&nbsp;
                <Highlight color={HighlightColor.Green}>Key</Highlight> prop to render its content. The state of any
                interactive items must be managed outside of the list to achieve consistent rendering in the drag
                preview
            </p>
        ),
        actionContentType: ActionContentTypes.Checklist,
        alt: "seven",
    },
];

const getActionContentItems = ({ updateActionState, actionState }: ActionState, key: Key) => ({
    [ActionContentTypes.Input]: (
        <TextInput
            value={actionState[key] as ActionStateValueTypes[ActionContentTypes.Input]}
            onChange={(value) => updateActionState(value, key)}
        ></TextInput>
    ),
    [ActionContentTypes.Textarea]: (
        <FocusController width={FocusControllerWidth.Full}>
            <ControlledTextArea
                onChange={(value) => updateActionState(value, key)}
                value={actionState[key] as ActionStateValueTypes[ActionContentTypes.Textarea]}
            />
        </FocusController>
    ),
    [ActionContentTypes.ButtonGroup]: (
        <ButtonGroup size={ButtonSize.Small}>
            <Button>List Item With Buttons</Button>
            <Button>List Item With Buttons</Button>
            <Button>List Item With Buttons</Button>
        </ButtonGroup>
    ),
    [ActionContentTypes.Checklist]: (
        <Checklist
            direction={ChecklistDirection.Horizontal}
            setActiveValues={(values) => updateActionState(values, key)}
            activeValues={actionState[key] as ActionStateValueTypes[ActionContentTypes.Checklist]}
            checkboxes={[
                { value: "Item 1", label: "Item 1" },
                { value: "Item 2", label: "Item 2" },
                { value: "Item 3", label: "Item 3" },
                { value: "Item 4", label: "Item 4" },
            ]}
        ></Checklist>
    ),
});

const renderContent = (
    { value, prevKey, nextKey, key }: GridNode<OrderableListItem<StoryListItem>>,
    { componentDragState, isFocusVisible }: DragProperties,
    { updateActionState, actionState }: ActionState,
) => {
    let position = "Middle";
    if (!prevKey) {
        position = "First";
    } else if (!nextKey) {
        position = "Last";
    }

    const { actionContentType } = value;

    const actionContent = actionContentType
        ? getActionContentItems({ updateActionState, actionState }, key)[actionContentType]
        : null;

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
            <div>{value.textContent}</div>
            {actionContent && <div className="tw-flex tw-justify-around tw-mt-2">{actionContent}</div>}
            <hr className="tw-mt-3 tw-mb-2 tw-border-black-20 tw-bg-black-20" />
            <div className="tw-flex tw-justify-between tw-text-s">
                <span className="tw-font-medium">{isFocusVisible && "Im in keyboard focus"}</span>
                <span>Drag State: {componentDragState}</span>
            </div>
        </div>
    );
};

export const OrderableList: Story<OrderableListProps<StoryListItem>> = ({ disableTypeAhead, onMove, dragDisabled }) => {
    const [actionState, setActionState] = useState({});

    const list = useListData({
        initialItems: storyItems,
    });

    const moveItems = (selectedGridItemKeys: React.Key[], gridItemLocation: ItemDropTarget) =>
        gridItemLocation.dropPosition === "before"
            ? list.moveBefore(gridItemLocation.key, selectedGridItemKeys)
            : list.moveAfter(gridItemLocation.key, selectedGridItemKeys);

    const updateActionState = (value: ValueOf<ActionStateValueTypes>, key: Key) =>
        setActionState((prev) => {
            const newContent = { ...prev, [key]: value };
            return newContent;
        });

    return (
        <div className="tw-m-auto tw-w-[600px]">
            <OrderableListComponent
                items={list.items}
                onMove={chain(moveItems, onMove)}
                dragDisabled={dragDisabled}
                renderContent={(...args) => renderContent(...args, { updateActionState, actionState })}
                disableTypeAhead={disableTypeAhead}
            />
        </div>
    );
};
