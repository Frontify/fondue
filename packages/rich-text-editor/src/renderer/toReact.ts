/* (c) Copyright Frontify Ltd., all rights reserved. */

// The drawn tree as React elements, for the readonly view. The only place an
// `HtmlSpec`'s attributes become React props — the counterpart of the core's
// `attributeEntries`; `__tests__/htmlParity.spec.tsx` holds the two to the same output.

import { createElement, type CSSProperties, type ReactNode } from 'react';

import { type HtmlAttributes, type HtmlSpec, safeStyleEntries, type StyleMap } from '#/core';

import { type DrawnNode } from './documentTree';

/** `text-align` → `textAlign`; custom properties (`--rte-columns`) stay as written. */
const reactStyleName = (property: string): string =>
    property.startsWith('--')
        ? property
        : property.replaceAll(/-([a-z])/g, (_, letter: string) => letter.toUpperCase());

/** The declarations `cssText` would write, so both surfaces drop the same unsafe ones. */
const toReactStyle = (style: StyleMap): CSSProperties =>
    Object.fromEntries(safeStyleEntries(style).map(([property, value]) => [reactStyleName(property), value]));

const reactProps = (attrs: HtmlAttributes = {}): Record<string, unknown> => {
    const props: Record<string, unknown> = {};
    for (const [name, value] of Object.entries(attrs)) {
        if (value === undefined || value === false) {
            continue;
        }
        switch (name) {
            case 'class':
                props.className = value;
                break;
            case 'tabindex':
                props.tabIndex = value;
                break;
            case 'style':
                props.style = toReactStyle(value as StyleMap);
                break;
            // Uncontrolled: the readonly view shows the state, it does not own it.
            case 'checked':
                props.defaultChecked = true;
                break;
            default:
                props[name] = value;
        }
    }
    return props;
};

export const specToReact = (spec: HtmlSpec, content: ReactNode[], key?: number): ReactNode => {
    const { children } = spec;
    let inner: ReactNode[] = [];
    if (children === true) {
        inner = content;
    } else if (typeof children === 'string') {
        inner = [children];
    } else if (children) {
        inner = children.map((child, index) =>
            typeof child === 'string' ? child : specToReact(child, content, index),
        );
    }
    return createElement(spec.tag, { ...reactProps(spec.attrs), key }, ...inner);
};

const nodeToReact = (node: DrawnNode, key: number): ReactNode => {
    if (typeof node === 'string') {
        return node;
    }
    const content = node.content.map(nodeToReact);
    if (node.kind === 'html') {
        return specToReact(node.spec, content, key);
    }
    const style = node.style && Object.keys(node.style).length > 0 ? toReactStyle(node.style) : undefined;
    return createElement(node.component, { ...node.props, style, key }, ...content);
};

export const toReact = (nodes: readonly DrawnNode[]): ReactNode[] => nodes.map(nodeToReact);
