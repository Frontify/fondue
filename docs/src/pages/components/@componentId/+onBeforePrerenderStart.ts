/* (c) Copyright Frontify Ltd., all rights reserved. */

import { allComponents } from '#contentlayer/generated';

export const onBeforePrerenderStart = (): string[] => {
    return allComponents.map((component) => `/components/${component.route}`);
};
