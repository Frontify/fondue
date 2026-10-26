/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type AnchorTarget } from '../../pluginApi/plugin';
import { type EditorOverlay } from '../helpers/overlayContext';

import { useHeldOverlay } from './useHeldOverlay';

/**
 * An overlay's place and focus rules: it renders into the portal container, stays open for moves inside the editor,
 * closes when the document is replaced, and returns focus that a close leaves on `body`. Its anchor is the selection, or
 * `anchor`, such as the range of a mark run that `marks.run` returned, which a function may read each frame.
 */
export const useEditorOverlay = (
    open: boolean,
    setOpen: (open: boolean) => void,
    anchor?: AnchorTarget,
): EditorOverlay => useHeldOverlay(open, setOpen, anchor);
