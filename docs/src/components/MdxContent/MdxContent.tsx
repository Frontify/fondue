/* (c) Copyright Frontify Ltd., all rights reserved. */

import * as fondueComponents from '@frontify/fondue-components';
import { getMDXComponent } from 'mdx-bundler/client';
import { useMemo } from 'react';

import { MdxCodeBlock } from './MdxCodeBlock';
import { Heading2, Heading3 } from './MdxTypography';

export const MdxContent = ({ data }: { data: string }) => {
    const Component = useMemo(() => getMDXComponent(data), [data]);

    return (
        <Component
            components={{
                ...fondueComponents,
                code: MdxCodeBlock,
                h2: Heading2,
                h3: Heading3,
            }}
        />
    );
};
