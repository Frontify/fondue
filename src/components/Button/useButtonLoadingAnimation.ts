/* (c) Copyright Frontify Ltd., all rights reserved. */

import { CUBIC_BEZIER_EASE_OUT } from '@utilities/animations';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ButtonProps } from './Button';

export const useButtonLoadingAnimation = (children: ButtonProps['children'], icon: ButtonProps['icon']) => {
    const [contentWidth, setContentWidth] = useState('auto');
    const [isInitialRenderComplete, setIsInitialRenderComplete] = useState(false);
    const internalContentRef = useRef<HTMLDivElement>(null);

    const updateContentWidth = useCallback(() => {
        if (internalContentRef.current) {
            console.log(internalContentRef.current.getBoundingClientRect().width);
            setContentWidth(`${internalContentRef.current.getBoundingClientRect().width}px`);
        }
    }, []);

    useEffect(() => {
        setIsInitialRenderComplete(true);
    }, []);

    useEffect(() => {
        updateContentWidth();
    }, [children, icon, updateContentWidth]);

    const sharedProps = {
        initial: isInitialRenderComplete ? { translateY: -50, opacity: 0 } : false,
        animate: { translateY: 0, opacity: 1, mode: 'wait' },
        exit: { translateY: 50, opacity: 0 },
        transition: { ease: CUBIC_BEZIER_EASE_OUT, duration: 0.2 },
    };

    return {
        internalContentRef,
        contentWidth,
        updateContentWidth,
        loadingProps: { ...sharedProps, key: 'loading', style: { width: contentWidth } },
        contentProps: {
            ...sharedProps,
            key: 'content',
            ref: internalContentRef,
            onAnimationComplete: updateContentWidth,
        },
    };
};
