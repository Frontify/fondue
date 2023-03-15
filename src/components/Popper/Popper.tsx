/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, {
    Children,
    ReactElement,
    ReactNode,
    cloneElement,
    createContext,
    isValidElement,
    useEffect,
    useState,
} from 'react';
import { usePopper } from 'react-popper';
import { Placement } from '@popperjs/core';
import { Portal } from '@components/Portal/Portal';

export type { Placement } from '@popperjs/core';

const PopperContext = createContext<PopperProps>({});

export type PopperProps = {
    children?: ReactNode;
    open?: boolean;
    placement?: Placement;
    offset?: [number, number];
    flip?: boolean;
    enablePortal?: boolean;
};

const Reference = ({ children }: { children: ReactElement }) => {
    return children;
};

const Content = ({ children }: { children?: ReactNode }) => {
    const { open } = usePopperContext();
    return open ? <>{children}</> : null;
};
const usePopperContext = () => {
    const context = React.useContext(PopperContext);
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
    flip = false,
    enablePortal = false,
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
    const value = React.useMemo(() => ({ open }), [open]);
    return (
        <PopperContext.Provider value={value}>
            {Children.map(children, (child) => {
                if (isValidElement(child) && typeof child.type === 'function') {
                    const { name } = child.type;

                    if (name === 'Reference') {
                        return (
                            <div className="tw-w-fit" ref={setReferenceElement}>
                                {cloneElement(child, { ...child.props })}
                            </div>
                        );
                    }

                    if (name === 'Content') {
                        return (
                            <>
                                {enablePortal ? (
                                    <Portal>
                                        <div
                                            ref={setPopperElement}
                                            style={popperInstance.styles.popper}
                                            {...popperInstance.attributes.popper}
                                        >
                                            {cloneElement(child, {
                                                ...child.props,
                                            })}
                                        </div>
                                    </Portal>
                                ) : (
                                    <div
                                        ref={setPopperElement}
                                        style={popperInstance.styles.popper}
                                        {...popperInstance.attributes.popper}
                                    >
                                        {cloneElement(child, {
                                            ...child.props,
                                        })}
                                    </div>
                                )}
                            </>
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
