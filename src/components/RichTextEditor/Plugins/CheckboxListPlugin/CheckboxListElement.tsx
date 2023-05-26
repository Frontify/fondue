/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { ReactEditor } from 'slate-react';
import { PlateRenderElementProps, TTodoListItemElement, getRootProps, setNodes } from '@udecode/plate';
import { merge } from '@utilities/merge';
import { MarkupElement } from '../MarkupElement';
import { ELEMENT_CHECK_ITEM } from './id';
import { justifyClassNames } from '../helper';
import { useRichTextEditorContext } from '@components/RichTextEditor/context';

export const CheckboxListElementNode = (props: PlateRenderElementProps) => {
    const { attributes, children, nodeProps, element, editor } = props;
    const rootProps = getRootProps(props);
    const checked = element.checked as boolean;
    const align = (element.align as string) ?? 'left';
    const { theme } = useRichTextEditorContext();

    return (
        <div
            {...attributes}
            {...rootProps}
            className={merge(['tw-flex tw-flex-row tw-pb-2 tw-gap-1.5 tw-items-center', justifyClassNames[align]])}
        >
            <div contentEditable={false} className="tw-select-none">
                <input
                    data-test-id="checkbox-input"
                    className="tw-w-4 tw-h-4 tw-m-0"
                    type="checkbox"
                    checked={!!checked}
                    onChange={(e) => {
                        const path = ReactEditor.findPath(editor as ReactEditor, element);
                        setNodes<TTodoListItemElement>(editor, { checked: e.target.checked }, { at: path });
                    }}
                    {...nodeProps}
                />
            </div>
            <span
                style={theme[element.children[0].textStyle as string]}
                className={merge(['focus:tw-outline-none tw-w-auto tw-min-w-[10px]', checked && '!tw-line-through'])}
            >
                {children}
            </span>
        </div>
    );
};

export class CheckboxListElement extends MarkupElement {
    constructor(id = ELEMENT_CHECK_ITEM, node = CheckboxListElementNode) {
        super(id, node);
    }
}
