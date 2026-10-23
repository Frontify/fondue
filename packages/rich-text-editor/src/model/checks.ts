/* (c) Copyright Frontify Ltd., all rights reserved. */

import { CONTENT_CHECKS_FEATURE } from './capabilities';
import { compiledModel } from './compile';
import { type ContentModel, type JsonObject, type JsonValue, type RichTextLocale } from './declarations';
import { type ContentNodeJSON, type MarkJSON, type RichTextDocument } from './format';
import { canonicalJson } from './hash';
import { type ColorToken } from './styles';
import { isRecord } from './values';

/** A minor release may add rules, so handle a rule ID you do not know. */
export type ContentRuleId =
    | 'image.alt-missing'
    | 'image.alt-suspicious'
    | 'image.content-review'
    | 'link.text-empty'
    | 'link.text-vague'
    | 'link.purpose-review'
    | 'heading.empty'
    | 'heading.skipped-level'
    | 'heading.descriptive-review'
    | 'table.no-header'
    | 'contrast.low'
    | 'contrast.unknown'
    | 'color.meaning-review'
    | 'language.parts-review'
    | 'sensory.review'
    | 'structure.review'
    | 'embed.title-missing'
    | 'embed.media-review';

/** One finding of the content checks: which rule found it, where, and the repair on offer if any. */
export interface ContentIssue {
    /** `${ruleId}:${nodeId}`, `${ruleId}:${path}` or `${ruleId}`. */
    readonly id: string;
    readonly ruleId: ContentRuleId;
    readonly kind: 'automatic' | 'manual';
    readonly severity: 'error' | 'warning' | 'review';
    /** Child indexes from the doc node; `null` for a document-level rule. */
    readonly path: readonly number[] | null;
    readonly nodeId: string | null;
    /** Any feature's command, customer features included. */
    readonly repairCommand: string | null;
    /** The repair command's payload, such as `{ level: 3 }` for `heading.set`. */
    readonly repairPayload: JsonValue | null;
    readonly sequence: number;
}

type Level = 1 | 2 | 3 | 4 | 5 | 6;

/** What the content checks need: the locale for word lists and the installed features that decide repairs. */
export interface ContentCheckOptions {
    /** The word lists come from its `RichTextEditor_checkGenericImageWords` and `RichTextEditor_checkVagueLinkTexts`; the en-US lists are always added. */
    readonly locale: RichTextLocale;
    /** Installed features decide repair availability, such as the language repair, and nodes it does not declare are skipped; without it such a repair is null. */
    readonly model?: ContentModel;
    /** Written to `ContentIssue.sequence`; default 0 outside an editor. */
    readonly sequence?: number;
    readonly colorTokens?: readonly ColorToken[];
    readonly background?: string;
    /** The host page's heading level around the editor; `heading.skipped-level` checks the first heading against it. */
    readonly enclosingHeadingLevel?: Level;
    /** The heading levels the author may create, which the heading level repair stays within; default 1 to 6. */
    readonly creatableHeadingLevels?: readonly number[];
}

/** The en-US generic image words, which every check adds to the locale's own list. */
export const GENERIC_IMAGE_WORDS =
    'image|picture|photo|photograph|pic|img|graphic|illustration|icon|logo|banner|screenshot|screen shot|alt|alt text|placeholder|untitled|thumbnail';
/** The en-US vague link texts, which every check adds to the locale's own list. */
export const VAGUE_LINK_TEXTS =
    'click here|click|here|link|this link|more|read more|learn more|more info|more information|info|details|go|continue|this|this page|website';

const IMAGE_EXTENSION = /\.(?:apng|avif|bmp|gif|heic|heif|ico|jfif|jpe?g|png|svg|tiff?|webp)$/i;
const ISLANDS = new Set(['unsupported_block', 'unsupported_inline']);
const LEVELS: readonly Level[] = [1, 2, 3, 4, 5, 6];
// Browsers draw `h1` to `h3` at 18.72 px bold or larger, which WCAG counts as large text.
const LARGE_HEADING = 3;
const SMALL_MARKS = ['subscript', 'superscript'];
const NORMAL_RATIO = 4.5;
const LARGE_RATIO = 3;

