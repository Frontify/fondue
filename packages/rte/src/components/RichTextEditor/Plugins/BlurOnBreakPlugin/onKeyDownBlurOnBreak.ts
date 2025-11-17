/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Hotkeys, type KeyboardHandlerReturnType, type PlateEditor, type WithPlatePlugin } from '@udecode/plate-core';
import { type Value } from '@udecode/slate';

import { forceToBlurActiveElement } from '@components/RichTextEditor/helpers';

import { type BlurOnBreakPlatePlugin } from './types';

export const onKeyDownBlurOnBreak =
    <V extends Value = Value, E extends PlateEditor<V> = PlateEditor<V>>(
        editor: E,
        { options: { onBreak = () => undefined } }: WithPlatePlugin<BlurOnBreakPlatePlugin<V>, V, E>,
    ): KeyboardHandlerReturnType =>
    (event) => {
        if (Hotkeys.isSplitBlock(event)) {
            event.stopPropagation();
            event.preventDefault();
            forceToBlurActiveElement();
            if (typeof onBreak === 'function') {
                onBreak(editor.children);
            }
        }
    };
