/* (c) Copyright Frontify Ltd., all rights reserved. */

// A stored document as one tree of what to draw, before it is drawn: the
// readonly view turns it into React, export into an HTML string, so the walk
// over blocks, marks and inlines (and the order marks nest in) exists once.
//
// A node's markup is its `toHtml`. With `useComponents`, its `render.component`
// takes over; the readonly view asks for that, export never does.

import { type ComponentType } from 'react';

import {
    blockAttributeStyle,
    blockHtml,
    blockValueOf,
    type HtmlSpec,
    type MarkDefinition,
    type PluginRegistry,
    type RteBlockNode,
    type RteDocumentOf,
    type RteInlineNode,
    type RteTextNode,
    type StyleMap,
} from '#/core';

import styles from './document.module.scss';

export type DrawnNode =
    | string
    /** A node's markup, its content going where `children: true` is. */
    | { kind: 'html'; spec: HtmlSpec; content: DrawnNode[] }
    /** A node's `render.component`, its content as `children`. */
    | {
          kind: 'component';
          component: ComponentType<Record<string, unknown>>;
          props: Record<string, unknown>;
          style?: StyleMap;
          content: DrawnNode[];
      };

type Options = { useComponents: boolean };

/**
 * A node no plugin passed in defines — a plugin left out, or a document from
 * a newer version. Drawing what can be drawn beats losing the whole document,
 * so it is skipped (a block keeps its content) and, in development, named once.
 */
const warnedUnknown = new Set<string>();
const warnUnknownType = (kind: 'block' | 'inline' | 'mark', type: string): void => {
    if (process.env.NODE_ENV === 'production' || warnedUnknown.has(`${kind}:${type}`)) {
        return;
    }
    warnedUnknown.add(`${kind}:${type}`);
    console.warn(
        `[RichTextRenderer] Unknown ${kind} type "${type}" skipped. Did you forget to pass the plugin that defines it in \`plugins\`?`,
    );
};

/** A stored mark value that puts the mark on: `false` and `null` say it is off, as if left out. */
const isCarried = (stored: unknown): boolean => stored !== undefined && stored !== null && stored !== false;

// --- Building blocks ---

const html = (spec: HtmlSpec, content: DrawnNode[] = []): DrawnNode => ({ kind: 'html', spec, content });

/** The node drawn by its `render.component`, or null when components are off or it has none. */
const component = <TProps>(
    drawn: ComponentType<TProps> | undefined,
    props: Record<string, unknown>,
    content: DrawnNode[],
    options: Options,
    style?: StyleMap,
): DrawnNode | null =>
    options.useComponents && drawn
        ? {
              kind: 'component',
              component: drawn as unknown as ComponentType<Record<string, unknown>>,
              props,
              style,
              content,
          }
        : null;

/** An empty text block still takes up a line, as it does while editing. */
const isEmpty = (inlines: readonly RteInlineNode[]): boolean =>
    inlines.length === 0 || (inlines.length === 1 && inlines[0]?.text === '');

/** A mark a text run carries: its type, its value as `toHtml` takes it, and its definition. */
type CarriedMark = { type: string; value: Record<string, unknown>; definition: MarkDefinition };

/** The registry's marks as a list, cached per registry rather than rebuilt per text run. */
const markLists = new WeakMap<PluginRegistry, readonly [string, MarkDefinition][]>();
const markListOf = (registry: PluginRegistry): readonly [string, MarkDefinition][] => {
    let list = markLists.get(registry);
    if (list === undefined) {
        list = [...registry.marks];
        markLists.set(registry, list);
    }
    return list;
};

/** The marks a text run carries, outermost first — the registry's order. Unknown marks are left off. */
const carriedMarks = (text: RteTextNode, registry: PluginRegistry): CarriedMark[] => {
    for (const key of Object.keys(text)) {
        if (key !== 'text' && key !== 'type' && isCarried(text[key]) && !registry.marks.has(key)) {
            warnUnknownType('mark', key);
        }
    }
    return markListOf(registry)
        .filter(([type]) => isCarried(text[type]))
        .map(([type, definition]) => {
            const stored = text[type];
            return { type, value: stored === true ? {} : (stored as Record<string, unknown>), definition };
        });
};

const sameValue = (left: unknown, right: unknown): boolean => {
    if (left === right) {
        return true;
    }
    if (typeof left !== 'object' || typeof right !== 'object' || left === null || right === null) {
        return false;
    }
    const leftEntries = Object.entries(left);
    return (
        leftEntries.length === Object.keys(right).length &&
        leftEntries.every(([key, value]) => sameValue(value, (right as Record<string, unknown>)[key]))
    );
};

const sameMark = (left: CarriedMark, right: CarriedMark): boolean =>
    left.type === right.type && sameValue(left.value, right.value);

/** An inline element, or null for one no plugin defines: it has no text of its own to fall back to. */
const inlineElement = (
    inline: Exclude<RteInlineNode, RteTextNode>,
    registry: PluginRegistry,
    options: Options,
): DrawnNode | null => {
    const definition = registry.inlines.get(inline.type);
    if (!definition) {
        warnUnknownType('inline', inline.type);
        return null;
    }
    const { type: _type, text: _text, ...value } = inline;
    return component(definition.render?.component, { value }, [], options) ?? html(definition.toHtml(value));
};

