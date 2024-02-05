/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useMemo } from 'react';
import { getMDXComponent } from 'mdx-bundler/client';
import * as customComponents from '@frontify/fondue-components';

export const MdxContent = ({ data }: { data: string }) => {
    const Component = useMemo(() => getMDXComponent(data), [data]);

    return (
        <Component
            components={{
                ...customComponents,
            }}
        />
    );
};
