/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { Suspense, lazy } from 'react';
import { GeneratedIconProps } from '../IconProps';
import { IconSize } from '../IconSize';

const generateIconWithSize = (iconName: string, props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> => {
    // eslint-disable-next-line unicorn/explicit-length-check
    const size = props.size || IconSize.Size16;

    const parsedSize = size.replace(/\D/g, '');

    const Icon = lazy(
        () =>
            import(
                /* @vite-ignore */ `../Generated/Icon${iconName}${
                    props.filled || iconName.includes('Filled') ? '' : parsedSize
                }.tsx`
            ),
    );

    return (
        <Suspense fallback={<></>}>
            <span>{<Icon {...props} />}</span>
        </Suspense>
    );
};

export default generateIconWithSize;
