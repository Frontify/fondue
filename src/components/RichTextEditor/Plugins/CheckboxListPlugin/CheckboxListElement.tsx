/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { ReactEditor } from 'slate-react';
import { PlateRenderElementProps, TTodoListItemElement, getRootProps, setNodes } from '@udecode/plate';
import { merge } from '@utilities/merge';
import { MarkupElement } from '../MarkupElement';
import { ELEMENT_CHECK_ITEM } from './id';
import { useRichTextEditorContext } from '@components/RichTextEditor/context/RichTextEditorContext';
import { getTextStyle } from '../ListPlugin/ListItemContentMarkupElement';
import { justifyClassNames } from '../TextStylePlugin/TextStyles/alignment';

export const CheckboxListElementNode = (props: PlateRenderElementProps) => {
    const { attributes, children, nodeProps, element, editor } = props;
    const rootProps = getRootProps(props);
    const checked = element.checked as boolean;
    const { designTokens } = useRichTextEditorContext();
    const tokenStyles = designTokens[getTextStyle(element.children[0])];

    const align = (element.align as string) ?? 'left';
    const isEmpty = element.children.every((child) => child.text === '');

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
                style={tokenStyles}
                className={merge([
                    'focus:tw-outline-none',
                    checked && 'tw-line-through',
                    isEmpty && 'tw-w-auto tw-min-w-[16px]',
                ])}
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
