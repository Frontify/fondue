/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { ReactEditor } from 'slate-react';
import { PlateRenderElementProps, TTodoListItemElement, getRootProps, setNodes } from '@udecode/plate';
import { merge } from '@utilities/merge';
import { MarkupElement } from '../MarkupElement';
import { ELEMENT_CHECK_ITEM } from './id';

export const CheckboxListElementNode = (props: PlateRenderElementProps) => {
    const { attributes, children, nodeProps, element, editor } = props;
    const rootProps = getRootProps(props);
    const checked = element.checked as boolean;
    return (
        <div {...attributes} {...rootProps} className="tw-flex tw-flex-row tw-py-1">
            <div contentEditable={false} className="tw-flex tw-items-center tw-justify-center tw-select-none tw-mr-1.5">
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
            <span className={merge(['tw-flex-1 tw-focus:outline-none', checked && 'tw-line-through'])}>{children}</span>
        </div>
    );
};

export class CheckboxListElement extends MarkupElement {
    constructor(id = ELEMENT_CHECK_ITEM, node = CheckboxListElementNode) {
        super(id, node);
    }
}
