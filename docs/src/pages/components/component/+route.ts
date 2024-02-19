/* (c) Copyright Frontify Ltd., all rights reserved. */

import { resolveRoute } from 'vike/routing';
import { type RouteSync } from 'vike/types';

export const route: RouteSync = (pageContext): ReturnType<RouteSync> => {
    const componentPath = pageContext.urlPathname.split('/').slice(2).join('/');

    return {
        // Make `id` available as pageContext.routeParams.id
        routeParams: { componentPath },
    };
};
