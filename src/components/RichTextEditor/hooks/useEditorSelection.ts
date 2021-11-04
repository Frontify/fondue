/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useEffect, RefObject, useState, CSSProperties } from "react";
import { getParentWithPositionRelative } from "../utils/getParentWithPositionRelative";

export const useEditorSelection = (element: RefObject<HTMLElement>): { selectionRect: CSSProperties | null } => {
    const documentSelection = document.getSelection();
    const [selectionRect, setSelectionRect] = useState<CSSProperties | null>(null);

    useEffect(() => {
        if (!element.current || !documentSelection || documentSelection.rangeCount === 0) {
            return;
        }

        const rangeRect = documentSelection.getRangeAt(0).getBoundingClientRect();
        const parentWithPositionRelative = element.current && getParentWithPositionRelative(element.current);
        const parentRect = parentWithPositionRelative?.getBoundingClientRect();

        setSelectionRect({
            width: `${rangeRect.width}px`,
            height: `${rangeRect.height}px`,
            top: `${rangeRect.y + window.scrollY - (parentRect?.top ? parentRect?.top : 0)}px`,
            left: `${rangeRect.x + window.scrollX - (parentRect?.left ? parentRect?.left : 0)}px`,
        });
    }, [element, documentSelection?.anchorOffset]);

    return { selectionRect };
};
