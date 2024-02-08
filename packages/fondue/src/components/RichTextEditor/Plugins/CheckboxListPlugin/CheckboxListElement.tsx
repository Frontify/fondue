/* (c) Copyright Frontify Ltd., all rights reserved. */

import { CSSProperties } from 'react';
import { TElement, setNodes } from '@udecode/slate';
import { TTodoListItemElement } from '@udecode/plate-list';
import { PlateRenderElementProps } from '@udecode/plate-core';
import { merge } from '@utilities/merge';
import { MarkupElement } from '../MarkupElement';
import { ELEMENT_CHECK_ITEM } from './id';
import { justifyClassNames } from '../helper';
import { useRichTextEditorContext } from '@components/RichTextEditor/context';
import { type TReactEditor, findNodePath } from '@udecode/slate-react';

const getCheckboxListStyles = (styles: Record<string, CSSProperties>, element: TElement): CSSProperties =>
    styles[element.children[0].textStyle as string];

export const CHECKBOX_DIV_CLASSES = 'tw-flex tw-flex-row tw-pb-2 tw-gap-1.5 tw-items-center';
export const CHECKBOX_SPAN_CLASSES = 'focus:tw-outline-none tw-w-auto tw-min-w-[10px]';

export const CheckboxListElementNode = (props: PlateRenderElementProps & { style: CSSProperties }) => {
    const { attributes, children, nodeProps, element, editor, style } = props;
    const checked = element.checked as boolean;
    const align = (element.align as string) ?? 'left';
    const { styles } = useRichTextEditorContext();

    return (
        <div {...attributes} style={style} className={merge([CHECKBOX_DIV_CLASSES, justifyClassNames[align]])}>
            <div contentEditable={false} className="tw-flex tw-items-center tw-justify-center tw-select-none">
                <input
                    data-test-id="checkbox-input"
                    className="tw-w-4 tw-h-4 tw-m-0"
                    type="checkbox"
                    checked={!!checked}
                    onChange={(event) => {
                        const path = findNodePath(editor as TReactEditor, element);
                        setNodes<TTodoListItemElement>(editor, { checked: event.target.checked }, { at: path });
                    }}
                    {...nodeProps}
                />
            </div>
            <span
                style={getCheckboxListStyles(styles, element)}
                className={merge([CHECKBOX_SPAN_CLASSES, checked && '!tw-line-through'])}
            >
                {children}
            </span>
        </div>
    );
};

export class CheckboxListElement extends MarkupElement {
    constructor(
        id = ELEMENT_CHECK_ITEM,
        node: (props: PlateRenderElementProps & { style: CSSProperties }) => JSX.Element = CheckboxListElementNode,
    ) {
        super(id, node);
    }
}
