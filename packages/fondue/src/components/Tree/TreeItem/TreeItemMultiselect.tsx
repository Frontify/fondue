/* (c) Copyright Frontify Ltd., all rights reserved. */

import { noop } from 'lodash-es';
import { Children, type MouseEvent, memo, useCallback, useEffect, useMemo, useRef } from 'react';

import { Checkbox, CheckboxEmphasis, CheckboxSize, CheckboxState } from '@components/Checkbox/Checkbox';
import { Container } from '@components/Container';
import {
    type RegisterNodeChildrenPayload,
    type TreeItemMultiselectProps,
    type TreeItemStyling,
} from '@components/Tree/types';

import { INDENTATION_WIDTH, getMultiselectCheckBoxState } from '../helpers';
import {
    getMultiselectBackgroundClassName,
    getMultiselectContainerClassName,
    getMultiselectLiClassName,
} from '../helpers/multiselectTreeItemstyling';
import { removeFragmentsAndEnrichChildren, useDeepCompareEffect } from '../utils';

import { ExpandButton } from './ExpandButton';
import { useMultiselectTreeItem } from './useMultiselectTreeItem';

/** @private */
type TreeItemPrivateProps = {
    parentId?: string;
    level?: number;
    /** onSelect is passed by the Tree component when cloning the TreeItem */
    onSelect?: (id: string, ignoreRemoveSelected: boolean) => void;
    onExpand?: (id: string) => void;
    onShrink?: (id: string) => void;
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
        registerNodeChildren,
        unregisterNodeChildren,
        isDisabled = false,
        expandable = true,
        checkBoxPosition = 'left',
        itemStyle,
        'data-test-id': dataTestId = 'fondue-tree-item',
    }: InternalTreeItemMultiSelectProps) => {
        const setActiveNodeRef = useRef<HTMLInputElement | null>(null);
        const { isSelected, isExpanded, isPartialSelected, isParentSelected } = useMultiselectTreeItem(id);

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
        }, [id, onSelect, isParentSelected, isSelected, parentId]);

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
                unregisterNodeChildren?.(id);
                return;
            }

            registerNodeChildren?.({ id, children: enrichedChildren });
        }, [isExpanded, enrichedChildren, id]);

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

        const checkBoxOnSelect = isDisabled ? () => {} : () => onSelect?.(id, false);
        const checkBox =
            checkBoxPosition !== 'none' ? (
                <Container maxWidth="16px" maxHeight="16px">
                    <Checkbox
                        id={`checkbox-${id}`}
                        ref={setActiveNodeRef}
                        disabled={isDisabled}
                        aria-label={label ?? ''}
                        emphasis={CheckboxEmphasis.Weak}
                        helperText=""
                        hideLabel
                        label=""
                        onChange={checkBoxOnSelect}
                        size={CheckboxSize.Default}
                        state={
                            isDisabled
                                ? CheckboxState.Unchecked
                                : getMultiselectCheckBoxState(isSelected, isPartialSelected)
                        }
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
                // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
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
                <div className={containerClassName}>
                    <span className={backgroundClassName} style={backgroundStyle} aria-hidden />
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
