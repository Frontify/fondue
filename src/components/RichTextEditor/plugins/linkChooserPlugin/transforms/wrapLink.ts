import { PlateEditor, wrapNodes } from '@udecode/plate-core';
import { Location } from 'slate';
import { ChosenLink, ELEMENT_LINK_CHOOSER } from '../types';

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
            type: ELEMENT_LINK_CHOOSER,
            chosenLink,
            children: [],
        },
        { at, split: true },
    );
};
