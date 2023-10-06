/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Children, MouseEvent, memo, useCallback, useEffect, useMemo, useRef } from 'react';
import noop from 'lodash-es/noop';

import { type RegisterNodeChildrenPayload, TreeItemMultiselectProps, TreeItemStyling } from '@components/Tree/types';

import { INDENTATION_WIDTH, Projection, getMultiselectCheckBoxState, getTreeNodesWithoutElements } from '../helpers';
import { removeFragmentsAndEnrichChildren, useDeepCompareEffect } from '../utils';
import {
    getMultiselectBackgroundClassName,
    getMultiselectContainerClassName,
    getMultiselectLiClassName,
} from '../helpers/multiselectTreeItemstyling';

import { ExpandButton } from './ExpandButton';
import { Checkbox, CheckboxEmphasis, CheckboxSize } from '@components/Checkbox/Checkbox';
import { Container } from '@components/Container';
import { useTreeItem } from './useTreeItem';

/** @private */
type TreeItemPrivateProps = {
    parentId?: string;
    level?: number;
    isExpanded?: boolean;
    /** onSelect is passed by the Tree component when cloning the TreeItem */
    onSelect?: (id: string, ignoreRemoveSelected: boolean, isRemoveOnly?: boolean) => void;
    onExpand?: (id: string) => void;
    onShrink?: (id: string) => void;
    projection?: Nullable<Projection>;
    unregisterNodeChildren?: (payload: string) => void;
    registerNodeChildren?: (payload: RegisterNodeChildrenPayload) => void;
};

/** @private */
export type InternalTreeItemMultiSelectProps = TreeItemMultiselectProps & TreeItemPrivateProps;

export const TreeItemMultiselect = memo(
    ({
        id,
        label,
        showCaret,
        children,
        level = 0,
        contentComponent,
        parentId,
        onSelect,
        onExpand,
        onShrink,
        onBeforeUnregisterChildren,
        registerNodeChildren,
        unregisterNodeChildren,
        isDisabled = false,
        expandable = true,
        checkBoxPosition = 'left',
        itemStyle,
        'data-test-id': dataTestId = 'fondue-tree-item',
    }: InternalTreeItemMultiSelectProps) => {
        const setActiveNodeRef = useRef<HTMLInputElement | null>(null);
        const { isSelected, isExpanded } = useTreeItem(id);
        const { isSelected: isPartialSelected } = useTreeItem(`*${id}`);
        const { isSelected: isParentSelected } = useTreeItem(parentId ?? '');
        const { isSelected: isParentPartialSelected } = useTreeItem(`*${parentId}`);

        const toggleExpand = useCallback(
            (event?: MouseEvent<HTMLButtonElement>) => {
                event?.stopPropagation();
                isExpanded ? onShrink?.(id) : onExpand?.(id);
            },
            [id, isExpanded, onExpand, onShrink],
        );

        useEffect(() => {
            if (isParentSelected && !isSelected && onSelect) {
                onSelect(id, true);
            }

            // if (!isParentSelected && !isParentPartialSelected && isSelected && onSelect && parentId !== '__ROOT__') {
            //     console.log('Mount', parentId, isParentSelected, isParentPartialSelected, isSelected);
            //     onSelect(id, false);
            // }
        }, [id, onSelect, isParentSelected, isParentPartialSelected, isSelected, parentId]);

        const hasChildren = Children.count(children) > 0;

        const { enrichedChildren, childrenIds } = useMemo(() => {
            const enrichedChildren = removeFragmentsAndEnrichChildren(children, {
                parentId: id,
                level: level + 1,
            });

            return {
                enrichedChildren,
                childrenIds: enrichedChildren.map((child) => child.props.id),
            };
        }, [children, id, level]);

        useDeepCompareEffect(() => {
            if (Children.count(enrichedChildren) === 0 || !isExpanded) {
                const childNodes = getTreeNodesWithoutElements(enrichedChildren, id);
                onBeforeUnregisterChildren?.(id, childNodes);
                unregisterNodeChildren?.(id);
                return;
            }

            registerNodeChildren?.({ id, children: enrichedChildren });
        }, [isExpanded, enrichedChildren, id, onSelect]);

        const itemStyleProps = useMemo(() => {
            return {
                spacingY: 'none',
                contentHight: 'single-line',
                shadow: 'none',
                borderRadius: 'small',
                borderWidth: 'none',
                borderStyle: 'none',
                activeColorStyle: 'neutral',
                ...itemStyle,
            } as TreeItemStyling;
        }, [itemStyle]);

        const { liClassName, backgroundClassName } = useMemo(() => {
            return {
                liClassName: getMultiselectLiClassName(itemStyleProps, isDisabled),
                backgroundClassName: getMultiselectBackgroundClassName(itemStyleProps, isSelected, isDisabled),
            };
        }, [itemStyleProps, isDisabled, isSelected]);

        const wrapperContentClassName = 'tw-max-w-full	tw-grow';
        const showChildren = isExpanded;
        const showLabel = label !== undefined;
        const showExpandButton = expandable && (showCaret ?? hasChildren);

        const containerClassName = getMultiselectContainerClassName(itemStyleProps);

        const levelPadding = level * INDENTATION_WIDTH;
        const liStyle = { paddingLeft: levelPadding };
        const backgroundStyle = itemStyleProps.borderWidth !== 'none' ? {} : { marginLeft: -1 * levelPadding };
        const style = {};

        const checkBoxOnSelect = isDisabled ? () => void 0 : () => onSelect?.(id, false);
        const checkBox =
            checkBoxPosition !== 'none' ? (
                <Container maxWidth="16px" maxHeight="16px">
                    <Checkbox
                        id={`checkbox-${id}`}
                        ref={setActiveNodeRef}
                        disabled={isDisabled}
                        aria-label="TODO: some label here..."
                        emphasis={CheckboxEmphasis.Weak}
                        helperText=""
                        hideLabel
                        label=""
                        onChange={checkBoxOnSelect}
                        size={CheckboxSize.Default}
                        state={getMultiselectCheckBoxState(isSelected, isPartialSelected)}
                        tooltip={[]}
                        value={id}
                    />
                </Container>
            ) : null;

        return (
            <li
                id={id}
                key={id}
                tabIndex={0}
                role="treeitem"
                style={liStyle}
                onKeyDown={noop}
                aria-label={label}
                aria-level={level + 1}
                className={liClassName}
                data-test-id={dataTestId}
                aria-selected={isSelected}
                aria-expanded={isExpanded}
                data-has-children={hasChildren}
                aria-owns={childrenIds.join(' ')}
            >
                <div className={containerClassName} style={style}>
                    <span className={backgroundClassName} style={backgroundStyle} aria-hidden={true} />
                    {checkBoxPosition === 'left' && checkBox}

                    {expandable && (
                        <ExpandButton
                            onClick={toggleExpand}
                            expanded={showChildren}
                            disabled={!showExpandButton}
                            aria-hidden={!showExpandButton}
                            className={showExpandButton ? 'tw-visible' : 'tw-invisible tw-pointer-events-none'}
                        />
                    )}

                    {showLabel && <span className="first:tw-ml-3.5 tw-h-full tw-flex tw-items-center">{label}</span>}

                    <div className={wrapperContentClassName}>{contentComponent}</div>

                    {checkBoxPosition === 'right' && checkBox}
                </div>
            </li>
        );
    },
);

TreeItemMultiselect.displayName = 'FondueTreeItemMultiselect';
