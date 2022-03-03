import React from "react";
import { useDrop } from "react-dnd";
import { merge } from "@utilities/merge";
import { OrderableListItem } from "@components/OrderableListV2/types";
import { DropZonePosition } from "@utilities/dnd";

export type OnDropCallback<T> = (
    targetItem: OrderableListItem<T>,
    sourceItem: OrderableListItem<T>,
    position: DropZonePosition,
) => void;

type DropZoneData<T> = {
    targetItem: OrderableListItem<T>;
    position: DropZonePosition;
};

export type DropZoneProps<T> = {
    data: DropZoneData<T>;
    onDrop?: OnDropCallback<T>;
    children?: JSX.Element;
};

export const DropZone = <T extends object>({ data, onDrop, children }: DropZoneProps<T>) => {
    const [{ isOver, canDrop }, drop] = useDrop({
        accept: "item",
        drop: (item: OrderableListItem<T>) => {
            onDrop?.(data.targetItem, item, data.position);
        },
        canDrop: (item: OrderableListItem<T>) => {
            // can't drop an item on itself
            if (item.id === data.targetItem.id) {
                return false;
            }
            // otherwise anything can be dropped anywhere ATM
            return true;
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    });

    const isActive = isOver && canDrop;

    return (
        <div
            role="row"
            aria-hidden={isActive ? "false" : "true"}
            data-test-id="drop-zone"
            className={merge([
                "tw-w-full tw-outline-none tw-z-20 tw-relative tw-h-[2px] tw-mb-[-2px]",
                isActive ? "tw-bg-violet-60" : "",
            ])}
            ref={drop}
        >
            {children}
        </div>
    );
};
