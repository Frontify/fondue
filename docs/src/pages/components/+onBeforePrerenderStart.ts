/* (c) Copyright Frontify Ltd., all rights reserved. */

import { allComponents } from '#contentlayer/generated';

export const onBeforePrerenderStart = () => {
    return ['/components', ...allComponents.map((component) => `/components/${component.route}`)];
};
