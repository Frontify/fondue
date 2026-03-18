/* (c) Copyright Frontify Ltd., all rights reserved. */

import figma from '@figma/code-connect';
import { IconCaretDown, IconIcon } from '@frontify/fondue-icons';

import { Button } from './Button';

figma.connect(Button, 'https://www.figma.com/design/pI75tIvK1HVdGuvs7My2DS/Fondue---Button?node-id=4795-12937', {
    props: {
        variant: figma.enum('Variant', {
            Default: 'default',
            Positive: 'positive',
            Negative: 'negative',
            Danger: 'danger',
            'Loud (highlight)': 'loud',
        }),
        emphasis: figma.enum('Emphasis', {
            Default: 'default',
            Weak: 'weak',
            Strong: 'strong',
        }),
        size: figma.enum('Size', {
            Small: 'small',
            Medium: 'medium',
            Large: 'large',
        }),
        disabled: figma.enum('State', {
            Disabled: true,
        }),
        icon: figma.boolean('Icon', {
            true: <IconIcon />,
            false: undefined,
        }),
        caret: figma.boolean('Caret', {
            true: <IconCaretDown size={12} />,
            false: undefined,
        }),
    },
    imports: ["import { Button } from '@frontify/fondue/components'"],
    example: (props) => (
        <Button variant={props.variant} emphasis={props.emphasis} size={props.size} disabled={props.disabled}>
            {props.icon}
            Button Text
            {props.caret}
        </Button>
    ),
});

figma.connect(Button, 'https://www.figma.com/design/pI75tIvK1HVdGuvs7My2DS/Fondue---Button?node-id=4808-21610', {
    props: {
        variant: figma.enum('Variant', {
            Default: 'default',
            Positive: 'positive',
            Negative: 'negative',
            Danger: 'danger',
            'Loud (highlight)': 'loud',
        }),
        emphasis: figma.enum('Emphasis', {
            Default: 'default',
            Weak: 'weak',
            Strong: 'strong',
        }),
        size: figma.enum('Size', {
            Small: 'small',
            Medium: 'medium',
            Large: 'large',
        }),
        disabled: figma.enum('State', {
            Disabled: true,
        }),
    },
    imports: ["import { Button } from '@frontify/fondue/components'"],
    example: (props) => (
        <Button
            aspect="square"
            variant={props.variant}
            emphasis={props.emphasis}
            size={props.size}
            disabled={props.disabled}
        >
            <IconIcon />
        </Button>
    ),
});
