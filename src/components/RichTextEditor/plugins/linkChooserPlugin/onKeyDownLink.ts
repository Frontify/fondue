import { KeyboardHandler } from "@udecode/plate-core";
import isHotkey from "is-hotkey";
import { getAndUpsertLink } from "./transforms/getAndUpsertLink";
import { LinkPlugin } from "./types";

// eslint-disable-next-line @typescript-eslint/ban-types
export const onKeyDownLink: KeyboardHandler<{}, LinkPlugin> =
    (editor, { options: { getChosenLink, hotkey } }) =>
    (e) => {
        if (!hotkey) {
            return;
        }

        if (isHotkey(hotkey, e as any)) {
            e.preventDefault();
            e.stopPropagation();

            getAndUpsertLink(editor, getChosenLink);
        }
    };
