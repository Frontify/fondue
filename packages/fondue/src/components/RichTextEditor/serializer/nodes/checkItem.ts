/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type TElement } from '@udecode/slate';

import { CHECKBOX_SPAN_CLASSES } from '@components/RichTextEditor/Plugins';
import { merge } from '@utilities/merge';

import { type CSSPropertiesHover } from '../types';
import { reactCssPropsToCss } from '../utils/reactCssPropsToCss';

export const checkItemNode = (
    node: TElement,
    children: string,
    defaultClassNames: string,
    styles: Record<string, CSSPropertiesHover>,
) => {
    return `<div dir="auto" disabled class="tw-flex tw-flex-row tw-pb-2 first-of-type:tw-ml-0 ${defaultClassNames}" style="margin-left:${
        ((node.indent as number) ?? 0) * 24
    }px;">
    <div dir="auto" class="tw-flex tw-items-center tw-justify-center tw-select-none tw-mr-1.5">
        <input
            class="tw-w-4 tw-h-4 tw-m-0"
            type="checkbox"
            ${node.checked ? 'checked' : ''}
            onclick="return false;" />
    </div>
    <span dir="auto" class="${merge([
        'tw-flex-1',
        node.checked ? '!tw-line-through' : '',
        CHECKBOX_SPAN_CLASSES,
    ])}" style="${reactCssPropsToCss(styles[node.children[0].textStyle as string])}">${children}</span>
</div>`;
};
