/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type CompiledFeature, compiledModel, type SharedAttribute } from './compile';
import { isIsland, ISLAND_INLINE, type TreeMark, type TreeNode } from './content';
import {
    type CodecContext,
    type ContentModel,
    type FeatureDeclaration,
    type FeatureFormats,
    type HtmlSpec,
    type JsonObject,
    type JsonValue,
    type MarkDeclaration,
    type NodeDeclaration,
    type ResolveAssetUrl,
    type RichTextLocale,
} from './declarations';
import { pointer } from './errors';
import { canonicalJson } from './hash';
import { checkHref } from './href';
import { islandText, renderSpaces } from './html-spec';

/** The context a reader or codec override reads, in `locale`, else `fallback`, whose strings fill any key `locale` lacks; a resolver that throws gives `null` for that call only. */
export const codecContext = (
    locale: RichTextLocale | undefined,
    fallback: RichTextLocale,
    resolveAssetUrl?: ResolveAssetUrl,
): CodecContext => {
    const output = locale ?? fallback;
    const t: CodecContext['t'] = (key, vars) => {
        let template = output.translationStrings[key];
        if (template === undefined) {
            template = fallback.translationStrings[key];
        }
        if (template === undefined) {
            template = key;
        }
        if (vars === undefined) {
            return template;
        }
        return template.replaceAll(/\$\{(\w+)\}/g, (match, name: string) => {
            if (Object.hasOwn(vars, name)) {
                return String(vars[name]);
            }
            return match;
        });
    };
    const base = { checkHref: (input: string) => checkHref(input), locale: output, t };
    if (resolveAssetUrl === undefined) {
        return base;
    }
    return {
        ...base,
        resolveAssetUrl: (assetId, options) => {
            try {
                return resolveAssetUrl(assetId, options);
            } catch {
                return null;
            }
        },
    };
};

/** What the reader and every codec read about one node type: its specs, Markdown form and its feature's options and declared support. */
export interface NodePlan {
    readonly name: string;
    readonly featureId: string;
    readonly inline: boolean;
    /** `whitespace: 'pre'` keeps every space as written. */
    readonly pre: boolean;
    /** Declares no content. */
    readonly leaf: boolean;
    readonly spec: HtmlSpec;
    readonly shared: readonly SharedAttribute[];
    readonly options: JsonObject;
    readonly formats: FeatureFormats;
    readonly form: NodeDeclaration['markdown'];
}
export interface MarkPlan {
    readonly name: string;
    readonly featureId: string;
    readonly spec: HtmlSpec;
    readonly options: JsonObject;
    readonly formats: FeatureFormats;
    readonly form: MarkDeclaration['markdown'];
}
export interface Plan<N extends NodePlan, M extends MarkPlan> {
    readonly nodes: ReadonlyMap<string, N>;
    readonly marks: ReadonlyMap<string, M>;
    /** Every feature's declared support, by feature ID. */
    readonly formats: ReadonlyMap<string, FeatureFormats>;
}

/** A feature that declares no formats claims no text or Markdown support, so each use of it is reported. */
const UNDECLARED: FeatureFormats = { html: 'lossless', text: 'unsupported', markdown: 'unsupported' };

/** The plan of a compiled model, each node and mark extended with what `node` and `mark` read from its feature's declaration. */
export const buildPlan = <N extends object, M extends object>(
    model: ContentModel,
    node: (feature: FeatureDeclaration, name: string) => N,
    mark: (feature: FeatureDeclaration, name: string) => M,
): Plan<NodePlan & N, MarkPlan & M> => {
    const compiled = compiledModel(model);
    const features = new Map(compiled.features.map((feature) => [feature.id, feature]));
    // Compilation gives every node and mark a compiled feature.
    const featureOf = (featureId: string) => features.get(featureId) as CompiledFeature;
    const formatsOf = ({ declaration }: CompiledFeature) => declaration.formats ?? UNDECLARED;
    return {
        formats: new Map(compiled.features.map((feature) => [feature.id, formatsOf(feature)])),
        nodes: new Map(
            compiled.nodes.map(({ name, featureId, declaration, shared }) => {
                const feature = featureOf(featureId);
                const plan: NodePlan & N = {
                    name,
                    featureId,
                    inline: declaration.group === 'inline',
                    pre: declaration.whitespace === 'pre',
                    leaf: declaration.content === undefined,
                    spec: declaration.html,
                    shared,
                    options: feature.options,
                    formats: formatsOf(feature),
                    form: declaration.markdown,
                    ...node(feature.declaration, name),
                };
                return [name, plan];
            }),
        ),
        marks: new Map(
            compiled.marks.map(({ name, featureId, declaration }) => {
                const feature = featureOf(featureId);
                const plan: MarkPlan & M = {
                    name,
                    featureId,
                    spec: declaration.html,
                    options: feature.options,
                    formats: formatsOf(feature),
                    form: declaration.markdown,
                    ...mark(feature.declaration, name),
                };
                return [name, plan];
            }),
        ),
    };
};

/** The content root classes of the editor surface, the reader and `toHTML`: the package's, then the presentation's (SPEC-rich-text-react/AC-066, AC-067). */
export const contentClasses = (contentClassName?: string): string => {
    if (contentClassName === undefined) {
        return 'fondue-rte-content';
    }
    return `fondue-rte-content ${contentClassName}`;
};

