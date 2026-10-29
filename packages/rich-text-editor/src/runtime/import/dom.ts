/* (c) Copyright Frontify Ltd., all rights reserved. */

/** The host's DOM implementation, whose constructors and prototypes the import reads. */
export type DomWindow = Window & typeof globalThis;

/** A host window's `DOMParser` is what the import constructs. `Document` and `Node` are read from that window afterwards. */
const hasDomParser = (window: Window): window is DomWindow => {
    if (!('DOMParser' in window)) {
        return false;
    }

    return typeof window.DOMParser === 'function';
};

export const domWindow = (window: Window): DomWindow => {
    if (!hasDomParser(window)) {
        throw new Error('The host window has no DOM constructors.');
    }

    return window;
};

/** `Object.getPrototypeOf` returns `any`. */
export const prototypeOf = (value: object): object | null => {
    const prototype: unknown = Object.getPrototypeOf(value);
    if (typeof prototype !== 'object' || prototype === null) {
        return null;
    }

    return prototype;
};

/** A property of `prototype` or an ancestor, never an instance's own, which a named element can shadow. */
export const descriptorOf = (prototype: object, name: string): PropertyDescriptor => {
    for (let current: object | null = prototype; current !== null; current = prototypeOf(current)) {
        const descriptor = Object.getOwnPropertyDescriptor(current, name);
        if (descriptor !== undefined) {
            return descriptor;
        }
    }

    throw new Error(`The DOM implementation has no ${name}.`);
};

/** `PropertyDescriptor.value` is `any`. */
export const prototypeMethod = <Method>(prototype: object, name: string): Method => {
    const value: unknown = descriptorOf(prototype, name).value;
    if (typeof value !== 'function') {
        throw new TypeError(`The DOM implementation's ${name} is not a function.`);
    }

    return value as Method;
};

/** `PropertyDescriptor.get` is `any`. */
export const prototypeGetter = <Method>(prototype: object, name: string): Method => {
    const value: unknown = descriptorOf(prototype, name).get;
    if (typeof value !== 'function') {
        throw new TypeError(`The DOM implementation's ${name} is not a function.`);
    }

    return value as Method;
};

export const ownerDocumentOf = (node: Node): Document => {
    const owner = node.ownerDocument;
    if (owner === null) {
        throw new Error('The node has no owner document.');
    }

    return owner;
};

/** A new `name` element in the document of `node`, through the prototype, since an element named `createElement` shadows it. */
export const createElementBeside = (node: Node, name: string): HTMLElement => {
    const owner = ownerDocumentOf(node);
    const prototype = prototypeOf(owner);
    if (prototype === null) {
        throw new Error('The document has no prototype.');
    }

    const create = prototypeMethod<Document['createElement']>(prototype, 'createElement');

    return create.call(owner, name);
};

/** Moves the children of `element` before it, one at a time, and removes it. */
export const unwrap = (element: Element) => {
    for (let child = element.firstChild; child !== null; child = element.firstChild) {
        element.before(child);
    }

    element.remove();
};

export const isElement = (node: ChildNode): node is Element => node.nodeType === node.ELEMENT_NODE;

/** An XHTML element implements `HTMLElement`, and an SVG element implements `SVGElement`. */
const isStyledElement = (element: Element): element is HTMLElement | SVGElement =>
    element.namespaceURI === 'http://www.w3.org/1999/xhtml' || element.namespaceURI === 'http://www.w3.org/2000/svg';

export const styleOf = (element: Element): CSSStyleDeclaration | undefined => {
    if (!isStyledElement(element)) {
        return undefined;
    }

    return element.style;
};

/** A `nodeType` property is what a `Node` from any realm has. */
export const isNodeTarget = (value: EventTarget): value is Node => 'nodeType' in value;
