/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useActor } from "@xstate/react";
import React, { FC, useContext, useEffect, useRef } from "react";
import { usePopper } from "react-popper";
import { ToolbarContext } from "./context/toolbar";
import { useEditorSelection } from "./hooks/useEditorSelection";

export const Toolbar: FC = () => {
    const { machineRef } = useContext(ToolbarContext);

    if (!machineRef) {
        return null;
    }

    const [state, send] = useActor(machineRef);
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
        <div ref={selectionRectRef} style={selectionRect} className="tw-absolute tw-pointer-events-none">
            <div
                ref={inlineToolbarRef}
                className={"tw-popper-container tw-z-10 tw-drop-shadow-md"}
                style={styles.popper}
                {...attributes.popper}
            >
                <div className="tw-flex tw-items-center tw-px-3 tw-py-2 tw-bg-white tw-rounded tw-shadow-mid tw-gap-0.5">
                    {/* <BoldButton {...externalProps} />
                    <ItalicButton {...externalProps} />
                    <UnderlineButton {...externalProps} />
                    <StrikethroughButton {...externalProps} />
                    <CodeButton {...externalProps} />
                    <SubButton {...externalProps} />
                    <SupButton {...externalProps} />
                    <OrderedListButton {...externalProps} />
                    <UnorderedListButton {...externalProps} /> */}
                </div>

                <div
                    ref={inlineToolbarArrowRef}
                    style={styles.arrow}
                    className="tw-popper-arrow tw-absolute tw-w-2 tw-h-2 tw-pointer-events-none before:tw-absolute before:tw-z-10 before:tw-w-2 before:tw-h-2 before:tw-bg-white before:tw-rotate-45"
                ></div>
            </div>
        </div>
    );
};
