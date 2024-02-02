/* (c) Copyright Frontify Ltd., all rights reserved. */

// https://vike.dev/data
export { data };
export type Data = Awaited<ReturnType<typeof data>>;
import { allComponents } from 'components/content';
import { render } from 'vike/abort';
import type { PageContextServer } from 'vike/types';

const data = async (pageContext: PageContextServer) => {
    const { routeParams } = pageContext;

    const component = allComponents.find((component) => {
        return component.url === routeParams.pageUrl;
    });

    if (!component) {
        throw render(404, "This Component Doesn't exist");
    }

    console.log(component);

    return {
        component,
    };
};
