/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type PageContextServer } from 'vike/types';

export type Data = Awaited<ReturnType<typeof data>>;

export const data = (pageContext: PageContextServer) => {
    const { routeParams } = pageContext;

    return { iconId: routeParams.iconId };
};