/** The issue ID part of a rule ID in locale keys: PascalCase with its dots and hyphens removed. */
const pascalOf = (ruleId: ContentRuleId) =>
    ruleId
        .split(/[.-]/)
        .map((part) => `${part.charAt(0).toUpperCase()}${part.slice(1)}`)
        .join('');

/**
 * The locale key of a rule's name, such as `RichTextEditor_checkImageAltSuspicious`.
 * Public so the shipped features and the core share it.
 */
export const ruleNameKey = (ruleId: ContentRuleId): `RichTextEditor_${string}` =>
    `RichTextEditor_check${pascalOf(ruleId)}`;

/**
 * The locale key of a rule's explanation of how to decide, such as `RichTextEditor_checkImageAltSuspiciousHelp`.
 * Public so the shipped features and the core share it.
 */
export const ruleHelpKey = (ruleId: ContentRuleId): `RichTextEditor_${string}` =>
    `RichTextEditor_check${pascalOf(ruleId)}Help`;

/** What a rule looks at: one node, a run of inline children that share a mark, or the whole document. */
interface Subject {
    readonly path: readonly number[];
    readonly node: ContentNodeJSON;
    /** The inline children a run covers from `path`; 1 for a node. */
    readonly span: number;
    readonly text: string;
    readonly nodeId: string | null;
    readonly signature: string;
}

interface HeadingSubject extends Subject {
    readonly level: number;
    /** The level the heading is compared with: the previous heading's, else `enclosingHeadingLevel`. */
    readonly previous: number | undefined;
}

interface ColorSubject extends Subject {
    readonly color: MarkJSON | undefined;
    readonly highlight: MarkJSON | undefined;
    readonly large: boolean;
}

interface Context {
    readonly genericWords: ReadonlySet<string>;
    readonly vagueTexts: ReadonlySet<string>;
    readonly tokens: readonly ColorToken[];
    readonly background: Rgba | undefined;
    /** The IDs of the features the model installs, or `undefined` without a model. */
    readonly features: ReadonlySet<string> | undefined;
    readonly creatableLevels: readonly number[];
}

type SubjectKind = 'document' | 'image' | 'link' | 'heading' | 'table' | 'color' | 'embed';

/** A finding: the repair to offer, with the feature whose editor part provides its command, or `true` for a rule with none. */
type Finding =
    | true
    | { readonly command: string; readonly feature: string; readonly payload: JsonValue | null }
    | undefined;

interface SubjectOf {
    document: Subject;
    image: Subject;
    link: Subject;
    heading: HeadingSubject;
    table: Subject;
    color: ColorSubject;
    embed: Subject;
}

interface Rule<K extends SubjectKind> {
    readonly kind: ContentIssue['kind'];
    readonly severity: ContentIssue['severity'];
    readonly subject: K;
    check(subject: SubjectOf[K], context: Context): Finding;
}

const rule = <K extends SubjectKind>(declared: Rule<K>): Rule<K> => declared;

interface Rgba {
    readonly red: number;
    readonly green: number;
    readonly blue: number;
    readonly alpha: number;
}

const channelOf = (part: string, scale: number): number | undefined => {
    const percent = part.endsWith('%');
    const value = Number.parseFloat(percent ? part.slice(0, -1) : part);
    if (!Number.isFinite(value)) {
        return undefined;
    }
    return Math.min(scale, Math.max(0, percent ? (value / 100) * scale : value));
};

const RGB = /^rgba?\(\s*([\d.]+%?)\s*[,\s]\s*([\d.]+%?)\s*[,\s]\s*([\d.]+%?)\s*(?:[,/]\s*([\d.]+%?)\s*)?\)$/i;

