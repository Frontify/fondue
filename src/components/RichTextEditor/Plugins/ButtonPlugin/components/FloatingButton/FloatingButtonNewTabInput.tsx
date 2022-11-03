import { ChangeEventHandler, useCallback, useEffect, useRef, useState } from 'react';
import {
    AsProps,
    HTMLPropsAs,
    createComponentAs,
    createElementAs,
    mergeProps,
    useComposedRef,
} from '@udecode/plate-core';
import { floatingButtonActions, floatingButtonSelectors, useFloatingButtonSelectors } from './floatingButtonStore';

export const useFloatingButtonNewTabInput = (props: HTMLPropsAs<'input'>): HTMLPropsAs<'input'> => {
    const updated = useFloatingButtonSelectors().updated();
    const ref = useRef<HTMLInputElement>(null);
    const [checked, setChecked] = useState<boolean>(floatingButtonSelectors.newTab());

    useEffect(() => {
        if (ref.current && updated) {
            setTimeout(() => {
                ref.current?.focus();
            }, 0);
        }
    }, [updated]);

    const onChange: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
        setChecked(e.target.checked);
        floatingButtonActions.newTab(e.target.checked);
    }, []);

    return mergeProps(
        {
            onChange,
            checked,
            type: 'checkbox',
        },
        { ...props, ref: useComposedRef<HTMLInputElement>(props.ref, ref) },
    );
};

export const FloatingButtonNewTabInput = createComponentAs<AsProps<'input'>>((props) => {
    const htmlProps = useFloatingButtonNewTabInput(props);

    return createElementAs('input', htmlProps);
});
