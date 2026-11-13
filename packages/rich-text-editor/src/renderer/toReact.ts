/* (c) Copyright Frontify Ltd., all rights reserved. */

// The drawn tree as React elements, for the readonly view. The only place an
// `HtmlSpec`'s attributes become React props — the counterpart of the core's
// `attributeEntries`, both reading `checkedAttributes`; `__tests__/htmlParity.spec.tsx` holds the two to the same output.

import { createElement, type CSSProperties, type ReactNode } from 'react';

import { checkedAttributes, type HtmlAttributes, type HtmlSpec, safeStyleEntries, type StyleMap } from '#/core';

import { type DrawnNode } from './documentTree';

/** `text-align` → `textAlign`; custom properties (`--rte-columns`) stay as written. */
const reactStyleName = (property: string): string =>
    property.startsWith('--')
        ? property
        : property.replaceAll(/-([a-z])/g, (_, letter: string) => letter.toUpperCase());

/** The declarations `cssText` would write, so both surfaces drop the same unsafe ones. */
const toReactStyle = (style: StyleMap): CSSProperties =>
    Object.fromEntries(safeStyleEntries(style).map(([property, value]) => [reactStyleName(property), value]));

// `checked` is uncontrolled: the readonly view shows the state, it does not own it.
const REACT_PROP_NAMES = new Map([
    ['class', 'className'],
    ['tabindex', 'tabIndex'],
    ['checked', 'defaultChecked'],
]);

const reactPropName = (name: string): string => REACT_PROP_NAMES.get(name) ?? name;

/** Boolean attributes React 18 knows by their HTML name. It writes them for `true` and drops them for `''`. */
const REACT_BOOLEAN_ATTRIBUTES: ReadonlySet<string> = new Set([
    'checked',
    'disabled',
    'hidden',
    'open',
    'required',
    'controls',
    'loop',
    'reversed',
    'async',
    'defer',
    'default',
]);

/** What React needs for a present flag to reach the DOM as `name=""`, as the editor and the HTML export write it. */
const flagValue = (name: string): string | true => {
    if (REACT_BOOLEAN_ATTRIBUTES.has(name)) {
        return true;
    }
    // React 18 drops `true` for a name it does not know, but writes an empty string.
    return '';
};

const reactProps = (tag: string, attrs?: HtmlAttributes): Record<string, unknown> => {
    const props: Record<string, unknown> = {};
    for (const attribute of checkedAttributes(tag, attrs)) {
        switch (attribute.kind) {
            case 'text':
                props[reactPropName(attribute.name)] = attribute.value;
                break;
            case 'flag':
                props[reactPropName(attribute.name)] = flagValue(attribute.name);
                break;
            case 'style':
                props.style = toReactStyle(attribute.value);
                break;
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
    return createElement(spec.tag, { ...reactProps(spec.tag, spec.attrs), key }, ...inner);
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
