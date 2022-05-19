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
} from "@foundation/Icon";
import {
    AlignToolbarButton,
    BlockToolbarButton,
    ELEMENT_OL,
    ELEMENT_UL,
    getPluginType,
    LinkToolbarButton,
    ListToolbarButton,
    MarkToolbarButton,
    MARK_BOLD,
    MARK_CODE,
    MARK_ITALIC,
    MARK_STRIKETHROUGH,
    MARK_UNDERLINE,
    PlateEditor,
} from "@udecode/plate";
import React, { ReactElement } from "react";
import { ELEMENT_CHECK_ITEM } from "./plugins/checkboxListPlugin";
import { TextStyleDropdown } from "./TextStyleDropdown/TextStyleDropdown";
import { classNames, IconStylingWrapper, styles } from "./Toolbar";
import { EditorActions } from "./utils/actions";
import { TextStyleType } from "./utils/getTextStyles";

export const toolbarComponents = (
    editor: PlateEditor,
    editorId?: string,
    textStyles?: TextStyleType[],
): Record<EditorActions, ReactElement> => {
    return {
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
            <BlockToolbarButton
                type={getPluginType(editor, ELEMENT_CHECK_ITEM)}
                icon={<IconStylingWrapper icon={<IconListChecklist size={IconSize.Size24} />} />}
                classNames={classNames}
                styles={styles}
            />
        ),
        [EditorActions.LINK]: (
            <LinkToolbarButton
                icon={<IconStylingWrapper icon={<IconLink size={IconSize.Size24} />} />}
                classNames={classNames}
                styles={styles}
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
    };
};