export const VOID_TAGS = new Set('area base br col embed hr img input link meta source track wbr'.split(' '));
const ATTRIBUTE_NAME = /^[a-zA-Z][\w:.-]*$/;
const EVENT_HANDLER = /^on/i;

/** Whether an output writes an attribute: never a malformed name, nor one that would run as an event handler. */
export const writesAttribute = (name: string): boolean => ATTRIBUTE_NAME.test(name) && !EVENT_HANDLER.test(name);

/** The attributes a renderer may read: every declared one, and never `unknownAttributes` (SPEC-rich-text-format/AC-027). */
export const attrsOf = (attrs: TreeNode['attrs']): JsonObject => {
    const known: Record<string, JsonValue> = {};
    for (const [name, value] of Object.entries(attrs ?? {})) {
        if (name !== 'unknownAttributes') {
            known[name] = value as JsonValue;
        }
    }
    return known;
};

/** The text of a node and its descendants, an island's included, for a fallback. */
export const textOf = (node: TreeNode): string => {
    if (isIsland(node)) {
        return islandText(node.attrs?.original);
    }
    let text = node.text ?? '';
    for (const child of node.content ?? []) {
        text += textOf(child);
    }
    return text;
};

/** What an HTML output carries through one document: the opaque islands met so far, and the spaces that end the text written last in this block. */
export interface Spacing {
    islands: number;
    /** So a run of spaces alternates across text nodes. */
    carried: number;
}

/** `text` with its spaces kept, continuing the run of spaces of the text before it. */
export const spaced = (state: Spacing, text: string): string => {
    const carried = state.carried;
    let trailing = 0;
    while (trailing < text.length && text[text.length - 1 - trailing] === ' ') {
        trailing += 1;
    }
    if (trailing === text.length) {
        state.carried = carried + trailing;
    } else {
        state.carried = trailing;
    }
    return renderSpaces(text, carried);
};

/** The label of an island fallback: the feature it names, else a generic one. */
export const islandLabel = ({ t }: CodecContext, feature: string | null): string => {
    if (feature === null) {
        return t('RichTextEditor_readerIslandGeneric');
    }
    return t('RichTextEditor_readerIslandFeature', { feature });
};

/** An opaque island's fallback: a `span` inside inline content, else a `div`, with its feature and its spaced text. */
export const islandFallback = (state: Spacing, node: TreeNode) => {
    state.islands += 1;
    const feature = node.attrs?.feature;
    let featureId: string | null = null;
    if (typeof feature === 'string') {
        featureId = feature;
    }
    const original = islandText(node.attrs?.original);
    if (node.type === ISLAND_INLINE) {
        // Inline island text sits in the same line, so it continues the run of spaces.
        return { tag: 'span', featureId, text: spaced(state, original) } as const;
    }
    state.carried = 0;
    return { tag: 'div', featureId, text: renderSpaces(original) } as const;
};

/** The fallback of a node whose override failed: its text in a `span` inside inline content, else a `div`. */
export const failedFallback = (state: Spacing, node: TreeNode, plan: NodePlan, before: number) => {
    let text = textOf(node);
    if (plan.inline) {
        // The children already moved the run, so it restarts from where this node began.
        state.carried = before;
        if (!plan.pre) {
            text = spaced(state, text);
        }
        return { tag: 'span', text } as const;
    }
    state.carried = 0;
    if (!plan.pre) {
        text = renderSpaces(text);
    }
    return { tag: 'div', text } as const;
};

export interface Item {
    readonly node: TreeNode;
    readonly path: string;
    /** The known marks in rank order, each with its index among the node's marks. */
    readonly marks: readonly { readonly mark: TreeMark; readonly index: number }[];
}

const sameMark = (a: TreeMark, b: TreeMark) =>
    a.type === b.type && canonicalJson(attrsOf(a.attrs)) === canonicalJson(attrsOf(b.attrs));

/** The path of the mark at `index` on the first node of a run. */
export const markPath = (items: readonly Item[], index: number): string => {
    const first = items[0];
    if (first === undefined) {
        return '';
    }
    return `${first.path}${pointer('marks', index)}`;
};

/** The children of `node` with their paths and the marks `keep` takes, in rank order. */
export const itemsOf = (node: TreeNode, path: string, keep: (mark: TreeMark) => boolean): Item[] =>
    (node.content ?? []).map((child, index): Item => {
        const marks = (child.marks ?? []).flatMap((mark, markIndex) => {
            if (!keep(mark)) {
                return [];
            }
            return [{ mark, index: markIndex }];
        });
        return { node: child, path: `${path}${pointer('content', index)}`, marks };
    });

/** Splits children into runs that share a mark at `depth`, so a partly bold link stays one link. */
export const groupRun = <T>(
    items: readonly Item[],
    depth: number,
    node: (item: Item) => T,
    mark: (items: readonly Item[], entry: Item['marks'][number]) => T,
): T[] => {
    const out: T[] = [];
    let index = 0;
    while (index < items.length) {
        const item = items[index];
        if (item === undefined) {
            break;
        }
        const entry = item.marks[depth];
        if (entry === undefined) {
            out.push(node(item));
            index += 1;
            continue;
        }
        let end = index + 1;
        while (end < items.length) {
            const next = items[end]?.marks[depth];
            if (next === undefined || !sameMark(next.mark, entry.mark)) {
                break;
            }
            end += 1;
        }
        out.push(mark(items.slice(index, end), entry));
        index = end;
    }
    return out;
};
