/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FOCUS_VISIBLE_STYLE } from '@utilities/focusStyle';
import {
    TreeItemBorderClassMap,
    TreeItemBorderRadiusClassMap,
    TreeItemBorderStyleClassMap,
    TreeItemColorsClassMap,
    TreeItemShadowClassMap,
    TreeItemSpacingClassMap,
    TreeItemStyling,
} from '../types';
import { merge } from '@utilities/merge';

export const getTreeItemStyling = (itemStyle: TreeItemStyling) => {
    const itemStyleProps = {
        spacingY: 'none',
        contentHight: 'single-line',
        shadow: 'none',
        borderRadius: 'small',
        borderWidth: 'none',
        borderStyle: 'none',
        activeColorStyle: 'neutral',
        ...itemStyle,
    };

    itemStyleProps.spacingY = itemStyleProps.spacingY || 'none';

    return itemStyleProps;
};

export const getMultiselectLiClassName = (itemStyleProps: TreeItemStyling, isDisabled: boolean) => {
    const styling = TreeItemColorsClassMap[itemStyleProps.activeColorStyle ?? 'neutral'];
    return merge([
        FOCUS_VISIBLE_STYLE,
        'tw-box-content tw-relative tw-cursor-default tw-transition-colors tw-outline-none tw-ring-inset tw-group tw-no-underline tw-leading-5',
        TreeItemSpacingClassMap[itemStyleProps.spacingY ?? 'none'],
        isDisabled ? 'tw-text-text-disabled' : styling.textColor,
    ]);
};

export const getMultiselectBackgroundClassName = (
    itemStyleProps: TreeItemStyling,
    isSelected: boolean,
    isDisabled: boolean,
) => {
    const styling = TreeItemColorsClassMap[itemStyleProps.activeColorStyle ?? 'neutral'];
    return merge([
        'tw-block tw-absolute tw-inset-0 tw-transition-colors -tw-z-10',
        itemStyleProps.borderWidth !== 'none'
            ? TreeItemBorderRadiusClassMap[itemStyleProps.borderRadius ?? 'small']
            : '',
        (!isSelected || itemStyleProps.activeColorStyle !== 'neutral') && styling.pressedBackgroundColor,
        isDisabled ? TreeItemColorsClassMap['none'].backgroundColor : styling.backgroundColor,
    ]);
};

export const getMultiselectContainerClassName = (itemStyleProps: TreeItemStyling) => {
    const containerBorder =
        itemStyleProps.borderWidth !== 'none'
            ? merge([
                  TreeItemBorderClassMap[itemStyleProps.borderWidth ?? 'none'],
                  TreeItemBorderRadiusClassMap[itemStyleProps.borderRadius ?? 'small'],
                  TreeItemBorderStyleClassMap[itemStyleProps.borderStyle ?? 'none'],
              ])
            : '';

    return merge([
        'tw-relative tw-z-0 tw-transition-colors tw-flex tw-items-center tw-content-center tw-leading-5 tw-width-fit tw-justify-start tw-pl-2',
        TreeItemShadowClassMap[itemStyleProps.shadow ?? 'none'],
        containerBorder,
        TreeItemBorderRadiusClassMap[itemStyleProps.borderRadius ?? 'small'],
        itemStyleProps.contentHight === 'single-line' ? 'tw-h-10' : 'tw-h-fit',
    ]);
};
