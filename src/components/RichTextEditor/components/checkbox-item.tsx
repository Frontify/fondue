/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PlateRenderElementProps } from "@udecode/plate";
import { setNodes, TElement } from "@udecode/plate-core";
import { TodoListItemNodeData } from "@udecode/plate-list";
import { getRootProps } from "@udecode/plate-styled-components";
import { merge } from "@utilities/merge";
import React, { FC } from "react";
import { ReactEditor, useReadOnly } from "slate-react";

// inspired from: https://github.com/udecode/plate/blob/27228226801327665f27647585d20bc99adf1111/packages/ui/nodes/list/src/TodoListElement/TodoListElement.tsx

export const CheckboxItemElement: FC<PlateRenderElementProps> = (props) => {
    const { attributes, children, nodeProps, element, editor } = props;
    const rootProps = getRootProps(props);
    const readOnly = useReadOnly();
    const { checked } = element;
    return (
        <div {...attributes} {...rootProps} className="tw-flex tw-flex-row tw-py-1">
            <div contentEditable={false} className="tw-flex tw-items-center tw-justify-center tw-select-none tw-mr-1.5">
                <input
                    data-testid="TodoListElementCheckbox"
                    className="tw-w-4 tw-h-4 tw-m-0"
                    type="checkbox"
                    checked={!!checked}
                    onChange={(e) => {
                        const path = ReactEditor.findPath(editor, element);

                        setNodes<TElement<TodoListItemNodeData>>(
                            editor,
                            { checked: e.target.checked },
                            {
                                at: path,
                            },
                        );
                    }}
                    {...nodeProps}
                />
            </div>
            <span
                className={merge(["tw-flex-1 tw-focus:outline-none", checked && "tw-line-through"])}
                contentEditable={!readOnly}
                suppressContentEditableWarning
            >
                {children}
            </span>
        </div>
    );
};
