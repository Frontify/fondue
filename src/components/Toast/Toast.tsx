/* (c) Copyright Frontify Ltd., all rights reserved. */

import { INSET_BORDER } from '@utilities/borderStyle';
import { merge } from '@utilities/merge';
import { AnimatePresence, motion } from 'framer-motion';
import React, { ReactElement } from 'react';
import { ToastAnimationDirection, ToastProps, toastStylesBackgroundColorsMap } from './types';

const CONTAINER_BASE_CLASSES = 'tw-min-h-[4.25rem] tw-bg-base tw-rounded-lg tw-shadow-mid tw-z-[120000]';
const CONTAINER_CLASSES = merge([CONTAINER_BASE_CLASSES, INSET_BORDER]);

const getToastStartPosition = (animationDirection: ToastAnimationDirection) =>
    animationDirection === ToastAnimationDirection.BottomToTop ? '150%' : '-150%';

export const Toast = ({
    isOpen,
    style,
    icon,
    animationDirection = ToastAnimationDirection.BottomToTop,
    children,
}: ToastProps): ReactElement => (
    <AnimatePresence>
        {isOpen && (
            <motion.div
                className={CONTAINER_CLASSES}
                initial={{
                    opacity: 0,
                    y: getToastStartPosition(animationDirection),
                }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: getToastStartPosition(animationDirection) }}
                data-test-id="toast"
                aria-live="polite"
                role="alert"
            >
                <div className="tw-flex">
                    <div
                        className={merge([
                            'tw-flex tw-items-center tw-justify-center tw-min-h-[4.25rem] tw-min-w-[3rem] tw-rounded-l-lg tw-text-white',
                            toastStylesBackgroundColorsMap[style],
                        ])}
                    >
                        {icon}
                    </div>
                    {children}
                </div>
            </motion.div>
        )}
    </AnimatePresence>
);
Toast.displayName = 'FondueToast';
