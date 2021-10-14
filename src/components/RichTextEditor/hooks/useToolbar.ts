/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useEffect, RefObject, useState, CSSProperties } from "react";
import { getParentWithPositionRelative } from "../utilities/getParentWithPositionRelative";

type UseToolBarReturn = {
    selectionRect: CSSProperties;
    show: boolean;
};

export const useToolbar = (element: RefObject<HTMLElement>, hasFocus: boolean, readonly: boolean): UseToolBarReturn => {
    const documentSelection = document.getSelection();
    const [selectionRect, setSelectionRect] = useState<CSSProperties>({});

    const hasSelectedText = hasFocus && !documentSelection?.isCollapsed;
    const show = !readonly && hasSelectedText;

    useEffect(() => {
        if (!element.current || !hasFocus || !documentSelection) {
            return;
        }

        if (!readonly && hasSelectedText) {
            const rangeRect = documentSelection.getRangeAt(0).getBoundingClientRect();
            const parentWithPositionRelative = element.current && getParentWithPositionRelative(element.current);
            const parentRect = parentWithPositionRelative?.getBoundingClientRect() ?? null;

            setSelectionRect({
                width: `${rangeRect.width}px`,
                height: `${rangeRect.height}px`,
                top: `${rangeRect.y + window.scrollY - (parentRect?.top! ?? 0)}px`,
                left: `${rangeRect.x + window.scrollX - (parentRect?.left! ?? 0)}px`,
            });
        }
    }, [element, hasFocus, documentSelection, show]);

    return { selectionRect, show: !readonly && hasSelectedText };
};
