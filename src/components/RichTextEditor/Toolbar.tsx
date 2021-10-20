/* (c) Copyright Frontify Ltd., all rights reserved. */

import { merge } from "@utilities/merge";
import React, { FC, useEffect, useRef } from "react";
import { usePopper } from "react-popper";
import { useEditorSelection } from "./hooks/useEditorSelection";
import {
    BoldButton,
    CodeButton,
    ItalicButton,
    OrderedListButton,
    StrikethroughButton,
    SubButton,
    SupButton,
    UnderlineButton,
    UnorderedListButton,
} from "./styling-controls";

export const Toolbar: FC = () => {
    const selectionRectRef = useRef<HTMLDivElement | null>(null);
    const inlineToolbarRef = useRef<HTMLDivElement | null>(null);
    const inlineToolbarArrowRef = useRef<HTMLDivElement | null>(null);

    const { selectionRect } = useEditorSelection(selectionRectRef);

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
                className={merge([
                    "tw-popper-container tw-z-10 tw-drop-shadow-md",
                    !selectionRect && "tw-invisible tw-pointer-events-none",
                ])}
                style={styles.popper}
                {...attributes.popper}
            >
                <div className="tw-flex tw-items-center tw-px-3 tw-py-2 tw-bg-white tw-rounded tw-shadow-mid tw-gap-0.5">
                    <BoldButton />
                    <ItalicButton />
                    <UnderlineButton />
                    <StrikethroughButton />
                    <CodeButton />
                    <SubButton />
                    <SupButton />
                    <OrderedListButton />
                    <UnorderedListButton />
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
