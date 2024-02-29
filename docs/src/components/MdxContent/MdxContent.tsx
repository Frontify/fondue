/* (c) Copyright Frontify Ltd., all rights reserved. */

import { getMDXComponent } from 'mdx-bundler/client';
import { useMemo } from 'react';

import { Code, Pre } from './MdxCode';
import { MdxTable } from './MdxTable';
import { Heading2, Heading3 } from './MdxTypography';

export const MdxContent = ({ data }: { data: string }) => {
    const Component = useMemo(() => getMDXComponent(data), [data]);

    return (
        <Component
            components={{
                pre: Pre,
                code: Code,
                h2: Heading2,
                h3: Heading3,
                ...MdxTable,
            }}
        />
    );
};
