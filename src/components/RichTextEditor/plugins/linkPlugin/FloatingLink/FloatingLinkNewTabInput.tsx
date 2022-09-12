import { Checkbox, CheckboxState } from '@components/Checkbox';
import { AsProps, createComponentAs, useFloatingLinkNewTabInput } from '@udecode/plate';
import React from 'react';

export const FloatingLinkNewTabInput = createComponentAs<AsProps<'input'>>((props) => {
    const htmlProps = useFloatingLinkNewTabInput(props);

    return (
        <Checkbox
            value="new-tab"
            label="Open in new tab"
            state={htmlProps.checked ? CheckboxState.Checked : CheckboxState.Unchecked}
            onChange={(val) => {
                htmlProps.onChange?.({
                    target: {
                        checked: val,
                    },
                } as any);
            }}
        />
    );
});
