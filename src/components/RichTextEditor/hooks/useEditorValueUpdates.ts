/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useEffect, useRef } from "react";
import { Editor, Transforms } from "slate";
import { clearEditor } from "../utils/editor/clear";
import { parseRawValue } from "../utils/editor/parseRawContent";

/**
 * Updates the editor value when the initival value changes
 */
export const useEditorValueUpdates = (editor: Editor, initialValue?: string): void => {
    const rawValue = useRef<string | null>(null);

    useEffect(() => {
        if (null === rawValue.current) {
            rawValue.current = initialValue ?? null;
        }
        if (rawValue.current !== initialValue) {
            clearEditor(editor);
            Transforms.insertNodes(editor, parseRawValue(initialValue));
            rawValue.current = initialValue ?? null;
        }
    }, [initialValue]);
};