/**
 * A text block's inlines, with each mark drawn once around the whole stretch of
 * neighbours sharing it, as the editor does — wrapping each run alone would
 * split a code span at a superscript inside it, or a partly bold link, in two.
 *
 * Marks nest outermost first; a mark stays open while the following runs carry
 * it, and every mark outside it, with the same values.
 */
const inlineNodes = (inlines: readonly RteInlineNode[], registry: PluginRegistry, options: Options): DrawnNode[] => {
    const root: DrawnNode[] = [];
    const open: (CarriedMark & { content: DrawnNode[] })[] = [];
    const close = (keep: number): void => {
        while (open.length > keep) {
            const mark = open.pop();
            if (mark === undefined) {
                break;
            }
            const drawn =
                component(mark.definition.render?.component, { value: mark.value }, mark.content, options) ??
                html(mark.definition.toHtml(mark.value), mark.content);
            (open[open.length - 1]?.content ?? root).push(drawn);
        }
    };

    for (const inline of inlines) {
        if (inline.text === undefined) {
            const element = inlineElement(inline, registry, options);
            if (element !== null) {
                close(0);
                root.push(element);
            }
            continue;
        }
        const marks = carriedMarks(inline, registry);
        let keep = 0;
        while (
            keep < open.length &&
            keep < marks.length &&
            sameMark(open[keep] as CarriedMark, marks[keep] as CarriedMark)
        ) {
            keep++;
        }
        close(keep);
        for (const mark of marks.slice(keep)) {
            open.push({ ...mark, content: [] });
        }
        (open[open.length - 1]?.content ?? root).push(inline.text);
    }
    close(0);
    return root;
};

const isLineBreak = (node: DrawnNode | undefined): boolean =>
    typeof node === 'object' && node.kind === 'html' && node.spec.tag === 'br';

/** A text block's content: inlines, or one break when empty so the line still takes space. */
const textBlockContent = (block: RteBlockNode, registry: PluginRegistry, options: Options): DrawnNode[] => {
    const inlines = (block.children as RteInlineNode[] | undefined) ?? [];
    if (isEmpty(inlines)) {
        return [html({ tag: 'br' })];
    }
    const content = inlineNodes(inlines, registry, options);
    // A trailing line break starts a line the browser would not draw; one more
    // break holds it open, as the editor shows it.
    if (isLineBreak(content[content.length - 1])) {
        content.push(html({ tag: 'br' }));
    }
    return content;
};

/** A child stored as a block (it has a type the plugins know, or children of its own) rather than an inline. */
const isBlockLike = (node: unknown, registry: PluginRegistry): boolean => {
    const { type, children } = node as { type?: unknown; children?: unknown };
    return Array.isArray(children) || (typeof type === 'string' && registry.blocks.has(type));
};

/**
 * A block no plugin defines: its content, in a plain `div`, so the text in it
 * still reads. Nothing when it holds nothing (a void block).
 */
const unknownBlockNode = (block: RteBlockNode, registry: PluginRegistry, options: Options): DrawnNode | null => {
    warnUnknownType('block', block.type);
    const children = (block.children as unknown[] | undefined) ?? [];
    if (children.length === 0) {
        return null;
    }
    const content = children.every((child) => isBlockLike(child, registry))
        ? (children as RteBlockNode[]).flatMap((child) => blockNode(child, registry, options) ?? [])
        : inlineNodes(children as RteInlineNode[], registry, options);
    return content.length === 0 ? null : html({ tag: 'div', children: true }, content);
};

// --- Public ---

/** The block drawn, or null for a block no plugin defines that holds nothing. */
export const blockNode = (block: RteBlockNode, registry: PluginRegistry, options: Options): DrawnNode | null => {
    const definition = registry.blocks.get(block.type);
    if (!definition) {
        return unknownBlockNode(block, registry, options);
    }
    const stored = block as Record<string, unknown>;
    let content: DrawnNode[] = [];
    if (definition.content === 'text') {
        content = textBlockContent(block, registry, options);
    } else if (definition.content !== undefined) {
        content = ((block.children as RteBlockNode[] | undefined) ?? []).flatMap(
            (child) => blockNode(child, registry, options) ?? [],
        );
    }
    const style = definition.content === 'text' ? blockAttributeStyle(registry, stored) : undefined;
    return (
        component(definition.render?.component, { value: blockValueOf(definition, stored) }, content, options, style) ??
        html(blockHtml(registry, definition, stored), content)
    );
};

export const documentTree = (doc: RteDocumentOf, registry: PluginRegistry, options: Options): DrawnNode[] =>
    doc.blocks.flatMap((block) => blockNode(block, registry, options) ?? []);

/**
 * The element a document sits in: the document's own class, plugins' content
 * classes and their custom properties. Readonly view and export both wrap in
 * it, so a document reads the same in either, and as in the editor.
 */
export const documentRootSpec = (registry: PluginRegistry, className?: string): HtmlSpec => ({
    tag: 'div',
    attrs: {
        class: [styles.document, className, ...registry.contentClassNames].filter(Boolean).join(' '),
        style: { ...registry.contentProperties },
    },
    children: true,
});