/** A colour as `#rgb`, `#rgba`, `#rrggbb`, `#rrggbbaa`, `rgb()`, `rgba()` or `transparent`; any other is unknown. */
export const parseColor = (value: unknown): Rgba | undefined => {
    if (typeof value !== 'string') {
        return undefined;
    }
    const color = value.trim().toLowerCase();
    if (color === 'transparent') {
        return { red: 0, green: 0, blue: 0, alpha: 0 };
    }
    if (/^#(?:[\da-f]{3,4}|[\da-f]{6}|[\da-f]{8})$/.test(color)) {
        let hex = color.slice(1);
        if (hex.length <= 4) {
            hex = [...hex].map((digit) => `${digit}${digit}`).join('');
        }
        const byte = (index: number) => Number.parseInt(hex.slice(index, index + 2), 16);
        const alpha = hex.length === 8 ? byte(6) / 255 : 1;
        return { red: byte(0), green: byte(2), blue: byte(4), alpha };
    }
    const match = RGB.exec(color);
    if (match === null) {
        return undefined;
    }
    const [, red, green, blue, alpha] = match;
    const channels = [red, green, blue].map((part) => channelOf(part ?? '', 255));
    const opacity = alpha === undefined ? 1 : channelOf(alpha, 1);
    const [r, g, b] = channels;
    if (r === undefined || g === undefined || b === undefined || opacity === undefined) {
        return undefined;
    }
    return { red: r, green: g, blue: b, alpha: opacity };
};

/** Blends a translucent `top` colour over the opaque `bottom`, as the contrast checks need. */
export const composite = (top: Rgba, bottom: Rgba): Rgba => {
    const mix = (a: number, b: number) => top.alpha * a + (1 - top.alpha) * b;
    return {
        red: mix(top.red, bottom.red),
        green: mix(top.green, bottom.green),
        blue: mix(top.blue, bottom.blue),
        alpha: 1,
    };
};

const luminance = ({ red, green, blue }: Rgba) => {
    const linear = (channel: number) => {
        const value = channel / 255;
        return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
    };
    return 0.2126 * linear(red) + 0.7152 * linear(green) + 0.0722 * linear(blue);
};

export const contrastOf = (a: Rgba, b: Rgba) => {
    const [light, dark] = [luminance(a), luminance(b)].sort((x, y) => y - x) as [number, number];
    return (light + 0.05) / (dark + 0.05);
};

/** A colour mark's colour: its literal value, else its token's. */
const markColor = (mark: MarkJSON | undefined, tokens: readonly ColorToken[]): Rgba | undefined => {
    const attrs = mark?.attrs;
    if (attrs === undefined) {
        return undefined;
    }
    if (typeof attrs.value === 'string') {
        return parseColor(attrs.value);
    }
    const token = tokens.find(({ id }) => id === attrs.tokenId);
    return parseColor(token?.value);
};

/** The opaque background under a run: its highlight over the known background. */
const backgroundOf = (subject: ColorSubject, context: Context): Rgba | undefined => {
    const base = context.background?.alpha === 1 ? context.background : undefined;
    if (subject.highlight === undefined) {
        return base;
    }
    const highlight = markColor(subject.highlight, context.tokens);
    if (highlight === undefined) {
        return undefined;
    }
    if (highlight.alpha === 1) {
        return highlight;
    }
    return base === undefined ? undefined : composite(highlight, base);
};

/** The run's text colour and background, both opaque, or `undefined` when either cannot be resolved. */
const colorsOf = (subject: ColorSubject, context: Context) => {
    const background = backgroundOf(subject, context);
    const foreground = markColor(subject.color, context.tokens);
    if (background === undefined || foreground === undefined) {
        return undefined;
    }
    return { foreground: foreground.alpha === 1 ? foreground : composite(foreground, background), background };
};

const passes = (foreground: Rgba, background: Rgba, large: boolean) =>
    contrastOf(foreground, background) >= (large ? LARGE_RATIO : NORMAL_RATIO);

const folded = (value: string) => value.trim().toLowerCase();

const attrsOf = (node: ContentNodeJSON): JsonObject => node.attrs ?? {};

const altIntentOf = (node: ContentNodeJSON) => attrsOf(node).altIntent ?? 'missing';

/** The deepest level from one below `previous` up that the author may create, or none. */
const repairLevel = (previous: number, creatable: readonly number[]) => {
    const fits = creatable.filter((level) => level <= previous + 1);
    return fits.length === 0 ? undefined : Math.max(...fits);
};

