/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    IconListBullets,
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
    ELEMENT_LINK,
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
    usePlateEditorRef,
} from '@udecode/plate';
import { default as React, FC, ReactElement } from 'react';
import { ELEMENT_CHECK_ITEM } from '../../plugins/checkboxListPlugin/createCheckboxListPlugin';
import { CheckboxListToolbarButton } from '../../plugins/checkboxListPlugin/ui/CheckboxListToolbarButton';
import { EditLinkChooserButton } from '../../plugins/linkChooserPlugin/ui/EditLinkChooserButton';
import { TextStyleDropdown } from '../../TextStyleDropdown/TextStyleDropdown';
import { ButtonGroupProps, DesignTokens, IconStylingWrapperProps } from '../../types';
import { EditorActions } from '../../utils/actions';
const classNames = {
    root: 'tw-text-text-weak tw-ml-0.5 hover:tw-bg-box-selected hover:!tw-text-box-selected-inverse hover:tw-rounded',
    active: 'tw-bg-box-selected tw-rounded !tw-text-box-selected-inverse',
};
const styles = { root: { width: '32px', height: '32px' } };

const IconStylingWrapper: FC<IconStylingWrapperProps> = ({ icon }) => (
    <span className="tw-p-2 tw-h-12 tw-justify-center tw-items-center tw-flex">{icon}</span>
);

export const ButtonGroup: FC<ButtonGroupProps> = ({ index, actions, editorId, designTokens }) => {
    const editor = usePlateEditorRef(editorId);

    return (
        <div key={index} data-test-id={`toolbar-group-${index}`} className="tw-flex tw-items-center tw-h-12 tw-p-2">
            {actions.map((action) => (
                <div key={action}>{ToolbarButtonMap(editor, designTokens, editorId)[action]}</div>
            ))}
        </div>
    );
};

const ToolbarButtonMap = (
    editor: PlateEditor,
    designTokens: DesignTokens,
    editorId?: string,
): Record<EditorActions, ReactElement> => ({
    [EditorActions.TEXT_STYLES]: <TextStyleDropdown editorId={editorId} designTokens={designTokens} />,
    [EditorActions.ALIGN_LEFT]: (
        <AlignToolbarButton
            value="left"
            icon={<IconStylingWrapper icon={<IconTextAlignmentLeft size={IconSize.Size24} />} />}
            classNames={classNames}
            styles={styles}
        />
    ),
    [EditorActions.ALIGN_CENTER]: (
        <AlignToolbarButton
            value="center"
            icon={<IconStylingWrapper icon={<IconTextAlignmentCentre size={IconSize.Size24} />} />}
            classNames={classNames}
            styles={styles}
        />
    ),
    [EditorActions.ALIGN_RIGHT]: (
        <AlignToolbarButton
            value="right"
            icon={<IconStylingWrapper icon={<IconTextAlignmentRight size={IconSize.Size24} />} />}
            classNames={classNames}
            styles={styles}
        />
    ),
    [EditorActions.ALIGN_JUSTIFY]: (
        <AlignToolbarButton
            value="justify"
            icon={<IconStylingWrapper icon={<IconTextAlignmentJustify size={IconSize.Size24} />} />}
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
            icon={<IconStylingWrapper icon={<IconTextBrackets size={IconSize.Size24} />} />}
            classNames={classNames}
            styles={styles}
        />
    ),
    [EditorActions.CHECK_ITEM]: (
        <CheckboxListToolbarButton
            type={getPluginType(editor, ELEMENT_CHECK_ITEM)}
            icon={<IconStylingWrapper icon={<IconListCheck size={IconSize.Size24} />} />}
            classNames={classNames}
            styles={styles}
        />
    ),
    [EditorActions.LINK]: (
        <EditLinkChooserButton classNames={classNames} styles={styles} type={getPluginType(editor, ELEMENT_LINK)} />
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
