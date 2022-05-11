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
    BalloonToolbar,
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
    someNode,
    ToolbarButton,
    usePlateEditorRef,
} from '@udecode/plate';
import React, { FC, ReactElement } from 'react';
import { ELEMENT_CHECK_ITEM } from './plugins/checkboxListPlugin/createCheckboxListPlugin';
import { CheckboxListToolbarButton } from './plugins/checkboxListPlugin/ui/CheckboxListToolbarButton';
import { EditLinkChooserButton } from './plugins/linkChooserPlugin/ui/EditLinkChooserButton';
import { TextStyleDropdown } from './TextStyleDropdown/TextStyleDropdown';
import { defaultActions, EditorActions } from './utils/actions';
import { TextStyleType } from './utils/getTextStyles';

type ToolbarProps = {
    editorId?: string;
    textStyles?: TextStyleType[];
    actions?: EditorActions[][];
};

type iconWrapProps = {
    icon: ReactElement;
};

const classNames = {
    root: 'tw-text-text-weak tw-ml-0.5 hover:tw-bg-box-selected hover:!tw-text-box-selected-inverse hover:tw-rounded',
    active: 'tw-bg-box-selected tw-rounded !tw-text-box-selected-inverse',
};
const styles = { root: { width: '32px', height: '32px' } };

const WrapIconStyling: FC<iconWrapProps> = ({ icon }) => {
    return <span className="tw-p-2 tw-h-12 tw-justify-center tw-items-center tw-flex">{icon}</span>;
};

const toolbarComponents = (
    editor: PlateEditor,
    editorId?: string,
    textStyles?: TextStyleType[],
): Record<EditorActions, ReactElement> => {
    return {
        [EditorActions.TEXT_STYLES]: <TextStyleDropdown editorId={editorId} textStyles={textStyles} />,
        [EditorActions.ALIGN_LEFT]: (
            <AlignToolbarButton
                value="left"
                icon={<WrapIconStyling icon={<IconTextAlignLeft size={IconSize.Size24} />} />}
                classNames={classNames}
                styles={styles}
            />
        ),
        [EditorActions.ALIGN_CENTER]: (
            <AlignToolbarButton
                value="center"
                icon={<WrapIconStyling icon={<IconTextAlignCenter size={IconSize.Size24} />} />}
                classNames={classNames}
                styles={styles}
            />
        ),
        [EditorActions.ALIGN_RIGHT]: (
            <AlignToolbarButton
                value="right"
                icon={<WrapIconStyling icon={<IconTextAlignRight size={IconSize.Size24} />} />}
                classNames={classNames}
                styles={styles}
            />
        ),
        [EditorActions.ALIGN_JUSTIFY]: (
            <AlignToolbarButton
                value="justify"
                icon={<WrapIconStyling icon={<IconTextAlignJustify size={IconSize.Size24} />} />}
                classNames={classNames}
                styles={styles}
            />
        ),
        [EditorActions.BOLD]: (
            <MarkToolbarButton
                type={getPluginType(editor, MARK_BOLD)}
                icon={<WrapIconStyling icon={<IconTextFormatBold size={IconSize.Size24} />} />}
                classNames={classNames}
                styles={styles}
            />
        ),
        [EditorActions.ITALIC]: (
            <MarkToolbarButton
                type={getPluginType(editor, MARK_ITALIC)}
                icon={<WrapIconStyling icon={<IconTextFormatItalic size={IconSize.Size24} />} />}
                classNames={classNames}
                styles={styles}
            />
        ),
        [EditorActions.UNDERLINE]: (
            <MarkToolbarButton
                type={getPluginType(editor, MARK_UNDERLINE)}
                icon={<WrapIconStyling icon={<IconTextFormatUnderline size={IconSize.Size24} />} />}
                classNames={classNames}
                styles={styles}
            />
        ),
        [EditorActions.STRIKETHROUGH]: (
            <MarkToolbarButton
                type={getPluginType(editor, MARK_STRIKETHROUGH)}
                icon={<WrapIconStyling icon={<IconTextFormatStrikethrough size={IconSize.Size24} />} />}
                classNames={classNames}
                styles={styles}
            />
        ),
        [EditorActions.CODE]: (
            <MarkToolbarButton
                type={getPluginType(editor, MARK_CODE)}
                icon={<WrapIconStyling icon={<IconSnippet size={IconSize.Size24} />} />}
                classNames={classNames}
                styles={styles}
            />
        ),
        [EditorActions.CHECK_ITEM]: (
            <CheckboxListToolbarButton
                type={getPluginType(editor, ELEMENT_CHECK_ITEM)}
                icon={<WrapIconStyling icon={<IconListChecklist size={IconSize.Size24} />} />}
                classNames={classNames}
                styles={styles}
            />
        ),
        [EditorActions.LINK]: (
            <EditLinkChooserButton
                type={getPluginType(editor, ELEMENT_LINK)}
                icon={
                    <ToolbarButton
                        active={!!editor?.selection && someNode(editor, { match: { ELEMENT_CHECK_ITEM } })}
                        icon={<WrapIconStyling icon={<IconLink size={IconSize.Size24} />} />}
                        classNames={classNames}
                        styles={styles}
                    />
                }
            />
        ),
        [EditorActions.ORDERED_LIST]: (
            <ListToolbarButton
                type={getPluginType(editor, ELEMENT_OL)}
                icon={<WrapIconStyling icon={<IconListNumbers size={IconSize.Size24} />} />}
                classNames={classNames}
                styles={styles}
            />
        ),
        [EditorActions.UNORDERED_LIST]: (
            <ListToolbarButton
                type={getPluginType(editor, ELEMENT_UL)}
                icon={<WrapIconStyling icon={<IconListBullets size={IconSize.Size24} />} />}
                classNames={classNames}
                styles={styles}
            />
        ),
    };
};

export const Toolbar: FC<ToolbarProps> = ({ editorId, textStyles, actions = [] }) => {
    const editor = usePlateEditorRef(editorId);
    const toolbarActions = actions.length > 0 ? actions : defaultActions;

    return (
        <BalloonToolbar
            popperOptions={{
                modifiers: [
                    { name: 'offset', options: { offset: [0, 12] } },
                    { name: 'flip', options: { fallbackPlacements: ['bottom', 'right'] } },
                ],
            }}
            styles={{ root: { border: 'none', background: '#ffffff', margin: '8px' } }}
        >
            <div
                data-test-id="toolbar"
                className="tw-flex tw-flex-wrap tw-content-start tw-shadow-lg tw-border tw-bg-base tw-rounded tw-border-line tw-min-h-12"
            >
                {toolbarActions.map((actions, index) => (
                    <div
                        key={index}
                        data-test-id={`toolbar-group-${index}`}
                        className="tw-flex tw-items-center tw-border-l tw-border-line tw-h-12 tw-border-b tw-p-2"
                    >
                        {actions.map((action, index) => (
                            <React.Fragment key={index}>
                                {toolbarComponents(editor, editorId, textStyles)[action]}
                            </React.Fragment>
                        ))}
                    </div>
                ))}
            </div>
        </BalloonToolbar>
    );
};
