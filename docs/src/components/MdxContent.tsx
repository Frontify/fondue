/* (c) Copyright Frontify Ltd., all rights reserved. */

import * as fondueComponents from '@frontify/fondue-components';
import { getMDXComponent } from 'mdx-bundler/client';
import { useMemo } from 'react';

export const MdxContent = ({ data }: { data: string }) => {
    const Component = useMemo(() => getMDXComponent(data), [data]);

    return (
        <Component
            components={{
                ...fondueComponents,
            }}
        />
    );
};
