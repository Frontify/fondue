/* (c) Copyright Frontify Ltd., all rights reserved. */

import { allComponents } from '@frontify/fondue-components/content';
import { render } from 'vike/abort';
import type { PageContextServer } from 'vike/types';

export type Data = Awaited<ReturnType<typeof data>>;

export const data = async (pageContext: PageContextServer) => {
    const { routeParams } = pageContext;

    const component = allComponents.find((component) => {
        return component.url === routeParams.pageUrl;
    });

    if (!component) {
        throw render(404, "This Component Doesn't exist");
    }

    return {
        component,
    };
};
