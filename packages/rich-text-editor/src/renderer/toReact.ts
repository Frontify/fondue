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

const CHECKED_ATTRIBUTE = 'checked';

// `checked` is uncontrolled: the readonly view shows the state, it does not own it.
const REACT_PROP_NAMES = new Map([
    ['class', 'className'],
    ['tabindex', 'tabIndex'],
    [CHECKED_ATTRIBUTE, 'defaultChecked'],
]);

const reactPropName = (name: string): string => REACT_PROP_NAMES.get(name) ?? name;

const reactProps = (tag: string, attrs?: HtmlAttributes): Record<string, unknown> => {
    const props: Record<string, unknown> = {};
    for (const attribute of checkedAttributes(tag, attrs)) {
        switch (attribute.kind) {
            case 'text':
                props[reactPropName(attribute.name)] = attribute.value;
                break;
            case 'flag':
                if (attribute.name === CHECKED_ATTRIBUTE) {
                    props[reactPropName(attribute.name)] = true;
                } else {
                    // React 18 drops `true` for a name it does not know; a non-empty string is present for known and unknown booleans alike.
                    props[attribute.name] = attribute.name;
                }
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
