import { FormControl } from '@components/FormControl';
import { TextInput } from '@components/TextInput';
import { useFloatingLinkTextInput } from '@udecode/plate';
import { AsProps, createComponentAs } from '@udecode/plate-core';
import React, { useState } from 'react';

export const FloatingLinkTextInput = createComponentAs<AsProps<'input'>>((props) => {
    const htmlProps = useFloatingLinkTextInput(props);
    const [value, setValue] = useState<string>((htmlProps.defaultValue as string) || '');
    return (
        <FormControl
            label={{
                children: 'Text',
                htmlFor: 'linkText',
                required: true,
            }}
        >
            <TextInput
                id="linkText"
                value={value}
                onChange={(val) => {
                    setValue(val);
                    htmlProps.onChange?.({
                        target: {
                            value: val,
                        },
                    } as any);
                }}
            />
        </FormControl>
    );
});
