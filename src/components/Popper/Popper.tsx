/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, {
    Children,
    ReactElement,
    ReactNode,
    createContext,
    isValidElement,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react';
import { usePopper } from 'react-popper';
import { Portal } from '@components/Portal';
import { PopperProps } from '@components/Popper/types';

const PopperContext = createContext<PopperProps>({});

const Reference = ({ children }: { children: ReactElement }) => {
    return children;
};
Reference.displayName = 'FonduePopperReference';

const Content = ({ children }: { children?: ReactNode }): Nullable<ReactElement> => {
    const { open } = usePopperContext();
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return open ? <>{children}</> : null;
};
Content.displayName = 'FonduePopperContent';

const usePopperContext = () => {
    const context = useContext(PopperContext);
    if (!context) {
        throw new Error('Popper compound components cannot be rendered outside the Popper component');
    }
    return context;
};

export const Popper = ({
    children,
    open,
    placement = 'bottom-start',
    offset = [0, 8],
    flip = true,
    enablePortal = false,
    zIndex = 'auto',
}: PopperProps) => {
    const [referenceElement, setReferenceElement] = useState<HTMLDivElement | null>(null);
    const [popperElement, setPopperElement] = useState<HTMLElement | null>(null);

    const popperInstance = usePopper(referenceElement, popperElement, {
        placement,
        modifiers: [
            { name: 'offset', options: { offset } },
            {
                name: 'flip',
                enabled: flip,
            },
        ],
    });

    useEffect(() => {
        if (popperInstance.update) {
            popperInstance.update();
        }
    }, [flip, placement, offset, open]);

    const value = useMemo(() => ({ open }), [open]);
    return (
        <PopperContext.Provider value={value}>
            {Children.map(children, (child) => {
                if (isValidElement(child) && typeof child.type === 'function') {
                    const { name } = child.type;

                    if (name === Reference.name) {
                        return <div ref={setReferenceElement}>{child}</div>;
                    }

                    if (name === Content.name) {
                        return enablePortal ? (
                            <Portal>
                                <div
                                    ref={setPopperElement}
                                    style={{ zIndex, ...popperInstance.styles.popper }}
                                    {...popperInstance.attributes.popper}
                                >
                                    {child}
                                </div>
                            </Portal>
                        ) : (
                            <div
                                ref={setPopperElement}
                                style={{ zIndex, ...popperInstance.styles.popper }}
                                {...popperInstance.attributes.popper}
                            >
                                {child}
                            </div>
                        );
                    }
                }
            })}
        </PopperContext.Provider>
    );
};
Popper.displayName = 'FonduePopper';
Popper.Reference = Reference;
Popper.Content = Content;