const LANGUAGE_REPAIR = { command: 'mark.language.edit', feature: 'marks.language' };
const IMAGE_ALT_REPAIR = { command: 'image.alt.edit', feature: 'media.image' };
const PARAGRAPH_REPAIR = { command: 'paragraph.set', feature: 'core' };
const HEADING_REPAIR = { command: 'heading.set', feature: 'blocks.heading' };
const LINK_REPAIR = { command: 'link.edit', feature: 'links' };
const TABLE_HEADER_REPAIR = { command: 'table.header.toggle', feature: 'tables' };
const COLOR_REPAIR = { command: 'mark.color.menu.open', feature: 'marks.font-color' };
const EMBED_REPAIR = { command: 'embed.edit', feature: 'media.embed' };

/** Each repair command a rule offers with the feature whose editor part must register it. */
export const CONTENT_REPAIRS: readonly { readonly command: string; readonly feature: string }[] = [
    LANGUAGE_REPAIR,
    IMAGE_ALT_REPAIR,
    PARAGRAPH_REPAIR,
    HEADING_REPAIR,
    LINK_REPAIR,
    TABLE_HEADER_REPAIR,
    COLOR_REPAIR,
    EMBED_REPAIR,
];

/** Every rule, in the order the issues panel lists the rules of one node. */
export const CONTENT_RULES = {
    'language.parts-review': rule({
        kind: 'manual',
        severity: 'review',
        subject: 'document',
        check: (_subject, context) => {
            if (context.features?.has('marks.language') !== true) {
                return true;
            }
            return { ...LANGUAGE_REPAIR, payload: null };
        },
    }),
    'sensory.review': rule({ kind: 'manual', severity: 'review', subject: 'document', check: () => true }),
    'structure.review': rule({ kind: 'manual', severity: 'review', subject: 'document', check: () => true }),
    'image.alt-missing': rule({
        kind: 'automatic',
        severity: 'error',
        subject: 'image',
        check: ({ node }) => {
            const intent = altIntentOf(node);
            const { altText } = attrsOf(node);
            // A meaningful image with blank text renders an empty `alt`, as a decorative one does.
            const blank = intent === 'meaningful' && (typeof altText !== 'string' || altText.trim() === '');
            if (intent !== 'missing' && !blank) {
                return undefined;
            }
            return { ...IMAGE_ALT_REPAIR, payload: null };
        },
    }),
    'image.alt-suspicious': rule({
        kind: 'automatic',
        severity: 'warning',
        subject: 'image',
        check: ({ node }, { genericWords }) => {
            const { altText, labelSnapshot } = attrsOf(node);
            if (altIntentOf(node) !== 'meaningful' || typeof altText !== 'string' || altText.trim() === '') {
                return undefined;
            }
            const alt = folded(altText);
            const suspicious =
                (typeof labelSnapshot === 'string' && alt === folded(labelSnapshot)) ||
                IMAGE_EXTENSION.test(alt) ||
                genericWords.has(alt);
            return suspicious ? { ...IMAGE_ALT_REPAIR, payload: null } : undefined;
        },
    }),
    'image.content-review': rule({ kind: 'manual', severity: 'review', subject: 'image', check: () => true }),
    'heading.empty': rule({
        kind: 'automatic',
        severity: 'error',
        subject: 'heading',
        check: ({ text }) => (text.trim() === '' ? { ...PARAGRAPH_REPAIR, payload: null } : undefined),
    }),
    'heading.skipped-level': rule({
        kind: 'automatic',
        severity: 'warning',
        subject: 'heading',
        check: ({ level, previous }, { creatableLevels }) => {
            if (previous === undefined || level <= previous + 1) {
                return undefined;
            }
            const repair = repairLevel(previous, creatableLevels);
            if (repair === undefined) {
                return true;
            }
            return { ...HEADING_REPAIR, payload: { level: repair } };
        },
    }),
    'heading.descriptive-review': rule({ kind: 'manual', severity: 'review', subject: 'heading', check: () => true }),
    'link.text-empty': rule({
        kind: 'automatic',
        severity: 'error',
        subject: 'link',
        check: ({ text }) => (text.trim() === '' ? { ...LINK_REPAIR, payload: null } : undefined),
    }),
    'link.text-vague': rule({
        kind: 'automatic',
        severity: 'warning',
        subject: 'link',
        check: ({ text }, { vagueTexts }) =>
            vagueTexts.has(folded(text)) ? { ...LINK_REPAIR, payload: null } : undefined,
    }),
    'link.purpose-review': rule({ kind: 'manual', severity: 'review', subject: 'link', check: () => true }),
    'table.no-header': rule({
        kind: 'automatic',
        severity: 'warning',
        subject: 'table',
        check: ({ node }) => {
            // A nested table's header cells head that table only.
            const hasHeader = (current: ContentNodeJSON): boolean =>
                current.type === 'table_header' ||
                (current.content ?? []).some((child) => child.type !== 'table' && hasHeader(child));
            if (hasHeader(node)) {
                return undefined;
            }
            return { ...TABLE_HEADER_REPAIR, payload: { axis: 'row' } };
        },
    }),
    'contrast.low': rule({
        kind: 'automatic',
        severity: 'error',
        subject: 'color',
        check: (subject, context) => {
            const colors = colorsOf(subject, context);
            if (colors === undefined || passes(colors.foreground, colors.background, subject.large)) {
                return undefined;
            }
            const tokenIds = context.tokens
                .filter(({ usage, value }) => {
                    const color = parseColor(value);
                    if (!usage.includes('font_color') || color === undefined) {
                        return false;
                    }
                    const shown = color.alpha === 1 ? color : composite(color, colors.background);
                    return passes(shown, colors.background, subject.large);
                })
                .map(({ id }) => id);
            return { ...COLOR_REPAIR, payload: { tokenIds } };
        },
    }),
    'contrast.unknown': rule({
        kind: 'automatic',
        severity: 'review',
        subject: 'color',
        check: (subject, context) =>
            colorsOf(subject, context) === undefined ? { ...COLOR_REPAIR, payload: null } : undefined,
    }),
    'color.meaning-review': rule({ kind: 'manual', severity: 'review', subject: 'color', check: () => true }),
    'embed.title-missing': rule({
        kind: 'automatic',
        severity: 'error',
        subject: 'embed',
        check: ({ node }) => {
            const title = attrsOf(node).title;
            return title === null || title === undefined ? { ...EMBED_REPAIR, payload: null } : undefined;
        },
    }),
    'embed.media-review': rule({ kind: 'manual', severity: 'review', subject: 'embed', check: () => true }),
};

