/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ReactPresentation } from '#/react/types';

/** Every shipped control, so a feature story reaches its feature by pointer; a group keeps only the commands the definition installs. */
export const FEATURE_TOOLBAR: ReactPresentation['toolbar'] = [
    ['history.undo', 'history.redo'],
    ['text-style'],
    ['mark.bold.toggle', 'mark.italic.toggle', 'mark.underline.toggle', 'mark.strike.toggle', 'mark.code.toggle'],
    ['mark.subscript.toggle', 'mark.superscript.toggle'],
    ['list.bullet.toggle', { command: 'list.ordered.toggle', payload: { start: 1 } }, 'list.task.toggle'],
    ['quote.toggle', 'code-block.toggle', 'emoji.picker.open'],
];
