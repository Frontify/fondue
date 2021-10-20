import { useEffect, RefObject, useState, CSSProperties } from "react";
import { getParentWithPositionRelative } from "../utils/getParentWithPositionRelative";

export const useEditorSelection = (element: RefObject<HTMLElement>): { selectionRect: CSSProperties } => {
    const documentSelection = document.getSelection();
    const [selectionRect, setSelectionRect] = useState<CSSProperties>({});

    useEffect(() => {
        if (!element.current || !documentSelection) {
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
    }, [element, documentSelection]);

    return { selectionRect };
};
