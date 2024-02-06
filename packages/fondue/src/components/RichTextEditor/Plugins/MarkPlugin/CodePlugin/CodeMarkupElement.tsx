/* (c) Copyright Frontify Ltd., all rights reserved. */

import { MARK_CODE, PlateRenderLeafProps } from '@udecode/plate';
import { MarkupElement } from '../../MarkupElement';

export const CODE_CLASSES =
    'tw-rounded tw-bg-box-neutral tw-text-violet-90 tw-m-0 tw-px-[0.2em] tw-font-mono tw-text-[85%]';

export const CodeMarkupElementNode = ({ attributes, children }: PlateRenderLeafProps) => (
    <span {...attributes} className={CODE_CLASSES}>
        {children}
    </span>
);

export class CodeMarkupElement extends MarkupElement {
    constructor(id = MARK_CODE, node = CodeMarkupElementNode) {
        super(id, node);
    }
}
