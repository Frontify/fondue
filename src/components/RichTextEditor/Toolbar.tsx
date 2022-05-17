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
} from "@foundation/Icon";
import {
    AlignToolbarButton,
    BalloonToolbar,
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
} from "@udecode/plate";
import { merge } from "@utilities/merge";
import React, { FC, ReactElement, useEffect, useRef, useState } from "react";
import { ELEMENT_CHECK_ITEM } from "./plugins/checkboxListPlugin/createCheckboxListPlugin";
import { CheckboxListToolbarButton } from "./plugins/checkboxListPlugin/ui/CheckboxListToolbarButton";
import { ELEMENT_LINK_CHOOSER } from "./plugins/linkChooserPlugin/types";
import { EditLinkChooserButton } from "./plugins/linkChooserPlugin/ui/EditLinkChooserButton";
import { TextStyleDropdown } from "./TextStyleDropdown/TextStyleDropdown";
import { defaultActions, EditorActions } from "./utils/actions";
import { TextStyleType } from "./utils/getTextStyles";

type ToolbarProps = {
    editorId?: string;
    textStyles?: TextStyleType[];
    actions?: EditorActions[][];
};

type iconWrapProps = {
    icon: ReactElement;
};

const classNames = {
    root: "tw-text-text-weak tw-ml-0.5 hover:tw-bg-box-selected hover:!tw-text-box-selected-inverse hover:tw-rounded",
    active: "tw-bg-box-selected tw-rounded !tw-text-box-selected-inverse",
};
const styles = { root: { width: "32px", height: "32px" } };

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
        [EditorActions.LINK_CHOOSER]: (
            <EditLinkChooserButton
                type={getPluginType(editor, ELEMENT_LINK_CHOOSER)}
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

type ButtonGroupProps = {
    index: number;
    editorId?: string;
    actions: EditorActions[];
    textStyles?: TextStyleType[];
    className: string;
    onClose: () => void;
    onLoaded: (index: number, width?: number) => void;
};

const ButtonGroup: FC<ButtonGroupProps> = ({ index, actions, editorId, textStyles, onLoaded, onClose, className }) => {
    const ref = useRef<HTMLDivElement | null>(null);

    const editor = usePlateEditorRef(editorId);

    useEffect(() => {
        onLoaded(index, ref.current?.clientWidth);
        onClose();
    }, [ref.current?.clientWidth]);

    return (
        <div
            ref={ref}
            key={index}
            data-test-id={`toolbar-group-${index}`}
            className={merge([
                "tw-flex tw-items-center tw-border-l tw-border-line tw-h-12 tw-border-b tw-p-2",
                className,
            ])}
        >
            {actions.map((action, index) => (
                <React.Fragment key={index}>{toolbarComponents(editor, editorId, textStyles)[action]}</React.Fragment>
            ))}
        </div>
    );
};

const DEFAULT_MAX_WIDTH = "100%";
const BORDER_PX = 6;

export const Toolbar: FC<ToolbarProps> = ({ editorId, textStyles, actions = [] }) => {
    const toolbarActions = actions.length > 0 ? actions : defaultActions;
    const [buttonGroupsWidths, setButtonGroupsWidths] = useState<{ [index: number]: number | undefined }>({});
    const toolbarRef = useRef<HTMLDivElement | null>(null);
    const [toolbarWidth, setToolbarWidth] = useState<number>(0);
    const [cssStyles, setCssStyles] = useState({ maxWidth: toolbarWidth || DEFAULT_MAX_WIDTH });
    const [borderClassname, setBorderClassname] = useState("");

    useEffect(() => {
        if (toolbarWidth <= 2) {
            return;
        }
        let sum = 0;
        const lengthButtonGroups = Object.entries(buttonGroupsWidths).length;
        const array: number[][] = [...Array(lengthButtonGroups).keys()].map(() => [0]);

        for (const [, value] of Object.entries(buttonGroupsWidths)) {
            sum += value || 0;

            const index = Math.floor(sum / toolbarWidth);
            array[index]?.push(value || 0);
        }
        const width = Math.max(...array.map((element) => element.reduce((prev, curr) => prev + curr), 0));

        const rowNumber = array.reduce((prev, curr) => (curr.length > 1 ? prev + 1 : prev + 0), 0);

        if (rowNumber === 1) {
            setBorderClassname("first:tw-border-l-0 tw-border-b-0 first:tw-border-l-0 tw-border-l");
        } else if (rowNumber === lengthButtonGroups) {
            setBorderClassname("last:tw-border-b-0 tw-border-b tw-border-l-0 tw-flex-grow");
        } else {
            const lastIndexWithButtonGroupElement = lengthButtonGroups - (lengthButtonGroups - rowNumber) - 1;
            const lengthLastElement = array[lastIndexWithButtonGroupElement].length;
            if (lengthLastElement > 2) {
                setBorderClassname("tw-border-t tw-border-l tw-border-b-0 first:tw-border-t-0");
            } else {
                setBorderClassname("first:tw-border-l-0 last:tw-border-b-0 tw-border-b tw-border-l last:tw-border-l-0");
            }
        }

        setCssStyles({ maxWidth: `${width + BORDER_PX}px` });

        return;
    }, [buttonGroupsWidths]);

    useEffect(() => {
        if (!toolbarRef.current) {
            return;
        }
        const resizeObserver = new ResizeObserver((entries) => {
            if (entries.length > 0) {
                setToolbarWidth(entries[0].target.clientWidth);
            }
        });
        if (toolbarRef.current) {
            resizeObserver.observe(toolbarRef.current);
        }

        setToolbarWidth(toolbarRef.current?.clientWidth ?? null);

        return () => {
            toolbarRef.current && resizeObserver?.unobserve(toolbarRef.current);
        };
    }, [toolbarRef.current?.clientWidth]);

    return (
        <BalloonToolbar
            popperOptions={{
                modifiers: [
                    { name: "offset", options: { offset: [0, 12] } },
                    { name: "flip", options: { fallbackPlacements: ["bottom", "right"] } },
                ],
            }}
            styles={{ root: { border: "none", background: "#ffffff" } }}
        >
            <div
                data-test-id="toolbar"
                style={cssStyles}
                className="tw-flex tw-flex-wrap tw-content-start tw-bg-base tw-rounded tw-min-h-12 tw-border tw-border-line tw-shadow-lg"
                ref={toolbarRef}
            >
                {toolbarActions.map((actions, index) => (
                    <ButtonGroup
                        key={index}
                        className={borderClassname}
                        actions={actions}
                        index={index}
                        textStyles={textStyles}
                        editorId={editorId}
                        onLoaded={(index, width) => setButtonGroupsWidths((state) => ({ ...state, [index]: width }))}
                        onClose={() => setCssStyles({ maxWidth: DEFAULT_MAX_WIDTH })}
                    />
                ))}
            </div>
        </BalloonToolbar>
    );
};
