import React, { useLayoutEffect, useRef, useState } from 'react';
import { merge } from '@utilities/merge';

import { NewTreeItemProps } from './types';
import { EditableText } from '@components/EditableText';
import { Tooltip, TooltipPosition } from '@components/Tooltip';

export const NewTreeItem = ({
    id,
    name,
    label,
    value,
    icon,
    badge,
    activeIds,
    strong = false,
    actions,
    onClick,
    onNodeExpand,
    editable,
    onEditableSave,
    tooltipContent,
    children,
}: NewTreeItemProps) => {
    console.log('🚀 ~ children', children);
    const [showNodes, setShowNodes] = useState<boolean>(false);
    const [isHovered, setIsHovered] = useState<boolean>(false);

    const selected = activeIds && activeIds.length > 0 && activeIds.includes(id);

    const setHoveredTrue = () => setIsHovered(true);
    const setHoveredFalse = () => setIsHovered(false);
    const onNodeClick = () => {
        if (!value) {
            setShowNodes(!showNodes);
            return;
        }

        if (onClick) {
            onClick(id);
        }
    };

    const [hasBeenExpanded, setHasBeenExpanded] = useState<boolean>(false);
    const toggleNodesVisibility = (event: React.MouseEvent) => {
        if (!hasBeenExpanded) {
            onNodeExpand?.(id);
        }
        setHasBeenExpanded(true);

        event.stopPropagation();
        setShowNodes(!showNodes);
    };

    const insertBadge = () => {
        return (
            <Tooltip
                disabled={!tooltipContent}
                content={tooltipContent}
                position={TooltipPosition.Right}
                withArrow
                triggerElement={
                    <div
                        data-test-id="node-badge"
                        className={merge([
                            'tw-flex tw-justify-center tw-items-center tw-ml-2 tw-text-text-weak',
                            badge?.props.size && 'tw-w-8 tw-h-5 tw-bg-box-neutral tw-rounded-full',
                        ])}
                    >
                        {badge}
                    </div>
                }
            />
        );
    };

    const nameRef = useRef<HTMLDivElement | null>(null);
    const [isOverflowing, setIsOverflowing] = useState(false);

    useLayoutEffect(() => {
        checkIfOverflowing();

        window.addEventListener('resize', checkIfOverflowing);
        return () => {
            window.removeEventListener('resize', checkIfOverflowing);
        };
    }, []);

    const checkIfOverflowing = () => {
        if (nameRef.current) {
            const isTextOverflowing = nameRef.current.scrollWidth > nameRef.current.clientWidth;
            setIsOverflowing(isTextOverflowing);
        }
    };

    const isExpandable = Boolean(Array.isArray(children) ? children.length : children);
    console.log('🚀 ~ isExpandable', isExpandable);

    return (
        <li data-test-id="node">
            <div
                className={merge([
                    'tw-flex tw-py-2 tw-px-2.5 tw-no-underline tw-leading-5 tw-h-10',
                    strong && 'tw-font-bold',
                    value &&
                        !selected &&
                        'tw-text-text hover:tw-bg-box-neutral-hover hover:tw-text-box-neutral-inverse-hover',
                    selected &&
                        'tw-font-medium tw-bg-box-selected-strong tw-text-box-selected-strong-inverse hover:tw-bg-box-selected-strong-hover hover:tw-text-box-selected-strong-inverse-hover',
                ])}
                onMouseEnter={setHoveredTrue}
                onMouseLeave={setHoveredFalse}
            >
                <a
                    data-test-id="node-link"
                    className={merge([
                        'tw-flex tw-items-center tw-flex-grow tw-justify-between tw-cursor-pointer tw-h-6',
                        isExpandable && 'tw-pl-4',
                        isExpandable && children?.length > 1 && 'tw-pl-8',
                    ])}
                    aria-selected={selected}
                    onClick={onNodeClick}
                >
                    <div className="tw-flex tw-flex-1 tw-space-x-1 tw-items-center tw-h-full">
                        <span
                            data-test-id="toggle"
                            className="tw-w-2 tw-h-3 tw-flex tw-items-center tw-justify-center"
                            onClick={toggleNodesVisibility}
                        >
                            {children && (
                                <div
                                    className={merge([
                                        'tw-transition-transform tw-w-0 tw-h-0 tw-text-black-100 tw-text-opacity-40 tw-font-normal tw-border-t-4 tw-border-t-transparent tw-border-b-4 tw-border-b-transparent tw-border-l-4 tw-border-l-x-strong',
                                        showNodes ? 'tw-rotate-90' : '',
                                        selected && 'tw-text-box-selected-strong-inverse',
                                    ])}
                                />
                            )}
                        </span>
                        {icon && <span className="tw-flex tw-justify-center tw-items-center tw-w-5">{icon}</span>}
                        {editable && onEditableSave ? (
                            <div ref={nameRef} className="tw-relative tw-top-[0.2rem] tw-w-full tw-flex-1 tw-h-full">
                                <EditableText
                                    options={{
                                        additionalValues: id,
                                        enableDoubleClick: true,
                                        isSlimInputField: true,
                                        removeBoxPadding: true,
                                    }}
                                    onAdditionalValueSave={onEditableSave}
                                    isOverflowing={true}
                                >
                                    <span
                                        title={isOverflowing ? name : ''}
                                        className="tw-max-w-full tw-absolute tw-top-[-0.08rem] tw-truncate"
                                    >
                                        {name}
                                    </span>
                                </EditableText>
                            </div>
                        ) : (
                            <span
                                className="tw-flex tw-items-center tw-flex-1 tw-relative tw-h-10"
                                title={isOverflowing ? name : ''}
                                data-test-id="node-link-name"
                            >
                                <span ref={nameRef} className="tw-truncate tw-max-w-full tw-absolute">
                                    {name}
                                </span>
                            </span>
                        )}
                        <span>{badge && insertBadge()}</span>
                    </div>
                    <div className="tw-px-1.5">
                        <span
                            data-test-id="node-label"
                            className={merge([
                                'tw-text-black-100 tw-text-opacity-40 tw-text-xs tw-font-normal',
                                selected && 'tw-text-box-selected-strong-inverse',
                            ])}
                        >
                            {label}
                        </span>
                    </div>
                </a>

                {actions && (
                    <div
                        className={merge([
                            'tw-flex tw-items-center',
                            isHovered || selected ? 'tw-visible tw-space-x-1.5' : 'tw-invisible tw-w-0',
                        ])}
                    >
                        {actions.map((action) => action)}
                    </div>
                )}
            </div>

            {showNodes && (
                <ul
                    className="tw-p-0 tw-m-0 tw-font-sans tw-font-normal tw-list-none tw-text-left"
                    data-test-id="sub-tree"
                >
                    {children}
                </ul>
            )}
        </li>
    );
};
