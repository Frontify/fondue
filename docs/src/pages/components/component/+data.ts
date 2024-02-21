/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type PageContextServer } from 'vike/types';

import { allComponents } from '#contentlayer/generated';

export type Data = Awaited<ReturnType<typeof data>>;

export const data = (pageContext: PageContextServer) => {
    const { routeParams } = pageContext;

    const component = allComponents.find((component) => component.route === routeParams['*']);

    if (!component) {
        return null;
    }

    return { component };
};
