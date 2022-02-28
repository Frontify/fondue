/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import {
    getPreventDefaultHandler,
    toggleNodeType,
    ToolbarButton,
    ToolbarButtonProps,
    ToolbarDropdown,
    usePlateEditorState,
    withPlateProvider,
} from "@udecode/plate";
import React, { useCallback } from "react";
import { TextStyles } from "./utils/getTextStyles";

export const TextStyleDropdown = withPlateProvider((props: ToolbarButtonProps) => {
    const [open, setOpen] = React.useState(false);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const editor = usePlateEditorState()!;

    const onToggle = useCallback(() => {
        setOpen(!open);
    }, [open, setOpen]);

    // const selectHandler = useCallback(
    //     (lineHeight) => {
    //         if (editor) {
    //             ReactEditor.focus(editor);

    //             setLineHeight(editor, {
    //                 value: lineHeight,
    //             });
    //         }
    //     },
    //     [editor],
    // );

    return (
        <ToolbarDropdown
            control={<ToolbarButton onMouseDown={editor ? getPreventDefaultHandler() : undefined} {...props} />}
            open={open}
            onOpen={onToggle}
            onClose={onToggle}
        >
            <span
                onMouseDown={
                    editor &&
                    getPreventDefaultHandler(toggleNodeType, editor, {
                        activeType: TextStyles.ELEMENT_HEADING1,
                    })
                }
            >
                Heading 1
            </span>
            <span
                onMouseDown={
                    editor &&
                    getPreventDefaultHandler(toggleNodeType, editor, {
                        activeType: TextStyles.ELEMENT_HEADING2,
                    })
                }
            >
                Heading 2
            </span>
        </ToolbarDropdown>
    );
});
