/* (c) Copyright Frontify Ltd., all rights reserved. */

import figma from '@figma/code-connect';
import { IconCaretDown, IconIcon } from '@frontify/fondue-icons';

import { SplitButton } from './SplitButton';

figma.connect(SplitButton, 'https://www.figma.com/design/pI75tIvK1HVdGuvs7My2DS/Fondue---Button?node-id=5569-35007', {
    props: {
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
        disabled: figma.enum('Disabled', {
            Disabled: true,
        }),
    },
    imports: ["import { SplitButton } from '@frontify/fondue/components'"],
    example: (props) => (
        <SplitButton.Root emphasis={props.emphasis} size={props.size} disabled={props.disabled}>
            <SplitButton.Content>
                <IconIcon size={16} />
                Button Text
            </SplitButton.Content>
            <SplitButton.Action>
                <SplitButton.ActionButton>
                    <IconCaretDown size={16} />
                </SplitButton.ActionButton>
            </SplitButton.Action>
        </SplitButton.Root>
    ),
});
