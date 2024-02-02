/* (c) Copyright Frontify Ltd., all rights reserved. */

import { allComponents } from 'components/content';

export { onBeforePrerenderStart };

async function onBeforePrerenderStart() {
    return allComponents.map((component) => `/component/${component.url}`);
}
