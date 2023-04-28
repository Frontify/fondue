/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, {
    Children,
    ReactElement,
    ReactNode,
    cloneElement,
    createContext,
    isValidElement,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react';
import { usePopper } from 'react-popper';
import { Portal } from '@components/Portal';
import { PopperPlacement, PopperProps } from '@components/Popper/types';

const PopperContext = createContext<PopperProps>({});

const Reference = ({ children }: { children: ReactElement }) => {
    return children;
};

const Content = ({ children }: { children?: ReactNode }) => {
    const { open } = usePopperContext();
    return open && children;
};
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
    placement = PopperPlacement.BottomStart,
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

    const value = useMemo(() => ({ open }), [open]);
    return (
        <PopperContext.Provider value={value}>
            {Children.map(children, (child) => {
                if (isValidElement(child) && typeof child.type === 'function') {
                    const { name } = child.type;

                    if (name === Reference.name) {
                        return (
                            <div className="tw-w-fit" ref={setReferenceElement}>
                                {cloneElement(child, { ...child.props })}
                            </div>
                        );
                    }

                    if (name === Content.name) {
                        return enablePortal ? (
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
