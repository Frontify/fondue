import React from "react";
import { useDrop } from "react-dnd";
import { TreeNodeProps } from "@components/Tree/Node";
import { merge } from "@utilities/merge";

export enum DropZonePosition {
    AFTER = "after",
    BEFORE = "before",
    WITHIN = "within",
}

export type OnDropCallback = (targetId: string, sourceID: string, position: DropZonePosition) => void;

type DropZoneData = {
    id: string;
    position: DropZonePosition;
};

export type DropZoneProps = {
    data: DropZoneData;
    onDrop?: OnDropCallback;
    children?: JSX.Element;
};

const DropZone = ({ data, onDrop, children }: DropZoneProps) => {
    const [{ isOver, canDrop }, drop] = useDrop({
        accept: "item",
        drop: (item: TreeNodeProps, monitor) => {
            onDrop?.(data.id, item.id, data.position);
        },
        canDrop: (item: TreeNodeProps, monitor) => {
            // anything can be dropped anywhere ATM
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
            className={merge([
                "tw-w-full",
                isActive ? "tw-bg-violet-10" : "",
                data.position !== DropZonePosition.WITHIN ? "tw-h-1" : "tw-h-auto",
                isActive && data.position !== DropZonePosition.WITHIN ? "tw-border-violet-50 tw-border-2" : "",
            ])}
            ref={drop}
        >
            {children}
        </div>
    );
};
export default DropZone;
