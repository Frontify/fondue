/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    IconBold,
    IconItalic,
    IconListBullets,
    IconListNumbers,
    IconSnippet,
    IconTextAlignCenter,
    IconTextAlignJustify,
    IconTextAlignLeft,
    IconTextAlignRight,
    IconUnderline,
} from "@foundation/Icon";
import { IconSize } from "@foundation/Icon/IconSize";
import { merge } from "@utilities/merge";
import React, { FC, useEffect, useRef } from "react";
import { usePopper } from "react-popper";
import { TextStyles } from ".";
import { BlockStyleButton } from "./BlockStyleButton";
import { BlockStyleDropdown } from "./BlockStyleDropdown";
import { useEditorSelection } from "./hooks/useEditorSelection";
import { InlineStyleButton } from "./InlineStyleButton";
import { BlockStyleTypes, TextAlignTypes } from "./renderer/renderBlockStyles";
import { InlineStyles } from "./renderer/renderInlineStyles";

type ToolbarProps = {
    textStyles?: TextStyles[];
};

export const Toolbar: FC<ToolbarProps> = ({ textStyles }) => {
    const selectionRectRef = useRef<HTMLDivElement | null>(null);
    const inlineToolbarRef = useRef<HTMLDivElement | null>(null);
    const inlineToolbarArrowRef = useRef<HTMLDivElement | null>(null);

    const { selectionRect } = useEditorSelection(selectionRectRef);

    const ButtonGroup: FC<React.ReactNode> = ({ children }) => (
        <div className="tw-flex tw-items-center tw-border-r tw-px-3 tw-py-2 tw-border-black-5">{children}</div>
    );

    const {
        styles,
        attributes,
        update: popperUpdate,
    } = usePopper(selectionRectRef.current, inlineToolbarRef.current, {
        placement: "top",
        modifiers: [
            { name: "arrow", options: { element: inlineToolbarArrowRef.current, padding: 10 } },
            { name: "offset", options: { offset: [0, 8] } },
            { name: "flip", options: { fallbackPlacements: ["bottom", "right"] } },
        ],
    });

    useEffect(() => {
        (async () => {
            popperUpdate && (await popperUpdate());
        })();
    }, [selectionRect]);

    return (
        <>
            <div
                ref={selectionRectRef}
                style={selectionRect ?? undefined}
                className="tw-absolute tw-pointer-events-none"
            ></div>
            <div
                ref={inlineToolbarRef}
                data-test-id="toolbar"
                className={merge([
                    "tw-popper-container tw-z-10 tw-drop-shadow-md",
                    !selectionRect && "tw-invisible tw-pointer-events-none",
                ])}
                style={styles.popper}
                {...attributes.popper}
            >
                <div className="tw-flex tw-items-center tw-bg-white tw-rounded tw-shadow-mid tw-gap-0.5">
                    <ButtonGroup>
                        <BlockStyleDropdown textStyles={textStyles} />
                    </ButtonGroup>
                    <ButtonGroup>
                        <BlockStyleButton blockType={BlockStyleTypes.Paragraph} textAlign={TextAlignTypes.AlignJustify}>
                            <IconTextAlignJustify size={IconSize.Size16} />
                        </BlockStyleButton>

                        <BlockStyleButton blockType={BlockStyleTypes.Paragraph} textAlign={TextAlignTypes.AlignLeft}>
                            <IconTextAlignLeft size={IconSize.Size16} />
                        </BlockStyleButton>

                        <BlockStyleButton blockType={BlockStyleTypes.Paragraph} textAlign={TextAlignTypes.AlignCenter}>
                            <IconTextAlignCenter size={IconSize.Size16} />
                        </BlockStyleButton>

                        <BlockStyleButton blockType={BlockStyleTypes.Paragraph} textAlign={TextAlignTypes.AlignRight}>
                            <IconTextAlignRight size={IconSize.Size16} />
                        </BlockStyleButton>
                    </ButtonGroup>
                    <ButtonGroup>
                        <InlineStyleButton style={InlineStyles.Bold}>
                            <IconBold size={IconSize.Size16} />
                        </InlineStyleButton>

                        <InlineStyleButton style={InlineStyles.Italic}>
                            <IconItalic size={IconSize.Size16} />
                        </InlineStyleButton>

                        <InlineStyleButton style={InlineStyles.Underline}>
                            <IconUnderline size={IconSize.Size12} />
                        </InlineStyleButton>

                        <InlineStyleButton style={InlineStyles.Strikethrough}>s</InlineStyleButton>

                        <InlineStyleButton style={InlineStyles.Code}>
                            <IconSnippet size={IconSize.Size16} />
                        </InlineStyleButton>

                        <BlockStyleButton blockType={BlockStyleTypes.OrderedList}>
                            <IconListNumbers size={IconSize.Size12} />
                        </BlockStyleButton>

                        <BlockStyleButton blockType={BlockStyleTypes.UnorderedList}>
                            <IconListBullets size={IconSize.Size16} />
                        </BlockStyleButton>
                    </ButtonGroup>
                </div>

                <div
                    ref={inlineToolbarArrowRef}
                    style={styles.arrow}
                    className="tw-popper-arrow tw-absolute tw-w-2 tw-h-2 tw-pointer-events-none before:tw-absolute before:tw-z-10 before:tw-w-2 before:tw-h-2 before:tw-bg-white before:tw-rotate-45"
                ></div>
            </div>
        </>
    );
};
