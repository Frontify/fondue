/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    IconButton,
    IconLink,
    IconListBullet,
    IconListCheck,
    IconListNumbers,
    IconSize,
    IconTextAlignmentCentre,
    IconTextAlignmentJustify,
    IconTextAlignmentLeft,
    IconTextAlignmentRight,
    IconTextBrackets,
    IconTextFormatBold,
    IconTextFormatItalic,
    IconTextFormatStrikethrough,
    IconTextFormatUnderline,
} from '@foundation/Icon';
import {
    AlignToolbarButton,
    ELEMENT_OL,
    ELEMENT_UL,
    LinkToolbarButton,
    ListToolbarButton,
    MARK_BOLD,
    MARK_CODE,
    MARK_ITALIC,
    MARK_STRIKETHROUGH,
    MARK_UNDERLINE,
    MarkToolbarButton,
    PlateEditor,
    getPluginType,
    usePlateEditorRef,
} from '@udecode/plate';
import { FC, default as React, ReactElement } from 'react';
import { ELEMENT_CHECK_ITEM } from '../../Plugins/CheckboxListPlugin/id';
import { CheckboxListToolbarButton } from '../../Plugins/CheckboxListPlugin/CheckboxListButton/CheckboxListToolbarButton';
import { TextStyleDropdown } from '../../Plugins/TextStylePlugin/TextStyleDropdown';
import { ButtonGroupProps, IconStylingWrapperProps } from '../../types';
import { EditorActions } from '../../utils/actions';
import { ButtonToolbarButton } from '@components/RichTextEditor/Plugins/ButtonPlugin/components/ButtonToolbarButton';
import { ELEMENT_BUTTON } from '@components/RichTextEditor/Plugins';
const classNames = {
    root: 'tw-text-text-weak tw-ml-0.5 hover:tw-bg-box-selected hover:!tw-text-box-selected-inverse hover:tw-rounded',
    active: 'tw-bg-box-selected tw-rounded !tw-text-box-selected-inverse',
};
const styles = { root: { width: '24px', height: '24px' } };

const IconStylingWrapper: FC<IconStylingWrapperProps> = ({ icon }) => (
    <span className="tw-p-2 tw-h-8 tw-justify-center tw-items-center tw-flex">{icon}</span>
);

export const ButtonGroup: FC<ButtonGroupProps> = ({ index, actions, editorId }) => {
    const editor = usePlateEditorRef(editorId);

    return (
        editor && (
            <div key={index} data-test-id={`toolbar-group-${index}`} className="tw-flex tw-items-center tw-h-9 tw-p-2">
                {actions.map((action) => (
                    <div key={action}>{ToolbarButtonMap(editor, editorId)[action]}</div>
                ))}
            </div>
        )
    );
};

const ToolbarButtonMap = (editor: PlateEditor, editorId?: string): Record<EditorActions, ReactElement> => ({
    [EditorActions.TEXT_STYLES]: <TextStyleDropdown editorId={editorId} />,
    [EditorActions.ALIGN_LEFT]: (
        <AlignToolbarButton
            value="left"
            icon={<IconStylingWrapper icon={<IconTextAlignmentLeft size={IconSize.Size16} />} />}
            classNames={classNames}
            styles={styles}
        />
    ),
    [EditorActions.ALIGN_CENTER]: (
        <AlignToolbarButton
            value="center"
            icon={<IconStylingWrapper icon={<IconTextAlignmentCentre size={IconSize.Size16} />} />}
            classNames={classNames}
            styles={styles}
        />
    ),
    [EditorActions.ALIGN_RIGHT]: (
        <AlignToolbarButton
            value="right"
            icon={<IconStylingWrapper icon={<IconTextAlignmentRight size={IconSize.Size16} />} />}
            classNames={classNames}
            styles={styles}
        />
    ),
    [EditorActions.ALIGN_JUSTIFY]: (
        <AlignToolbarButton
            value="justify"
            icon={<IconStylingWrapper icon={<IconTextAlignmentJustify size={IconSize.Size16} />} />}
            classNames={classNames}
            styles={styles}
        />
    ),
    [EditorActions.BOLD]: (
        <MarkToolbarButton
            type={getPluginType(editor, MARK_BOLD)}
            icon={<IconStylingWrapper icon={<IconTextFormatBold size={IconSize.Size16} />} />}
            classNames={classNames}
            styles={styles}
        />
    ),
    [EditorActions.ITALIC]: (
        <MarkToolbarButton
            type={getPluginType(editor, MARK_ITALIC)}
            icon={<IconStylingWrapper icon={<IconTextFormatItalic size={IconSize.Size16} />} />}
            classNames={classNames}
            styles={styles}
        />
    ),
    [EditorActions.UNDERLINE]: (
        <MarkToolbarButton
            type={getPluginType(editor, MARK_UNDERLINE)}
            icon={<IconStylingWrapper icon={<IconTextFormatUnderline size={IconSize.Size16} />} />}
            classNames={classNames}
            styles={styles}
        />
    ),
    [EditorActions.STRIKETHROUGH]: (
        <MarkToolbarButton
            type={getPluginType(editor, MARK_STRIKETHROUGH)}
            icon={<IconStylingWrapper icon={<IconTextFormatStrikethrough size={IconSize.Size16} />} />}
            classNames={classNames}
            styles={styles}
        />
    ),
    [EditorActions.CODE]: (
        <MarkToolbarButton
            type={getPluginType(editor, MARK_CODE)}
            icon={<IconStylingWrapper icon={<IconTextBrackets size={IconSize.Size16} />} />}
            classNames={classNames}
            styles={styles}
        />
    ),
    [EditorActions.CHECK_ITEM]: (
        <CheckboxListToolbarButton
            type={getPluginType(editor, ELEMENT_CHECK_ITEM)}
            icon={<IconStylingWrapper icon={<IconListCheck size={IconSize.Size16} />} />}
            classNames={classNames}
            styles={styles}
        />
    ),
    [EditorActions.LINK]: (
        <LinkToolbarButton
            icon={<IconStylingWrapper icon={<IconLink size={IconSize.Size16} />} />}
            classNames={classNames}
            styles={styles}
        />
    ),
    [EditorActions.BUTTON]: (
        <ButtonToolbarButton
            type={getPluginType(editor, ELEMENT_BUTTON)}
            icon={<IconStylingWrapper icon={<IconButton size={IconSize.Size16} />} />}
            classNames={classNames}
            styles={styles}
        />
    ),
    [EditorActions.ORDERED_LIST]: (
        <ListToolbarButton
            type={getPluginType(editor, ELEMENT_OL)}
            icon={<IconStylingWrapper icon={<IconListNumbers size={IconSize.Size16} />} />}
            classNames={classNames}
            styles={styles}
        />
    ),
    [EditorActions.UNORDERED_LIST]: (
        <ListToolbarButton
            type={getPluginType(editor, ELEMENT_UL)}
            icon={<IconStylingWrapper icon={<IconListBullet size={IconSize.Size16} />} />}
            classNames={classNames}
            styles={styles}
        />
    ),
});
