import {
    floatingLinkActions,
    FloatingLinkProps,
    getSelectionBoundingClientRect,
    HTMLPropsAs,
    useComposedRef,
    useFloatingLinkSelectors,
    useVirtualFloatingLink,
} from '@udecode/plate';
import { useEffect } from 'react';

export const useFloatingLinkInsert = ({ floatingOptions, ...props }: FloatingLinkProps): HTMLPropsAs<'div'> => {
    const mode = useFloatingLinkSelectors().mode();
    const open = useFloatingLinkSelectors().open();

    const { update, style, floating } = useVirtualFloatingLink({
        open: open && mode === 'insert',
        getBoundingClientRect: getSelectionBoundingClientRect,
        whileElementsMounted: () => {},
        ...floatingOptions,
    });

    // wait for update before focusing input
    useEffect(() => {
        if (open) {
            update();
            floatingLinkActions.updated(true);
        } else {
            floatingLinkActions.updated(false);
        }
    }, [open, update]);

    return {
        style: {
            ...style,
            zIndex: 501,
        },
        ...props,
        ref: useComposedRef<HTMLElement | null>(props.ref, floating),
    };
};
