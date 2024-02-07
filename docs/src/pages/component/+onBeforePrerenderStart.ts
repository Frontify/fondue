/* (c) Copyright Frontify Ltd., all rights reserved. */

import { allComponents } from '@frontify/fondue-components/content';

export const onBeforePrerenderStart = () => {
    return allComponents.map((component) => `/component/${component.url}`);
};
