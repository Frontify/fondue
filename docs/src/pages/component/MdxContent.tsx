/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useMemo } from 'react';
import { getMDXComponent } from 'mdx-bundler/client';

export const MdxContent = ({ data }: { data: any }) => {
    const Component = useMemo(() => getMDXComponent(data), [data]);

    return (
        <>
            <h2>Data</h2>
            <Component />
        </>
    );
};
