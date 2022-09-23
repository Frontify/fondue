/* (c) Copyright Frontify Ltd., all rights reserved. */

import { MouseEvent } from 'react';

export const getItemElementType = (link?: string, onClick?: (event: MouseEvent<HTMLButtonElement>) => void) => {
    if (link) {
        return 'a';
    } else if (onClick) {
        return 'button';
    }

    return 'span';
};
