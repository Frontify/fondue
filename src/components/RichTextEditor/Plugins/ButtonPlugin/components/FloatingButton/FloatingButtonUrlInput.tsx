/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ChangeEventHandler, useCallback, useEffect, useRef } from 'react';
import { HTMLPropsAs, mergeProps, useComposedRef } from '@udecode/plate-core';
import { floatingButtonActions, floatingButtonSelectors, useFloatingButtonSelectors } from './floatingButtonStore';

export const useFloatingButtonUrlInput = (props: HTMLPropsAs<'input'>): HTMLPropsAs<'input'> => {
    const updated = useFloatingButtonSelectors().updated();
    const ref = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (ref.current && updated) {
            setTimeout(() => {
                ref.current?.focus();
            }, 0);
        }
    }, [updated]);

    const onChange: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
        floatingButtonActions.url(e.target.value);
    }, []);

    return mergeProps(
        {
            onChange,
            defaultValue: floatingButtonSelectors.url(),
        },
        { ...props, ref: useComposedRef<HTMLInputElement>(props.ref, ref) },
    );
};
