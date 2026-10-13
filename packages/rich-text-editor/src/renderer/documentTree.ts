/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ComponentType } from 'react';

import {
    blockAttributeStyle,
    blockHtml,
    blockValueOf,
    type HtmlSpec,
    type PluginRegistry,
    type RteBlockNode,
    type RteDocumentOf,
    type RteInlineNode,
    type RteTextNode,
    type StyleMap,
    unknownBlockType,
    unknownInlineType,
    unknownMarkType,
} from '#/core';

/**
 * A stored document as one tree of what to draw, before it is drawn. The
 * readonly view turns it into React elements, export into an HTML string — so
 * the walk over blocks, marks and inlines, and the order marks nest in, exist
 * once.
 *
 * A node's markup is its `toHtml`. With `useComponents`, a node's
 * `render.component` takes its place: the readonly view asks for that, export
 * never does, so portable output always comes from `toHtml`.
 */

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

const html = (spec: HtmlSpec, content: DrawnNode[] = []): DrawnNode => ({ kind: 'html', spec, content });

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

const textNode = (text: RteTextNode, registry: PluginRegistry, options: Options): DrawnNode => {
    for (const key of Object.keys(text)) {
        if (key !== 'text' && key !== 'type' && text[key] !== undefined && !registry.marks.has(key)) {
            throw unknownMarkType(key);
        }
    }
    // The registry holds marks outermost first, so wrapping starts from the
    // innermost: the same nesting the engine draws.
    let drawn: DrawnNode = text.text;
    const carried = [...registry.marks].filter(([key]) => text[key] !== undefined);
    for (const [key, definition] of carried.reverse()) {
        const stored = text[key];
        const value = stored === true ? {} : (stored as Record<string, unknown>);
        drawn =
            component(definition.render?.component, { value }, [drawn], options) ??
            html(definition.toHtml(value), [drawn]);
    }
    return drawn;
};

const inlineNode = (inline: RteInlineNode, registry: PluginRegistry, options: Options): DrawnNode => {
    if (inline.text !== undefined) {
        return textNode(inline, registry, options);
    }
    const definition = registry.inlines.get(inline.type);
    if (!definition) {
        throw unknownInlineType(inline.type);
    }
    const { type: _type, text: _text, ...value } = inline;
    return component(definition.render?.component, { value }, [], options) ?? html(definition.toHtml(value));
};

const blockNode = (block: RteBlockNode, registry: PluginRegistry, options: Options): DrawnNode => {
    const definition = registry.blocks.get(block.type);
    if (!definition) {
        throw unknownBlockType(block.type);
    }
    const stored = block as Record<string, unknown>;
    let content: DrawnNode[] = [];
    if (definition.content === 'text') {
        const inlines = (block.children as RteInlineNode[] | undefined) ?? [];
        content = isEmpty(inlines)
            ? [html({ tag: 'br' })]
            : inlines.map((inline) => inlineNode(inline, registry, options));
    } else if (definition.content !== undefined) {
        content = ((block.children as RteBlockNode[] | undefined) ?? []).map((child) =>
            blockNode(child, registry, options),
        );
    }
    const style = definition.content === 'text' ? blockAttributeStyle(registry, stored) : undefined;
    return (
        component(definition.render?.component, { value: blockValueOf(definition, stored) }, content, options, style) ??
        html(blockHtml(registry, definition, stored), content)
    );
};

export const documentTree = (doc: RteDocumentOf, registry: PluginRegistry, options: Options): DrawnNode[] =>
    doc.blocks.map((block) => blockNode(block, registry, options));
