import { FormControl } from '@components/FormControl';
import { TextInput } from '@components/TextInput';
import { floatingLinkSelectors, useFloatingLinkUrlInput } from '@udecode/plate';
import { AsProps, createComponentAs } from '@udecode/plate-core';
import React, { useState } from 'react';

export const FloatingLinkUrlInput = createComponentAs<AsProps<'input'>>((props) => {
    const htmlProps = useFloatingLinkUrlInput(props);
    const [value, setValue] = useState<string>((htmlProps.defaultValue as string) || '');
    return (
        <FormControl
            label={{
                children: 'URL',
                htmlFor: 'url',
                required: true,
            }}
        >
            <TextInput
                id="url"
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
