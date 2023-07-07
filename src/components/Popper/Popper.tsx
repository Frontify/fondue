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
    enablePortal = true,
    zIndex = 'auto',
    isDetached = false,
}: PopperProps) => {
    const [referenceElement, setReferenceElement] = useState<HTMLDivElement | null>(null);
    const [popperElement, setPopperElement] = useState<HTMLElement | null>(null);
    const [popperWidth, setPopperWidth] = useState(200);

    const popperInstance = usePopper(isDetached ? document.body : referenceElement, popperElement, {
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
        const updatePopper = async () => {
            if (popperInstance.update) {
                await popperInstance.update();
                if (popperInstance && popperInstance.state) {
                    setPopperWidth(popperInstance.state.rects.popper.width);
                }
            }
        };

        updatePopper().catch(console.error);
    }, [flip, placement, offset, open]);

    const detachedElementStyles = isDetached
        ? {
              left: `${(window.innerWidth - popperWidth) / 2}px`,
              top: '100px',
              transform: 'none',
          }
        : {};

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
                                    style={{
                                        zIndex,
                                        ...popperInstance.styles.popper,
                                        ...detachedElementStyles,
                                    }}
                                    {...popperInstance.attributes.popper}
                                >
                                    {child}
                                </div>
                            </Portal>
                        ) : (
                            <div
                                ref={setPopperElement}
                                style={{ zIndex, ...popperInstance.styles.popper, ...detachedElementStyles }}
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
