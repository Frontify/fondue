/* (c) Copyright Frontify Ltd., all rights reserved. */

import { withRef } from '@udecode/cn';

import { ToolbarButton } from '../../components/Toolbar/ToolbarButton';
import {
    KEY_ALIGN,
    findNode,
    isDefined,
    setAlign,
    useEditorSelector,
    useEditorState,
    useEventPlateId,
} from '@udecode/plate';

export const AlignmentToolbarButton = withRef<
    typeof ToolbarButton,
    {
        value: 'left' | 'right' | 'center' | 'justify';
        editorId: string;
    }
>(({ value, editorId, ...rest }, ref) => {
    const editor = useEditorState(useEventPlateId(editorId));
    const currentAlignment = useEditorSelector((editor) => {
        const entry = findNode(editor, {
            match: (n) => isDefined(n[KEY_ALIGN]),
        });
        if (entry) {
            const nodeValue = entry[0][KEY_ALIGN] as string;
            if (nodeValue === 'right') {
                return 'right';
            }
            if (nodeValue === 'center') {
                return 'center';
            }
            if (nodeValue === 'justify') {
                return 'justify';
            }
        }

        return 'left';
    }, []);

    return (
        <ToolbarButton
            pressed={currentAlignment === value}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => setAlign(editor, { value })}
            ref={ref}
            {...rest}
        />
    );
});