/** Every rule ID, document-level rules first. */
export const CONTENT_RULE_IDS = Object.keys(CONTENT_RULES) as readonly ContentRuleId[];

/** An issue with the inline children it covers from its path and the stored content it was found on. */
export interface LocatedIssue {
    readonly issue: ContentIssue;
    readonly span: number;
    /** The canonical JSON of what the issue names, which changes when its node does. */
    readonly signature: string;
}

const listOf = (locale: RichTextLocale, key: `RichTextEditor_${string}`, english: string): ReadonlySet<string> => {
    const own = locale.translationStrings[key];
    return new Set(
        [...english.split('|'), ...(typeof own === 'string' ? own.split('|') : [])]
            .map(folded)
            .filter((word) => word !== ''),
    );
};

/** The text a reader meets in inline children: text, a mention's label and a line break. */
const inlineText = (children: readonly ContentNodeJSON[]): string =>
    children
        .map((child) => {
            if (typeof child.text === 'string') {
                return child.text;
            }
            if (child.type === 'hard_break') {
                return '\n';
            }
            const label = attrsOf(child).labelSnapshot;
            if (typeof label === 'string') {
                return label;
            }
            return inlineText(child.content ?? []);
        })
        .join('');

const markOf = (node: ContentNodeJSON, type: string) => node.marks?.find((mark) => mark.type === type);

const markKey = (mark: MarkJSON | undefined) => (mark === undefined ? '' : canonicalJson(mark as unknown as JsonValue));

