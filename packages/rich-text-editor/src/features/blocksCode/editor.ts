/* (c) Copyright Frontify Ltd., all rights reserved. */

import { OptionsMenu, TurnIntoMenu } from '#/bridge/define';
import { defineEditorPart, type EditorApi } from '#/bridge/plugin';
import { type BlockDecoration, blockRule, type JsonObject } from '#/model';

import { codeBlock } from './feature';
import { languageChoices } from './languages';
import { codeBlockView } from './view';

interface HastChild {
    readonly type: string;
    readonly value?: string;
    readonly children?: readonly HastChild[];
    readonly properties?: { readonly className?: readonly string[] | string };
}

interface Highlighter {
    highlight: (language: string, value: string) => { readonly children: readonly HastChild[] };
    registered: (language: string) => boolean;
}

let highlighter: Highlighter | undefined;
let loading: Promise<Highlighter> | undefined;

/** One shared highlighter, loaded the first time a code block names a language. */
const loadHighlighter = (): Promise<Highlighter> => {
    if (loading === undefined) {
        loading = import('lowlight').then(({ common, createLowlight }) => {
            const created = createLowlight(common);
            highlighter = created;
            return created;
        });
    }
    return loading;
};

const classNameOf = (properties: HastChild['properties']): string | undefined => {
    const value = properties?.className;
    if (typeof value === 'string') {
        return value === '' ? undefined : value;
    }
    if (value === undefined) {
        return undefined;
    }
    const names = value.filter((name) => name !== '');
    if (names.length === 0) {
        return undefined;
    }
    return names.join(' ');
};

/** Text nodes advance the offset. An element with classes decorates its whole text, and so do nested elements. */
const walk = (nodes: readonly HastChild[], offset: number, ranges: BlockDecoration[]): number => {
    let at = offset;
    for (const node of nodes) {
        if (node.type === 'text') {
            if (node.value !== undefined) {
                at += node.value.length;
            }
            continue;
        }
        if (node.type !== 'element') {
            continue;
        }
        const start = at;
        at = walk(node.children ?? [], at, ranges);
        const className = classNameOf(node.properties);
        if (className !== undefined && at > start) {
            ranges.push({ from: start, to: at, className });
        }
    }
    return at;
};

const tokensOf = (hl: Highlighter, languageId: string, text: string): readonly BlockDecoration[] => {
    if (!hl.registered(languageId)) {
        return [];
    }
    const ranges: BlockDecoration[] = [];
    walk(hl.highlight(languageId, text).children, 0, ranges);
    return ranges;
};

/** The toggle's attributes: a language when the payload names one. */
const attrsOf = (payload: { readonly languageId?: string | null } | undefined): JsonObject => {
    if (payload?.languageId === undefined) {
        return {};
    }
    return { languageId: payload.languageId };
};

/** Opens a paragraph after the code block around the selection and moves the caret into it; an empty block stays. */
const openParagraphAfter = (api: EditorApi<'content'>): boolean => {
    const block = api.nearest('code_block');
    if (block === undefined) {
        return false;
    }
    const outcome = api.content.insert(block.range, [{ type: 'paragraph' }]);
    if (outcome.status !== 'applied') {
        return false;
    }
    api.select(outcome.range, { scroll: true });
    return true;
};

/**
 * Toggles a code block, sets its language, and indents or outdents its lines from Mod-] and Mod-[. Turns a fence at a
 * line start into one, and leaves one from Mod-Enter, or from ArrowDown at its end when it is its parent's last child.
 * Highlights each code block whose `languageId` lowlight has registered; an unknown ID stays plain.
 */
