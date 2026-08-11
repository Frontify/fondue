/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type RteBlockNode, type RtePlugin } from '#/RichTextEditor';

import { NESTABLE_LISTS } from './list';
import { ToolbarButton } from './ToolbarButton';

/**
 * A to-do list: the same nesting shape as the other lists, with a `checked`
 * attribute per item. The checkbox is a real input rendered beside the item's
 * content and marked as a toggle for that attribute, which is what makes it
 * clickable inside otherwise declarative rendering.
 */
export type CheckItemBlock<TContent extends RteBlockNode = RteBlockNode> = {
    type: 'checkItem';
    checked?: boolean;
    children: TContent[];
};

export type CheckListBlock<TItem extends RteBlockNode = RteBlockNode> = {
    type: 'checkList';
    children: TItem[];
};

export const CheckListPlugin: RtePlugin = {
    id: 'check-list',
    schema: {
        blocks: [
            {
                type: 'checkList',
                isList: true,
                content: 'blocks',
                contains: ['checkItem'],
                render: ({ children }) => <ul data-check-list="">{children}</ul>,
                parseRules: [{ tag: 'ul[data-check-list]' }],
            },
            {
                type: 'checkItem',
                content: 'blocks',
                contains: ['paragraph', ...NESTABLE_LISTS],
                attributes: { checked: { default: false } },
                render: ({ node, children }) => {
                    // A render function knows what it declared, so it reads its own block type.
                    const item = node as CheckItemBlock;
                    const checked = Boolean(item.checked);
                    return (
                        <li data-checked={String(checked)}>
                            <input
                                type="checkbox"
                                checked={checked}
                                readOnly
                                contentEditable={false}
                                data-rte-toggle="checked"
                            />
                            <span>{children}</span>
                        </li>
                    );
                },
                // The state is read from the attribute value rather than off the
                // element, so it comes back as a boolean instead of a string.
                parseRules: [
                    { tag: 'li[data-checked=true]', attributes: { checked: true } },
                    { tag: 'li[data-checked=false]', attributes: { checked: false } },
                ],
            },
        ],
    },
    toolbar: (api) => (
        <ToolbarButton
            active={api.isBlockActive('checkList')}
            title="To-do list"
            onClick={() => api.toggleList('checkList')}
        >
            ☑ ―
        </ToolbarButton>
    ),
    hotkeys: {
        Enter: (api) => api.splitListItem() || api.outdentListItem(),
        Tab: (api) => api.indentListItem(),
        'Shift-Tab': (api) => api.outdentListItem(),
    },
    styles: `
ul[data-check-list] {
    margin: 0;
    padding-left: 0;
    list-style: none;
}
ul[data-check-list] > li {
    display: flex;
    gap: 8px;
    align-items: baseline;
}
ul[data-check-list] > li > input {
    margin: 0;
    cursor: pointer;
}
ul[data-check-list] > li > span {
    flex: 1;
}
ul[data-check-list] > li[data-checked='true'] > span {
    color: #6b7280;
    text-decoration: line-through;
}
`,
};
