/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { useEffect, useState } from 'react';
import { Meta, Story } from '@storybook/react';
import {
    FieldsetHeader as FieldsetHeaderComponent,
    FieldsetHeaderProps,
    FieldsetHeaderSize,
    FieldsetHeaderType,
} from './FieldsetHeader';
import { IconIcon } from '@foundation/Icon';

export default {
    title: 'Components/Fieldset Header',
    component: FieldsetHeaderComponent,
    argTypes: {
        size: {
            options: [FieldsetHeaderSize.Small, FieldsetHeaderSize.Medium, FieldsetHeaderSize.Large],
            control: { type: 'radio' },
        },
        type: {
            options: Object.values(FieldsetHeaderType),
            control: { type: 'radio' },
        },
    },
    args: {
        size: FieldsetHeaderSize.Large,
        active: true,
        type: FieldsetHeaderType.Default,
        disabled: false,
        bold: true,
        children: 'Heading',
        decorator: true,
    },
} as Meta<FieldsetHeaderProps>;

export const FieldsetHeader: Story<FieldsetHeaderProps> = (args: FieldsetHeaderProps) => {
    const [active, setActive] = useState(args.active);

    useEffect(() => {
        setActive(args.active);
    }, [args.active]);

    return (
        <FieldsetHeaderComponent
            {...args}
            decorator={args.decorator && <IconIcon />}
            active={active}
            onClick={() => setActive(!active)}
        />
    );
};
