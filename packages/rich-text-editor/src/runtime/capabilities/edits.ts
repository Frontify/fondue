/* (c) Copyright Frontify Ltd., all rights reserved. */

import { setAttributes } from './attributes';
import { block, setBlock, wrapIn } from './blocks';
import { indentItem, outdentItem, toggleList } from './lists';
import { removeMark } from './markClear';
import { reapplyMark, setMark } from './markSet';
import { markToggle } from './markToggle';
import { history, indentLines, insertText } from './text';

/** The editor API's edits, each built from its arguments for a model's schema. */
export const EDITS = {
    block,
    history,
    indentItem,
    indentLines,
    insertText,
    outdentItem,
    reapplyMark,
    removeMark,
    setAttributes,
    setBlock,
    setMark,
    toggleList,
    toggleMark: markToggle,
    wrapIn,
} as const;
