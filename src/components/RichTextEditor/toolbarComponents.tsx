/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    IconLink,
    IconListBullets,
    IconListChecklist,
    IconListNumbers,
    IconSize,
    IconSnippet,
    IconTextAlignCenter,
    IconTextAlignJustify,
    IconTextAlignLeft,
    IconTextAlignRight,
    IconTextFormatBold,
    IconTextFormatItalic,
    IconTextFormatStrikethrough,
    IconTextFormatUnderline,
} from '@foundation/Icon';
import {
    AlignToolbarButton,
    ELEMENT_OL,
    ELEMENT_UL,
    getPluginType,
    ListToolbarButton,
    MarkToolbarButton,
    MARK_BOLD,
    MARK_CODE,
    MARK_ITALIC,
    MARK_STRIKETHROUGH,
    MARK_UNDERLINE,
    PlateEditor,
    someNode,
    ToolbarButton,
} from '@udecode/plate';
import React, { FC, ReactElement } from 'react';
import { ELEMENT_CHECK_ITEM } from './plugins/checkboxListPlugin/createCheckboxListPlugin';
import { CheckboxListToolbarButton } from './plugins/checkboxListPlugin/ui/CheckboxListToolbarButton';
import { ELEMENT_LINK_CHOOSER } from './plugins/linkChooserPlugin/types';
import { EditLinkChooserButton } from './plugins/linkChooserPlugin/ui/EditLinkChooserButton';
import { TextStyleDropdown } from './TextStyleDropdown/TextStyleDropdown';
import { IconStylingWrapperProps } from './types';
import { EditorActions } from './utils/actions';
import { TextStyleType } from './utils/getTextStyles';

const classNames = {
    root: 'tw-text-text-weak tw-ml-0.5 hover:tw-bg-box-selected hover:!tw-text-box-selected-inverse hover:tw-rounded',
    active: 'tw-bg-box-selected tw-rounded !tw-text-box-selected-inverse',
};
const styles = { root: { width: '32px', height: '32px' } };

const IconStylingWrapper: FC<IconStylingWrapperProps> = ({ icon }) => {
    return <span className="tw-p-2 tw-h-12 tw-justify-center tw-items-center tw-flex">{icon}</span>;
};

export const toolbarComponents = (
    editor: PlateEditor,
    editorId?: string,
    textStyles?: TextStyleType[],
): Record<EditorActions, ReactElement> => ({
    [EditorActions.TEXT_STYLES]: <TextStyleDropdown editorId={editorId} textStyles={textStyles} />,
    [EditorActions.ALIGN_LEFT]: (
        <AlignToolbarButton
            value="left"
            icon={<IconStylingWrapper icon={<IconTextAlignLeft size={IconSize.Size24} />} />}
            classNames={classNames}
            styles={styles}
        />
    ),
    [EditorActions.ALIGN_CENTER]: (
        <AlignToolbarButton
            value="center"
            icon={<IconStylingWrapper icon={<IconTextAlignCenter size={IconSize.Size24} />} />}
            classNames={classNames}
            styles={styles}
        />
    ),
    [EditorActions.ALIGN_RIGHT]: (
        <AlignToolbarButton
            value="right"
            icon={<IconStylingWrapper icon={<IconTextAlignRight size={IconSize.Size24} />} />}
            classNames={classNames}
            styles={styles}
        />
    ),
    [EditorActions.ALIGN_JUSTIFY]: (
        <AlignToolbarButton
            value="justify"
            icon={<IconStylingWrapper icon={<IconTextAlignJustify size={IconSize.Size24} />} />}
            classNames={classNames}
            styles={styles}
        />
    ),
    [EditorActions.BOLD]: (
        <MarkToolbarButton
            type={getPluginType(editor, MARK_BOLD)}
            icon={<IconStylingWrapper icon={<IconTextFormatBold size={IconSize.Size24} />} />}
            classNames={classNames}
            styles={styles}
        />
    ),
    [EditorActions.ITALIC]: (
        <MarkToolbarButton
            type={getPluginType(editor, MARK_ITALIC)}
            icon={<IconStylingWrapper icon={<IconTextFormatItalic size={IconSize.Size24} />} />}
            classNames={classNames}
            styles={styles}
        />
    ),
    [EditorActions.UNDERLINE]: (
        <MarkToolbarButton
            type={getPluginType(editor, MARK_UNDERLINE)}
            icon={<IconStylingWrapper icon={<IconTextFormatUnderline size={IconSize.Size24} />} />}
            classNames={classNames}
            styles={styles}
        />
    ),
    [EditorActions.STRIKETHROUGH]: (
        <MarkToolbarButton
            type={getPluginType(editor, MARK_STRIKETHROUGH)}
            icon={<IconStylingWrapper icon={<IconTextFormatStrikethrough size={IconSize.Size24} />} />}
            classNames={classNames}
            styles={styles}
        />
    ),
    [EditorActions.CODE]: (
        <MarkToolbarButton
            type={getPluginType(editor, MARK_CODE)}
            icon={<IconStylingWrapper icon={<IconSnippet size={IconSize.Size24} />} />}
            classNames={classNames}
            styles={styles}
        />
    ),
    [EditorActions.CHECK_ITEM]: (
        <CheckboxListToolbarButton
            type={getPluginType(editor, ELEMENT_CHECK_ITEM)}
            icon={<IconStylingWrapper icon={<IconListChecklist size={IconSize.Size24} />} />}
            classNames={classNames}
            styles={styles}
        />
    ),
    [EditorActions.LINK_CHOOSER]: (
        <EditLinkChooserButton
            type={getPluginType(editor, ELEMENT_LINK_CHOOSER)}
            icon={
                <ToolbarButton
                    active={!!editor?.selection && someNode(editor, { match: { ELEMENT_CHECK_ITEM } })}
                    icon={<IconLink size={IconSize.Size24} />}
                    classNames={classNames}
                    styles={styles}
                />
            }
        />
    ),
    [EditorActions.ORDERED_LIST]: (
        <ListToolbarButton
            type={getPluginType(editor, ELEMENT_OL)}
            icon={<IconStylingWrapper icon={<IconListNumbers size={IconSize.Size24} />} />}
            classNames={classNames}
            styles={styles}
        />
    ),
    [EditorActions.UNORDERED_LIST]: (
        <ListToolbarButton
            type={getPluginType(editor, ELEMENT_UL)}
            icon={<IconStylingWrapper icon={<IconListBullets size={IconSize.Size24} />} />}
            classNames={classNames}
            styles={styles}
        />
    ),
});
