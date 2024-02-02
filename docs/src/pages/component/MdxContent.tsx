/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useMemo } from 'react';
import { getMDXComponent } from 'mdx-bundler/client';

export const MdxContent = ({ data }: { data: any }) => {
    const Component = useMemo(() => getMDXComponent(data), [data]);

    return (
        <Component
            components={{
                h1: (props) => (
                    <h1 className="tw-text-3xl" {...props}>
                        {props.children}
                    </h1>
                ),
            }}
        />
    );
};
