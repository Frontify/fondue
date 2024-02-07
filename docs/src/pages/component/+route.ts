/* (c) Copyright Frontify Ltd., all rights reserved. */

import { render } from 'vike/abort';
import type { RouteSync } from 'vike/types';

export const route: RouteSync = (pageContext): ReturnType<RouteSync> => {
    const pageUrl = pageContext.urlPathname.toLocaleLowerCase().split('/component/').pop();

    if (!pageUrl) {
        throw render(404, "This Component doesn't exist");
    }

    return {
        routeParams: {
            pageUrl,
        },
    };
};