export const codeBlockEditor = defineEditorPart(codeBlock, {
    needs: ['attributes', 'blocks', 'content', 'overlays'],
    commands: {
        'code-block.toggle': {
            payload: { fields: { languageId: { type: 'id', nullable: true, optional: true } } },
            run: (api, payload: { readonly languageId?: string | null } | undefined) =>
                api.blocks.set('code_block', attrsOf(payload), { toggle: true }),
            active: (api, payload) => api.blocks.active('code_block', attrsOf(payload)),
        },
        'code-block.language.set': {
            payload: { fields: { languageId: { type: 'id', nullable: true } } },
            run: (api, { languageId }: { readonly languageId: string | null }) =>
                api.attributes.set('code_block', { languageId }),
            active: (api, { languageId }) => api.attributes.active('code_block', { languageId }),
        },
        'code-block.language.edit': {
            enabled: (api) => api.nearest('code_block') !== undefined,
            run: (api) => {
                const block = api.nearest('code_block');
                if (block === undefined) {
                    return false;
                }
                let languageId: string | null = null;
                if (typeof block.attrs.languageId === 'string') {
                    languageId = block.attrs.languageId;
                }
                const options = languageChoices(languageId, api.t).map(({ id, label }) => ({
                    key: id ?? '',
                    label,
                    command: 'code-block.language.set',
                    payload: { languageId: id },
                    checked: id === languageId,
                }));
                // A code block has no `nodeId`, so the menu keeps the block's range, which a selection change leaves.
                api.overlays.open(OptionsMenu, {
                    label: api.t('RichTextEditor_codeLanguageMenu'),
                    options,
                    node: block.range,
                });
                return true;
            },
        },
        'code-block.turn-into.edit': {
            enabled: (api) => api.nearest('code_block') !== undefined,
            run: (api) => {
                const block = api.nearest('code_block');
                if (block === undefined) {
                    return false;
                }
                // The caret the menu opened with, as the block's chrome converts from; a whole-block range stops `paragraph.set`.
                api.overlays.open(TurnIntoMenu, {
                    label: api.t('RichTextEditor_slashTurnInto'),
                    node: api.selectedRange(),
                });
                return true;
            },
        },
        'code-block.indent': { run: (api) => api.blocks.indentLines('indent') },
        'code-block.outdent': { run: (api) => api.blocks.indentLines('outdent') },
    },
    keys: {
        'Mod-]': 'code-block.indent',
        'Mod-[': 'code-block.outdent',
        'Mod-Enter': (api) => {
            const selection = api.selection();
            // A selection that spans blocks leaves the key to the base keymap.
            if (selection.blockType !== 'code_block' || !(selection.collapsed || api.selectedText() !== '')) {
                return false;
            }
            return openParagraphAfter(api);
        },
        ArrowDown: (api) => {
            const selection = api.selection();
            if (
                !selection.collapsed ||
                selection.blockType !== 'code_block' ||
                !selection.atEnd ||
                selection.ancestors.at(-1)?.last !== true
            ) {
                return false;
            }
            return openParagraphAfter(api);
        },
    },
    // An empty language capture sets no `languageId`.
    inputRules: [
        blockRule({
            id: 'code.fence',
            match: /^```(?<languageId>[a-z0-9][a-z0-9._:-]{0,127})? $/,
            command: 'code-block.toggle',
        }),
    ],
    toolbar: [
        {
            id: 'code-block',
            kind: 'toggle',
            command: 'code-block.toggle',
            labelKey: 'RichTextEditor_codeBlock',
            icon: 'IconCodeFrame',
        },
        {
            id: 'code-language',
            kind: 'button',
            command: 'code-block.language.edit',
            labelKey: 'RichTextEditor_codeLanguageMenu',
            icon: 'IconCodeFrame',
            opensOverlay: true,
            node: 'code_block',
        },
        {
            id: 'code-turn-into',
            kind: 'button',
            command: 'code-block.turn-into.edit',
            labelKey: 'RichTextEditor_slashTurnInto',
            icon: 'IconHeading',
            opensOverlay: true,
            node: 'code_block',
        },
    ],
    decorations: [
        {
            id: 'code-syntax',
            nodes: ['code_block'],
            derive: ({ attrs, text }) => {
                const { languageId } = attrs;
                if (typeof languageId !== 'string') {
                    return [];
                }
                if (highlighter === undefined) {
                    return loadHighlighter().then((loaded) => tokensOf(loaded, languageId, text));
                }
                return tokensOf(highlighter, languageId, text);
            },
        },
    ],
    views: [codeBlockView],
});
