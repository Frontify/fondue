/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PlateEditor, Value } from '@udecode/plate-core';
import { floatingButtonSelectors } from '../components/index';
import { triggerFloatingButtonEdit } from './triggerFloatingButtonEdit';
import { triggerFloatingButtonInsert } from './triggerFloatingButtonInsert';

export const triggerFloatingButton = <V extends Value>(
    editor: PlateEditor<V>,
    {
        focused,
    }: {
        focused?: boolean;
    } = {},
) => {
    if (floatingButtonSelectors.mode() === 'edit') {
        triggerFloatingButtonEdit(editor);
        return;
    }

    triggerFloatingButtonInsert(editor, {
        focused,
    });
};