const nodeIdOf = (node: ContentNodeJSON) => {
    const { nodeId } = attrsOf(node);
    return typeof nodeId === 'string' ? nodeId : null;
};

const signatureOf = (nodes: readonly ContentNodeJSON[]) => canonicalJson(nodes as unknown as JsonValue);

/** Runs of adjacent inline children whose `key` is equal and not empty. */
const runsOf = (children: readonly ContentNodeJSON[], key: (child: ContentNodeJSON) => string) => {
    const runs: { readonly start: number; readonly end: number }[] = [];
    let start = 0;
    while (start < children.length) {
        const first = children[start];
        const value = first === undefined ? '' : key(first);
        let end = start + 1;
        while (end < children.length && key(children[end] as ContentNodeJSON) === value) {
            end += 1;
        }
        if (value !== '') {
            runs.push({ start, end });
        }
        start = end;
    }
    return runs;
};

const isInline = (children: readonly ContentNodeJSON[]) =>
    children.some((child) => child.type === 'text' || child.marks !== undefined);

/** Each subject of the document in reading order, with the kind of rule that looks at it. */
const subjectsOf = (
    document: RichTextDocument,
    enclosing: number | undefined,
    declared: ReadonlySet<string> | undefined,
) => {
    const found: { readonly kind: SubjectKind; readonly subject: Subject }[] = [];
    // How often each `nodeId` occurs, since a repeated one names no single node.
    const nodeIds = new Map<string, number>();
    let previous = enclosing;
    const visit = (node: ContentNodeJSON, path: readonly number[], large: boolean) => {
        if (ISLANDS.has(node.type)) {
            return;
        }
        // The editor keeps a node its model lacks as an island, which no repair or Go to can reach.
        if (declared !== undefined && !declared.has(node.type)) {
            return;
        }
        const ownId = nodeIdOf(node);
        if (ownId !== null) {
            nodeIds.set(ownId, (nodeIds.get(ownId) ?? 0) + 1);
        }
        const own = (kind: SubjectKind, extra: object = {}) =>
            found.push({
                kind,
                subject: {
                    path,
                    node,
                    span: 1,
                    text: inlineText(node.content ?? []),
                    nodeId: nodeIdOf(node),
                    signature: signatureOf([node]),
                    ...extra,
                },
            });
        let inLarge = large;
        if (node.type === 'asset_image') {
            own('image');
        } else if (node.type === 'embed') {
            own('embed');
        } else if (node.type === 'table') {
            own('table');
        } else if (node.type === 'heading') {
            const level = attrsOf(node).level;
            if (typeof level === 'number') {
                own('heading', { level, previous });
                previous = level;
                inLarge = level <= LARGE_HEADING;
            }
        }
        const children = node.content ?? [];
        if (!isInline(children)) {
            for (const [index, child] of children.entries()) {
                visit(child, [...path, index], inLarge);
            }
            return;
        }
        const run = (kind: 'link' | 'color', start: number, end: number) => {
            const covered = children.slice(start, end);
            const first = covered[0] as ContentNodeJSON;
            // Subscript and superscript text is smaller than its heading, so it is never large text.
            const large = inLarge && covered.every((child) => !SMALL_MARKS.some((mark) => markOf(child, mark)));
            const extra =
                kind === 'color'
                    ? { color: markOf(first, 'font_color'), highlight: markOf(first, 'highlight'), large }
                    : {};
            found.push({
                kind,
                subject: {
                    path: [...path, start],
                    node: first,
                    span: end - start,
                    text: inlineText(covered),
                    nodeId: null,
                    signature: signatureOf(covered),
                    ...extra,
                },
            });
        };
        const links = runsOf(children, (child) => markKey(markOf(child, 'link')));
        const colors = runsOf(children, (child) => {
            const color = markOf(child, 'font_color');
            const highlight = markOf(child, 'highlight');
            if (color === undefined && highlight === undefined) {
                return '';
            }
            return `${markKey(color)} ${markKey(highlight)}`;
        });
        for (const [index, child] of children.entries()) {
            for (const { start, end } of links) {
                if (start === index) {
                    run('link', start, end);
                }
            }
            for (const { start, end } of colors) {
                if (start === index) {
                    run('color', start, end);
                }
            }
            visit(child, [...path, index], inLarge);
        }
    };
    visit(document.content, [], false);
    return { found, repeated: (nodeId: string) => (nodeIds.get(nodeId) ?? 0) > 1 };
};

