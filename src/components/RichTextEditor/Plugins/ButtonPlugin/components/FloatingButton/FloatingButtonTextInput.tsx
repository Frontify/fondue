import { ChangeEventHandler, useCallback } from 'react';
import { AsProps, HTMLPropsAs, createComponentAs, createElementAs, mergeProps } from '@udecode/plate-core';
import { floatingButtonActions, floatingButtonSelectors } from './floatingButtonStore';

export const useFloatingButtonTextInput = (props: HTMLPropsAs<'input'>): HTMLPropsAs<'input'> => {
    const onChange: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
        floatingButtonActions.text(e.target.value);
    }, []);

    return mergeProps(
        {
            onChange,
            defaultValue: floatingButtonSelectors.text(),
        },
        props,
    );
};

export const FloatingButtonTextInput = createComponentAs<AsProps<'input'>>((props) => {
    const htmlProps = useFloatingButtonTextInput(props);

    return createElementAs('input', htmlProps);
});
