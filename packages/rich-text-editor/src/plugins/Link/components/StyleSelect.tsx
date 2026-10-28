/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Button, Dropdown, Label } from '@frontify/fondue-components';
import { useId } from 'react';

import { CheckedSlot, type EditorOverlay } from '#/bridge/pluginApi/define';

import { type LinkPopoverStrings, type LinkStyleOption } from '../helpers/linkPopoverModel';

export type StyleSelectProps = {
    strings: LinkPopoverStrings;
    styles: readonly LinkStyleOption[];
    value: string;
    onChange: (styleId: string) => void;
    container: EditorOverlay['container'];
};

/** The Style select, with "No style" first. */
export const StyleSelect = ({ strings, styles: options, value, onChange, container }: StyleSelectProps) => {
    const fieldId = useId();
    const labelId = useId();
    const valueId = useId();
    const chosen = options.find((style) => style.id === value);
    let label = strings.noStyle;
    if (chosen !== undefined) {
        label = chosen.label;
    }

    return (
        <>
            <Label id={labelId} htmlFor={fieldId}>
                {strings.style}
            </Label>
            <Dropdown.Root>
                <Dropdown.Trigger asChild>
                    <Button
                        // Fondue's `Button` passes props it does not declare on to its `button`.
                        {...{
                            id: fieldId,
                            'aria-labelledby': `${labelId} ${valueId}`,
                        }}
                        emphasis="default"
                    >
                        <span id={valueId}>{label}</span>
                    </Button>
                </Dropdown.Trigger>
                <Dropdown.Content container={container}>
                    {[{ id: '', label: strings.noStyle }, ...options].map((style) => (
                        <Dropdown.Item
                            key={style.id}
                            // Fondue's `Dropdown.Item` types no menu item role or state, which Radix still takes.
                            {...{ role: 'menuitemradio', 'aria-checked': style.id === value }}
                            onSelect={() => onChange(style.id)}
                        >
                            {style.label}
                            {style.id === value && <CheckedSlot />}
                        </Dropdown.Item>
                    ))}
                </Dropdown.Content>
            </Dropdown.Root>
        </>
    );
};

StyleSelect.displayName = 'StyleSelect';
