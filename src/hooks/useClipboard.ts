import ClipboardJS from "clipboard";
import { useEffect } from "react";

export type ClipboardArgs = {
    selector: string;
    target: string;
    type?: "text" | "target" | "container";
};

export const useClipboard = ({ selector, target, type = "text" }: ClipboardArgs): ClipboardJS => {
    const clipboard = new ClipboardJS(selector, {
        [type]: () => target,
    });

    useEffect(() => {
        return () => clipboard.destroy();
    });

    return clipboard;
};
