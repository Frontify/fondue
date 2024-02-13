/* (c) Copyright Frontify Ltd., all rights reserved. */

import { icons } from '@frontify/fondue-icons';
import camelCase from 'lodash/fp/camelCase';
import upperFirst from 'lodash/fp/upperFirst';
import { render } from 'vike/abort';
import { type PageContextServer } from 'vike/types';

export type Data = Awaited<ReturnType<typeof data>>;

export const data = (pageContext: PageContextServer) => {
    const { routeParams } = pageContext;

    const iconNameInFondueIcons = `Icon${upperFirst(camelCase(routeParams.iconId || ''))}`;

    if (!(iconNameInFondueIcons in icons)) {
        throw render(404, `Icon with name ${routeParams.iconId} not found`);
    }

    return { iconName: iconNameInFondueIcons };
};