/**
 * The issues of `document` with what each covers, as the editor holds them.
 */
export const locateContentIssues = (
    document: RichTextDocument,
    options: ContentCheckOptions,
): readonly LocatedIssue[] => {
    const { locale, model, sequence = 0, colorTokens = [], background, creatableHeadingLevels = LEVELS } = options;
    let features: ReadonlySet<string> | undefined;
    let nodes: ReadonlySet<string> | undefined;
    let enclosingHeadingLevel = options.enclosingHeadingLevel;
    if (model !== undefined) {
        const compiled = compiledModel(model);
        features = new Set(compiled.features.map(({ id }) => id));
        nodes = new Set(compiled.nodes.map(({ name }) => name));
        // The feature's own option applies when the call gives none.
        const stored = compiled.features.find(({ id }) => id === CONTENT_CHECKS_FEATURE)?.options.enclosingHeadingLevel;
        if (enclosingHeadingLevel === undefined && typeof stored === 'number' && LEVELS.includes(stored as Level)) {
            enclosingHeadingLevel = stored as Level;
        }
    }
    const { found, repeated } = subjectsOf(document, enclosingHeadingLevel, nodes);
    const context: Context = {
        genericWords: listOf(locale, 'RichTextEditor_checkGenericImageWords', GENERIC_IMAGE_WORDS),
        vagueTexts: listOf(locale, 'RichTextEditor_checkVagueLinkTexts', VAGUE_LINK_TEXTS),
        tokens: colorTokens,
        background: parseColor(background),
        features,
        creatableLevels: creatableHeadingLevels,
    };
    const located: LocatedIssue[] = [];
    const add = (ruleId: ContentRuleId, subject: Subject | undefined, finding: Finding) => {
        if (finding === undefined) {
            return;
        }
        const { kind, severity } = CONTENT_RULES[ruleId];
        let repairCommand: string | null = null;
        let repairPayload: JsonValue | null = null;
        if (finding !== true && (features === undefined || features.has(finding.feature))) {
            repairCommand = finding.command;
            repairPayload = finding.payload;
        }
        const path = subject === undefined ? null : subject.path;
        const nodeId = subject === undefined ? null : subject.nodeId;
        let id: string = ruleId;
        if (nodeId !== null && !repeated(nodeId)) {
            id = `${ruleId}:${nodeId}`;
        } else if (path !== null) {
            id = `${ruleId}:${path.join(',')}`;
        }
        located.push({
            issue: { id, ruleId, kind, severity, path, nodeId, repairCommand, repairPayload, sequence },
            span: subject === undefined ? 0 : subject.span,
            signature: subject === undefined ? '' : subject.signature,
        });
    };
    const whole: Subject = { path: [], node: document.content, span: 0, text: '', nodeId: null, signature: '' };
    for (const ruleId of CONTENT_RULE_IDS) {
        const declared = CONTENT_RULES[ruleId];
        if (declared.subject === 'document') {
            add(ruleId, undefined, declared.check(whole, context));
        }
    }
    for (const { kind, subject } of found) {
        for (const ruleId of CONTENT_RULE_IDS) {
            const declared = CONTENT_RULES[ruleId] as Rule<SubjectKind>;
            if (declared.subject === kind) {
                add(ruleId, subject, declared.check(subject as never, context));
            }
        }
    }
    return located;
};

/**
 * The accessibility issues of `document`: the same issues and IDs the editor's content checks find for the same
 * document, locale, colour options and model. It reads no browser global, so it runs on a server too.
 */
export const findContentIssues = (
    document: RichTextDocument,
    options: ContentCheckOptions,
): readonly ContentIssue[] => {
    if (!isRecord(document) || !isRecord(document.content)) {
        return [];
    }
    return locateContentIssues(document, options).map(({ issue }) => issue);
};
