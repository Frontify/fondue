/* (c) Copyright Frontify Ltd., all rights reserved. */

import { render } from 'vike/abort';
import { type RouteSync } from 'vike/types';

export const route: RouteSync = (pageContext): ReturnType<RouteSync> => {
    const pageUrl = pageContext.urlPathname.toLocaleLowerCase().split('/').at(-1) || '/';

    if (!pageUrl) {
        throw render(404, "This component doesn't exist");
    }

    return {
        routeParams: {
            pageUrl,
        },
    };
};
