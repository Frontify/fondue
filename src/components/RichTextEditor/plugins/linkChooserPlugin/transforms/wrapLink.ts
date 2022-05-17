import { getPluginType, PlateEditor, wrapNodes } from "@udecode/plate-core";
import { Location } from "slate";
import { ELEMENT_LINK_CHOOSER } from "../createLinkChooserPlugin";
import { ChosenLink } from "../types";

/**
 * Wrap selected nodes with a link and collapse at the end.
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export const wrapLink = <T = {}>(
    editor: PlateEditor<T>,
    { at, chosenLink }: { chosenLink: ChosenLink; at?: Location },
) => {
    wrapNodes(
        editor,
        {
            type: getPluginType(editor, ELEMENT_LINK_CHOOSER),
            chosenLink,
            children: [],
        },
        { at, split: true },
    );
};
