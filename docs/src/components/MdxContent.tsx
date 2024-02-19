/* (c) Copyright Frontify Ltd., all rights reserved. */

import * as fondueComponents from '@frontify/fondue-components';
import { getMDXComponent } from 'mdx-bundler/client';
import React, { useMemo } from 'react';

import { EditableComponent } from './EditableComponent/EditableComponent';

export const MdxContent = ({ data }: { data: string }) => {
    const Component = useMemo(() => getMDXComponent(data), [data]);

    return (
        <Component
            components={{
                ...fondueComponents,
                code: (props) => {
                    if (props.children) {
                        return (
                            <EditableComponent
                                language={props.className?.split('language-')[1]}
                                code={props.children as string}
                            />
                        );
                    } else {
                        throw new Error('Invalid Code Content');
                    }
                },
            }}
        />
    );
};
