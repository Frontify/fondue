/* (c) Copyright Frontify Ltd., all rights reserved. */

import { render } from 'vike/abort';
import { type PageContextServer } from 'vike/types';

import { allComponents } from '#contentlayer/generated';

export type Data = Awaited<ReturnType<typeof data>>;

export const data = (pageContext: PageContextServer) => {
    const { routeParams } = pageContext;

    const component = allComponents.find((component) => {
        return component.route === routeParams.pageUrl;
    });

    if (!component) {
        throw render(404, "This component doesn't exist");
    }

    return { component };
};
