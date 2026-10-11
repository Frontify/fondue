/* (c) Copyright Frontify Ltd., all rights reserved. */

/** A property of `prototype` or an ancestor, never an instance's own, which a named element can shadow. */
export const descriptorOf = (prototype: object, name: string): PropertyDescriptor => {
    for (
        let current: object | null = prototype;
        current !== null;
        current = Object.getPrototypeOf(current) as object | null
    ) {
        const descriptor = Object.getOwnPropertyDescriptor(current, name);
        if (descriptor !== undefined) {
            return descriptor;
        }
    }
    throw new Error(`The DOM implementation has no ${name}.`);
};

/** A new `name` element in the document of `node`, through the prototype, since an element named `createElement` shadows it. */
export const createElementBeside = (node: Node, name: string): HTMLElement => {
    const owner = node.ownerDocument as Document;
    const create = descriptorOf(Object.getPrototypeOf(owner) as object, 'createElement')
        .value as Document['createElement'];
    return create.call(owner, name);
};

/** Moves the children of `element` before it, one at a time, and removes it. */
export const unwrap = (element: Element) => {
    for (let child = element.firstChild; child !== null; child = element.firstChild) {
        element.before(child);
    }
    element.remove();
};
