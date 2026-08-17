/* (c) Copyright Frontify Ltd., all rights reserved. */

import { cloneElement, Fragment, isValidElement, type CSSProperties, type ReactElement, type ReactNode } from 'react';

import {
    type PluginRegistry,
    type RteBlockNode,
    type RteDocumentOf,
    type RteInlineNode,
    type RteTextNode,
    unknownBlockType,
    unknownInlineType,
    unknownMarkType,
} from '#/core';

/**
 * Walk a stored document to React via each plugin's `renderComponent`. Marks
 * fold in nesting order (lowest wraps highest). No engine is involved.
 */

const isEmptyInlines = (inlines: readonly RteInlineNode[]): boolean =>
    inlines.length === 0 || (inlines.length === 1 && inlines[0]?.text === '');

const toReactStyle = (declarations: readonly string[]): CSSProperties => {
    const style: Record<string, string> = {};
    for (const declaration of declarations) {
        const colon = declaration.indexOf(':');
        if (colon === -1) {
            continue;
        }
        const property = declaration
            .slice(0, colon)
            .trim()
            .replaceAll(/-([a-z])/g, (_, letter: string) => letter.toUpperCase());
        style[property] = declaration.slice(colon + 1).trim();
    }
    return style;
};

const injectedStyle = (block: RteBlockNode, registry: PluginRegistry): CSSProperties | undefined => {
    const declarations = registry.attributes.flatMap((attribute) => {
        const value = (block as Record<string, unknown>)[attribute.type];
        return typeof value === 'string' && value !== '' ? [attribute.toStyle(value)] : [];
    });
    return declarations.length > 0 ? toReactStyle(declarations) : undefined;
};

const withInjectedStyle = (node: ReactNode, style: CSSProperties | undefined, key: string): ReactNode => {
    if (style === undefined) {
        return <Fragment key={key}>{node}</Fragment>;
    }
    if (isValidElement(node)) {
        const existing = (node.props as { style?: CSSProperties }).style;
        // Alignment (and other kind:'attribute' CSS) has to land on the element
        // the plugin rendered, not a wrapper — a wrapper would change layout.
        // eslint-disable-next-line @eslint-react/no-clone-element
        return cloneElement(node as ReactElement<{ style?: CSSProperties }>, { key, style: { ...existing, ...style } });
    }
    return (
        <span key={key} style={style}>
            {node}
        </span>
    );
};

const markEntries = (text: RteTextNode, registry: PluginRegistry) =>
    [...registry.marks.entries()]
        .filter(([type]) => text[type] !== undefined)
        .map(([type, definition], index) => ({ type, definition, index }))
        .sort(
            (left, right) =>
                (left.definition.nesting ?? 0) - (right.definition.nesting ?? 0) || left.index - right.index,
        );

const renderText = (text: RteTextNode, registry: PluginRegistry, key: string): ReactNode => {
    for (const type of Object.keys(text).filter((name) => name !== 'text' && text[name] !== undefined)) {
        if (!registry.marks.has(type)) {
            throw unknownMarkType(type);
        }
    }

    // Wrap from innermost (highest nesting) to outermost (lowest), matching
    // the engine: the first-declared / lowest-nesting mark wraps the rest.
    let node: ReactNode = text.text;
    const entries = markEntries(text, registry);
    for (let index = entries.length - 1; index >= 0; index--) {
        const entry = entries[index];
        if (entry === undefined) {
            continue;
        }
        const stored = text[entry.type];
        const value = stored === true || stored === undefined ? {} : (stored as Record<string, unknown>);
        node = entry.definition.renderComponent({ children: node, value });
    }
    return <Fragment key={key}>{node}</Fragment>;
};

const renderInline = (inline: RteInlineNode, registry: PluginRegistry, key: string): ReactNode => {
    if (inline.text !== undefined) {
        return renderText(inline, registry, key);
    }
    const definition = registry.inlines.get(inline.type);
    if (!definition) {
        throw unknownInlineType(inline.type);
    }
    return <Fragment key={key}>{definition.renderComponent({ node: inline })}</Fragment>;
};

const renderInlines = (inlines: readonly RteInlineNode[], registry: PluginRegistry): ReactNode => {
    if (isEmptyInlines(inlines)) {
        return <br />;
    }
    return inlines.map((inline, index) => renderInline(inline, registry, String(index)));
};

const renderBlockChildren = (block: RteBlockNode, registry: PluginRegistry, definitionChildren: unknown): ReactNode => {
    if (definitionChildren === 'text') {
        return renderInlines((block.children as RteInlineNode[] | undefined) ?? [], registry);
    }
    if (definitionChildren && typeof definitionChildren === 'object') {
        return ((block.children as RteBlockNode[] | undefined) ?? []).map((child, index) =>
            renderBlock(child, registry, String(index)),
        );
    }
    return undefined;
};

const renderBlock = (block: RteBlockNode, registry: PluginRegistry, key: string): ReactNode => {
    if (block.type === 'paragraph') {
        return (
            <p key={key} style={injectedStyle(block, registry)}>
                {renderInlines((block.children as RteInlineNode[] | undefined) ?? [], registry)}
            </p>
        );
    }

    const definition = registry.blocks.get(block.type);
    if (!definition) {
        throw unknownBlockType(block.type);
    }

    const rendered = definition.renderComponent({
        node: block,
        children: renderBlockChildren(block, registry, definition.children),
    });
    const style = definition.children === 'text' ? injectedStyle(block, registry) : undefined;
    return withInjectedStyle(rendered, style, key);
};

export const renderDocument = (doc: RteDocumentOf, registry: PluginRegistry): ReactNode =>
    doc.blocks.map((block, index) => renderBlock(block, registry, String(index)));
