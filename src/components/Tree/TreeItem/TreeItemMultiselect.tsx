/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Children, MouseEvent, memo, useCallback, useEffect, useMemo, useRef } from 'react';
import noop from 'lodash-es/noop';

import { merge } from '@utilities/merge';
import { FOCUS_VISIBLE_STYLE } from '@utilities/focusStyle';

import {
    type RegisterNodeChildrenPayload,
    TreeItemBorderClassMap,
    TreeItemBorderRadiusClassMap,
    TreeItemBorderStyleClassMap,
    TreeItemColorsClassMap,
    TreeItemMultiselectProps,
    TreeItemShadowClassMap,
    TreeItemSpacingClassMap,
    TreeItemStyling,
} from '@components/Tree/types';

import { INDENTATION_WIDTH, Projection } from '../helpers';
import { removeFragmentsAndEnrichChildren, useDeepCompareEffect } from '../utils';

import { ExpandButton } from './ExpandButton';
import { Checkbox, CheckboxEmphasis, CheckboxSize, CheckboxState } from '@components/Checkbox/Checkbox';
import { Container } from '@components/Container';
import { useTreeItem } from './useTreeItem';

/** @private */
type TreeItemPrivateProps = {
    parentId?: string;
    level?: number;
    isExpanded?: boolean;
    /** onSelect is passed by the Tree component when cloning the TreeItem */
    onSelect?: (id: string, ignoreRemoveSelected: boolean) => void;
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
        }, [id, onSelect, isParentSelected, isSelected]);

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
            if (Children.count(enrichedChildren) === 0) {
                unregisterNodeChildren?.(id);
                return;
            }

            if (isExpanded) {
                registerNodeChildren?.({ id, children: enrichedChildren });
            } else {
                unregisterNodeChildren?.(id);
            }
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

        const styling = TreeItemColorsClassMap[itemStyleProps.activeColorStyle ?? 'neutral'];

        const { liClassName, backgroundClassName } = useMemo(() => {
            return {
                liClassName: merge([
                    FOCUS_VISIBLE_STYLE,
                    'tw-box-content tw-relative tw-cursor-default tw-transition-colors tw-outline-none tw-ring-inset tw-group tw-no-underline tw-leading-5',
                    styling.textColor,
                    TreeItemSpacingClassMap[itemStyleProps.spacingY ?? 'none'],
                    isDisabled ? 'tw-text-text-disabled' : '',
                ]),
                backgroundClassName: merge([
                    'tw-block tw-absolute tw-inset-0 tw-transition-colors -tw-z-10',
                    itemStyleProps.borderWidth !== 'none'
                        ? TreeItemBorderRadiusClassMap[itemStyleProps.borderRadius ?? 'small']
                        : '',
                    (!isSelected || itemStyleProps.activeColorStyle !== 'neutral') && styling.pressedBackgroundColor,
                    styling.backgroundColor,
                ]),
            };
        }, [
            styling.textColor,
            styling.pressedBackgroundColor,
            styling.backgroundColor,
            itemStyleProps.spacingY,
            itemStyleProps.borderWidth,
            itemStyleProps.borderRadius,
            itemStyleProps.activeColorStyle,
            isDisabled,
            isSelected,
        ]);

        const wrapperContentClassName = 'tw-max-w-full	tw-grow';
        const showChildren = isExpanded;
        const showLabel = label !== undefined;
        const showExpandButton = expandable && (showCaret === undefined ? hasChildren : showCaret);

        const containerBorder =
            itemStyleProps.borderWidth !== 'none'
                ? merge([
                      TreeItemBorderClassMap[itemStyleProps.borderWidth ?? 'none'],
                      TreeItemBorderRadiusClassMap[itemStyleProps.borderRadius ?? 'small'],
                      TreeItemBorderStyleClassMap[itemStyleProps.borderStyle ?? 'none'],
                  ])
                : '';

        const containerClassName = merge([
            'tw-relative tw-z-0 tw-transition-colors tw-flex tw-items-center tw-content-center tw-leading-5 tw-width-fit tw-justify-start tw-pl-2',
            TreeItemShadowClassMap[itemStyleProps.shadow ?? 'none'],
            containerBorder,
            TreeItemBorderRadiusClassMap[itemStyleProps.borderRadius ?? 'small'],
            itemStyleProps.contentHight === 'single-line' ? 'tw-h-10' : 'tw-h-fit',
        ]);

        const levelPadding = level * INDENTATION_WIDTH;
        const liStyle = { paddingLeft: levelPadding };
        const backgroundStyle = itemStyleProps.borderWidth !== 'none' ? {} : { marginLeft: -1 * levelPadding };

        const style = {};
        let theCheckboxState = CheckboxState.Unchecked;
        if (isSelected) {
            theCheckboxState = CheckboxState.Checked;
        } else if (isPartialSelected) {
            theCheckboxState = CheckboxState.Mixed;
        }

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
                        onChange={() => (isDisabled ? void 0 : onSelect?.(id, false))}
                        size={CheckboxSize.Default}
                        state={theCheckboxState}
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
