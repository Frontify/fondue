/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { FC, Suspense, lazy } from 'react';
import { IconProps } from './IconProps';
import { IconIcon } from '@foundation/Icon/Generated';

export const Icon: FC<IconProps> = ({ size, icon }) => {
    const path = `../../foundation/Icon/Generated/Icon${icon}`;
    const IconComponent = lazy(() => import(`${path}`));
    return (
        <Suspense fallback={<IconIcon size={size} />}>
            <IconComponent size={size} />
        </Suspense>
    );
};
