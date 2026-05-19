/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    type DOMOutputSpec,
    type MarkSpec as PmMarkSpec,
    type NodeSpec as PmNodeSpec,
    Schema,
} from 'prosemirror-model';

import {
    type BlockSpec,
    type FondueRtePlugin,
    type HtmlParseRule,
    type InlineSpec,
    type MarkSpec,
} from '#/core/plugin';

import { probeBlockDom, probeInlineDom, probeMarkDom } from './dom-extract';

const baselineParagraph = (): PmNodeSpec => ({
    group: 'block',
    content: 'inline*',
    attrs: { align: { default: null } },
    parseDOM: [
        {
            tag: 'p',
            getAttrs: (el) => {
                if (!(el instanceof HTMLElement)) {
                    return { align: null };
                }
                const align = el.style.textAlign || null;
                return { align };
            },
        },
    ],
    toDOM: (node) => {
        const align = node.attrs.align as string | null;
        const style = ['margin:0', align ? `text-align:${align}` : ''].filter(Boolean).join(';');
        return ['p', { style }, 0] satisfies DOMOutputSpec;
    },
});

const rulesFor = (plugin: FondueRtePlugin, predicate: (rule: HtmlParseRule) => boolean): HtmlParseRule[] =>
    (plugin.parseHtml ?? []).filter(predicate);

const buildBlockNodeSpec = (spec: BlockSpec, plugin: FondueRtePlugin): PmNodeSpec => {
    const attrs: Record<string, { default: unknown }> = { align: { default: null } };
    for (const [key, attr] of Object.entries(spec.attrs ?? {})) {
        attrs[key] = { default: attr.default ?? null };
    }

    const cache = new Map<string, ReturnType<typeof probeBlockDom>>();
    const probe = (probeAttrs: Record<string, unknown>) => {
        const key = JSON.stringify(probeAttrs);
        let cached = cache.get(key);
        if (!cached) {
            cached = probeBlockDom(spec, probeAttrs);
            cache.set(key, cached);
        }
        return cached;
    };

    return {
        group: 'block',
        content: 'inline*',
        attrs,
        parseDOM: rulesFor(plugin, (r) => r.produce.kind === 'block' && r.produce.type === spec.type).map((rule) => ({
            tag: rule.tag,
            getAttrs: (el: HTMLElement | string) => {
                if (typeof el === 'string') {
                    return {};
                }
                const ruleAttrs = rule.getAttrs?.(el) ?? {};
                const align = el.style.textAlign || null;
                return { ...ruleAttrs, align };
            },
        })),
        toDOM: (node) => {
            const probeAttrs: Record<string, unknown> = {};
            for (const key of Object.keys(spec.attrs ?? {})) {
                probeAttrs[key] = node.attrs[key];
            }
            const { tag, attrs: domAttrs } = probe(probeAttrs);
            const align = node.attrs.align as string | null;
            const merged: Record<string, string> = { ...domAttrs };
            if (align) {
                const existing = merged.style;
                merged.style = existing ? `${existing};text-align:${align}` : `text-align:${align}`;
            }
            return [tag, merged, 0] satisfies DOMOutputSpec;
        },
    };
};

const buildInlineNodeSpec = (spec: InlineSpec, plugin: FondueRtePlugin): PmNodeSpec => {
    const cache = new Map<string, ReturnType<typeof probeInlineDom>>();
    const probe = (probeAttrs: Record<string, unknown>) => {
        const key = JSON.stringify(probeAttrs);
        let cached = cache.get(key);
        if (!cached) {
            cached = probeInlineDom(spec, probeAttrs);
            cache.set(key, cached);
        }
        return cached;
    };

    const atomic = spec.atomic ?? false;
    return {
        group: 'inline',
        inline: true,
        atom: atomic,
        content: atomic ? undefined : 'text*',
        attrs: {},
        parseDOM: rulesFor(plugin, (r) => r.produce.kind === 'inline' && r.produce.type === spec.type).map((rule) => ({
            tag: rule.tag,
            getAttrs: (el: HTMLElement | string) => (typeof el === 'string' ? {} : (rule.getAttrs?.(el) ?? {})),
        })),
        toDOM: (node) => {
            const { tag, attrs: domAttrs } = probe(node.attrs);
            return atomic ? ([tag, domAttrs] satisfies DOMOutputSpec) : ([tag, domAttrs, 0] satisfies DOMOutputSpec);
        },
    };
};

const buildMarkSpec = (spec: MarkSpec, plugin: FondueRtePlugin): PmMarkSpec => {
    let probed: ReturnType<typeof probeMarkDom> | null = null;
    const probe = () => {
        if (!probed) {
            probed = probeMarkDom(spec);
        }
        return probed;
    };

    return {
        parseDOM: rulesFor(plugin, (r) => r.produce.kind === 'mark' && r.produce.key === spec.key).map((rule) => ({
            tag: rule.tag,
            getAttrs: (el: HTMLElement | string) => {
                if (typeof el === 'string') {
                    return null;
                }
                if (rule.match && !rule.match(el)) {
                    return false;
                }
                return rule.getAttrs?.(el) ?? null;
            },
        })),
        toDOM: () => {
            const { tag, attrs } = probe();
            return [tag, attrs, 0] satisfies DOMOutputSpec;
        },
    };
};

export const buildSchema = (plugins: FondueRtePlugin[]): Schema => {
    const nodes: Record<string, PmNodeSpec> = {
        doc: { content: 'block+' },
        paragraph: baselineParagraph(),
        text: { group: 'inline' },
    };
    const marks: Record<string, PmMarkSpec> = {};

    for (const plugin of plugins) {
        const schema = plugin.schema;
        if (!schema) {
            continue;
        }
        for (const block of schema.blocks ?? []) {
            nodes[block.type] = buildBlockNodeSpec(block, plugin);
        }
        for (const inline of schema.inlines ?? []) {
            nodes[inline.type] = buildInlineNodeSpec(inline, plugin);
        }
        for (const mark of schema.marks ?? []) {
            marks[mark.key] = buildMarkSpec(mark, plugin);
        }
    }

    return new Schema({ nodes, marks });
};
