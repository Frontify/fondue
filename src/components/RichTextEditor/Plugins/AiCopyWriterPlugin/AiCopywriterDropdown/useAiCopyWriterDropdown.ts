/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PlateEditor, usePlateEditorState } from '@udecode/plate';
import { Dispatch, HTMLAttributes, SetStateAction, useState } from 'react';
import { usePopper } from 'react-popper';
import { verticalPositionModifier } from './verticalPositionModifier';

type UseAiCopyWriterDropdownReturn<P> = {
    editor: PlateEditor;
    dropdownProps: HTMLAttributes<P>;
    dropdownRef: Dispatch<SetStateAction<P | null>>;
};

export const useAiCopyWriterDropdown = <P extends HTMLElement>(editorId?: string): UseAiCopyWriterDropdownReturn<P> => {
    const [popperElement, setPopperElement] = useState<P | null>(null);
    const editor = usePlateEditorState(editorId);

    const popperInstance = usePopper<'offset' | 'flip' | 'vertical-positioning'>(null, popperElement, {
        placement: 'bottom-start',
        strategy: 'fixed',
        modifiers: [
            {
                name: 'offset',
                options: {
                    offset: [0, 6],
                },
            },
            {
                name: 'flip',
                enabled: false,
            },
            verticalPositionModifier,
        ],
    });

    return {
        editor,
        dropdownProps: {
            ...popperInstance.attributes.popper,
            style: popperInstance.styles.popper,
        },
        dropdownRef: setPopperElement,
    };
};
