/* (c) Copyright Frontify Ltd., all rights reserved. */

import { icons } from '@frontify/fondue-icons';

import { kebabCase } from '../../../utilities/kebabCase';

export const onBeforePrerenderStart = () => {
    const allIcons = Object.keys(icons);

    return allIcons.map((icon) => `/icons/${kebabCase(icon).replace(/^icon-/, '')}`);
};
