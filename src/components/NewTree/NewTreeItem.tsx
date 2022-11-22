import React, { useState } from 'react';
import { merge } from '@utilities/merge';

import { NewTreeItemProps } from './types';
import { DropZone } from '@components/DropZone';
import { DropZonePosition } from '@utilities/dnd';
import { useDrag } from 'react-dnd';
import { useNewTreeContext } from './NewTreeContext';

/* eslint-disable jsx-a11y/anchor-is-valid,jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */
export const NewTreeItem = ({ id, sort, onClick, onSelect, component, children }: NewTreeItemProps) => {
    const { treeId, selectedIds, setSelectedIds, multiselectMode } = useNewTreeContext();

    const [showNodes, setShowNodes] = useState<boolean>(false);

    const [{ opacity }, drag] = useDrag({
        item: { id, sort },
        collect: (monitor) => ({
            opacity: monitor.isDragging() ? 0.4 : 1,
        }),
        type: treeId,
    });

    const handleDrop = (arg1: unknown, arg2: unknown, arg3: unknown) => {
        console.log('🚀 ~ handleDrop ~ arg1', arg1);
        console.log('🚀 ~ handleDrop ~ arg2', arg2);
        console.log('🚀 ~ handleDrop ~ arg3', arg3);
    };

    const handleNodeClick = () => {
        if (multiselectMode) {
            const modifiedSelectedIds: Nullable<string[]> = selectedIds.includes(id)
                ? [...selectedIds].filter((i) => i !== id)
                : [...selectedIds, id];

            setSelectedIds(modifiedSelectedIds);
            onSelect?.(modifiedSelectedIds);
        } else {
            setSelectedIds([id]);
            onSelect?.([id]);
        }

        if (onClick) {
            onClick(id);
        }
    };

    const selected = selectedIds && selectedIds.length > 0 && selectedIds.includes(id);

    const toggleNodesVisibility = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.stopPropagation();
        setShowNodes(!showNodes);
    };

    const childrenArray = React.Children.toArray(children);

    const insertCaret = () => {
        if (childrenArray.length === 0) {
            return null;
        }

        return (
            <div
                className={merge([
                    'tw-transition-transform tw-w-0 tw-h-0 tw-text-black-100 tw-text-opacity-40 tw-font-normal tw-border-t-4 tw-border-t-transparent tw-border-b-4 tw-border-b-transparent tw-border-l-4 tw-border-l-x-strong',
                    showNodes ? 'tw-rotate-90' : '',
                ])}
                onClick={toggleNodesVisibility}
            />
        );
    };

    return (
        <li data-test-id="node" ref={drag} style={{ opacity }}>
            <DropZone
                data={{
                    targetItem: { id, sort },
                    position: DropZonePosition.Within,
                }}
                onDrop={handleDrop}
                treeId={treeId}
            >
                <div
                    className={merge([
                        'tw-flex tw-py-2 tw-px-2.5 tw-no-underline tw-leading-5 tw-h-10',
                        // TEMP
                        selected
                            ? 'tw-font-medium tw-bg-box-selected-strong tw-text-box-selected-strong-inverse hover:tw-bg-box-selected-strong-hover hover:tw-text-box-selected-strong-inverse-hover'
                            : 'tw-text-text hover:tw-bg-box-neutral-hover hover:tw-text-box-neutral-inverse-hover',
                    ])}
                    onClick={handleNodeClick}
                >
                    <div className="tw-flex tw-flex-1 tw-space-x-1 tw-items-center tw-h-6">
                        <span data-test-id="toggle" className="tw-w-2 tw-h-3 tw-flex tw-items-center tw-justify-center">
                            {insertCaret()}
                        </span>

                        {component}
                    </div>
                </div>
            </DropZone>

            {showNodes && (
                <ul
                    className="tw-p-0 tw-m-0 tw-font-sans tw-font-normal tw-list-none tw-text-left [&>li]:tw-pl-4"
                    data-test-id="sub-tree"
                >
                    {childrenArray}
                </ul>
            )}

            <DropZone
                data={{
                    targetItem: { id, sort },
                    position: DropZonePosition.After,
                }}
                onDrop={handleDrop}
                treeId={treeId}
            />
        </li>
    );
};
