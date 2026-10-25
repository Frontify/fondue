/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type CompiledFeature, compiledModel, type SharedAttribute } from './compile';
import {
    type CodecContext,
    type ContentModel,
    type FeatureDeclaration,
    type FeatureFormats,
    type HtmlSpec,
    type JsonObject,
    type ListLevels,
    type MarkDeclaration,
    type NodeDeclaration,
    type ResolveAssetUrl,
    type RichTextLocale,
} from './declarations';
import { checkHref } from './href';
import { type HtmlTemplate } from './html-spec';
import { addDeclaration, ownValue } from './values';

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

/** The content root classes of the editor surface, the reader and `toHTML`: the package's, then the presentation's. */
export const contentClasses = (contentClassName?: string): string => {
    if (contentClassName === undefined) {
        return 'fondue-rte-content';
    }
    return `fondue-rte-content ${contentClassName}`;
};

/** The narrowest column; a content root with no room for every column at this width shows one column. */
export const MIN_COLUMN_WIDTH = 240;
const MAX_COLUMNS = 6;
const COLUMN_GAP = /^(?:\d+(?:\.\d+)?|\.\d+)(?:px|rem)$/;

/** The presentation's columns as CSS values: the gap as written, and as a length, since `normal` is `1em` in multi-column layout. */
export interface ColumnLayout {
    readonly count: number;
    readonly gap: string;
    readonly length: string;
}

/** The presentation's column count and gap, or `undefined` for one column; a gap that is no `px` or `rem` length is `normal`. */
export const columnLayout = (columns: number | undefined, columnGap: string | undefined): ColumnLayout | undefined => {
    if (columns === undefined || !Number.isInteger(columns) || columns < 2) {
        return undefined;
    }
    if (columnGap === undefined || !COLUMN_GAP.test(columnGap)) {
        return { count: Math.min(columns, MAX_COLUMNS), gap: 'normal', length: '1em' };
    }
    return { count: Math.min(columns, MAX_COLUMNS), gap: columnGap, length: columnGap };
};

/** The node that forces a column break; the first `count - 1` in document order are active. */
export const COLUMN_BREAK = 'column_break';

/** An active column break's `template`, marked `active`, with `style` on it when given. */
export const withActiveBreak = (template: HtmlTemplate, style?: string): HtmlTemplate => {
    const [outer, ...inner] = template.layers;
    if (outer === undefined) {
        return template;
    }
    const attrs: Record<string, string> = {};
    for (const [name, value] of Object.entries(outer.attrs)) {
        attrs[name] = value;
    }
    attrs['data-rte-column-break'] = 'active';
    if (style !== undefined) {
        attrs.style = style;
    }
    return { content: template.content, layers: [{ tag: outer.tag, attrs }, ...inner] };
};

/** The list nodes whose `marker` null takes the presentation's `listLevels`, by kind. */
export const LIST_LEVEL_KINDS: Readonly<Record<string, keyof ListLevels>> = {
    ordered_list: 'ordered',
    bullet_list: 'bullet',
};

/** The kind and depth of a list a walk has entered: 1 for the outermost list of that kind. */
export interface EnteredList {
    readonly kind: keyof ListLevels;
    readonly depth: number;
}

/** Counts nested lists of each kind for one walk and gives each list node its depth while `render` runs. */
export const listDepths = () => {
    const counts: Record<keyof ListLevels, number> = { ordered: 0, bullet: 0 };
    return {
        within<T>(type: string, render: (entered: EnteredList | undefined) => T): T {
            const kind = ownValue(LIST_LEVEL_KINDS, type);
            if (kind === undefined) {
                return render(undefined);
            }
            counts[kind] += 1;
            try {
                return render({ kind, depth: counts[kind] });
            } finally {
                counts[kind] -= 1;
            }
        },
    };
};
export type ListDepths = ReturnType<typeof listDepths>;

/** Without `listLevels`, the default markers by nesting depth. */
const DEFAULT_LIST_LEVELS: ListLevels = {
    ordered: [{ counterType: 'decimal' }, { counterType: 'lower-alpha' }, { counterType: 'lower-roman' }],
    bullet: [{ shape: 'disc' }, { shape: 'circle' }, { shape: 'square' }],
};

/**
 * The `style` of a list of `kind` at `depth`, 1 for the outermost list of its kind: entry `depth - 1` modulo the levels'
 * length, whose colour and size the content CSS gives the marker.
 */
export const listLevelStyle = (
    kind: keyof ListLevels,
    depth: number,
    levels: ListLevels = DEFAULT_LIST_LEVELS,
): string | undefined => {
    const entries: readonly Partial<ListLevels['ordered'][number] & ListLevels['bullet'][number]>[] = levels[kind];
    const entry = entries[(depth - 1) % entries.length];
    if (entry === undefined) {
        return undefined;
    }
    const type = entry.counterType ?? entry.shape;
    if (type === undefined) {
        return undefined;
    }
    let style = addDeclaration(undefined, 'list-style-type', type);
    if (entry.color !== undefined) {
        style = addDeclaration(style, '--rte-list-marker-color', entry.color);
    }
    if (entry.size !== undefined) {
        style = addDeclaration(style, '--rte-list-marker-size', entry.size);
    }
    return style;
};

/** `template` with the list level style on its outer element, when the list's `marker` is null, as the reader and `toHTML` write it. */
export const withListLevel = (
    template: HtmlTemplate,
    attrs: JsonObject,
    kind: keyof ListLevels,
    depth: number,
    levels: ListLevels | undefined,
): HtmlTemplate => {
    const [outer, ...inner] = template.layers;
    const style = listLevelStyle(kind, depth, levels);
    if (outer === undefined || style === undefined || attrs.marker !== null) {
        return template;
    }
    let text = style;
    if (outer.attrs.style !== undefined) {
        text = `${outer.attrs.style};${style}`;
    }
    return { ...template, layers: [{ ...outer, attrs: { ...outer.attrs, style: text } }, ...inner] };
};

export {
    type OutputStyles,
    COLOR_PROPERTIES,
    styleOfNode,
    withStyleId,
    withStyle,
    withColor,
    unknownStyle,
} from './output-style';
export { STYLES_FEATURE, styleSheetOf } from './styles';
export {
    VOID_TAGS,
    writesAttribute,
    attrsOf,
    textOf,
    type Spacing,
    spaced,
    islandLabel,
    islandFallback,
    failedFallback,
    type Item,
    markPath,
    itemsOf,
    groupRun,
} from './output-runs';
