/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { FC, Suspense, lazy } from 'react';
import { IconProps } from './IconProps';

export const getIcon = (iconName: string) => {
    const Icon = lazy(() => import(/* @vite-ignore */ `./Generated/Icon${iconName}.tsx`));

    return (
        <Suspense fallback={<></>}>
            <Icon />
        </Suspense>
    );
};

export const Icon: FC<IconProps> = ({ size, icon }) => React.cloneElement(getIcon(icon), { size });
