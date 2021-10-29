import ClipboardJS from "clipboard";
import { useEffect, useState } from "react";

export type ClipboardArgs = {
    selector: string;
    target: string;
    type?: "text" | "target" | "container";
};

export const useClipboard = ({ selector, target, type = "text" }: ClipboardArgs): ClipboardJS | null => {
    const [clipboard, setClipboard] = useState<ClipboardJS | null>(null);

    useEffect(() => {
        setClipboard(
            new ClipboardJS(selector, {
                [type]: () => target,
            }),
        );

        return () => {
            if (clipboard) clipboard.destroy();
        };
    }, [target]);

    return clipboard;
};
