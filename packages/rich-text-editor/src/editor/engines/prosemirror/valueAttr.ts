/* (c) Copyright Frontify Ltd., all rights reserved. */

/**
 * Marks and inline elements keep their whole value in ONE engine attribute, so
 * the engine needs to know nothing about its shape; the document boundary
 * flattens it onto the document node.
 */
export const VALUE_ATTR = 'value';
