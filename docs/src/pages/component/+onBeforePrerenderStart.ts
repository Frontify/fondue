/* (c) Copyright Frontify Ltd., all rights reserved. */

import { allComponents } from '#contentlayer/generated';

export const onBeforePrerenderStart = () => {
    return allComponents.map((component) => `/component/${component.url}`);
};
