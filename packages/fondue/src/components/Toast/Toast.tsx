/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AnimatePresence, motion } from 'motion/react';
import { type ReactElement } from 'react';

import { INSET_BORDER, MIGHTY_INSET_BORDER } from '@utilities/borderStyle';
import { merge } from '@utilities/merge';

import { ToastAnimationDirection, type ToastProps, type ToastTheme, toastStylesBackgroundColorsMap } from './types';

const CONTAINER_BASE_CLASSES = 'tw-min-h-[2rem] tw-rounded-lg tw-shadow-mid tw-z-[120000] before:!tw-rounded-lg';

const LIGHT_VARIANT_CLASSES = merge([INSET_BORDER, 'tw-bg-base']);
const DARK_VARIANT_CLASSES = merge([MIGHTY_INSET_BORDER, 'tw-bg-box-neutral-mighty']);

const getToastStartPosition = (animationDirection: ToastAnimationDirection) =>
    animationDirection === ToastAnimationDirection.BottomToTop ? '150%' : '-150%';

const getContainerClasses = (theme: ToastTheme) => {
    return merge([CONTAINER_BASE_CLASSES, theme === 'dark' ? DARK_VARIANT_CLASSES : LIGHT_VARIANT_CLASSES]);
};

export const Toast = ({
    isOpen,
    style,
    icon,
    animationDirection = ToastAnimationDirection.BottomToTop,
    children,
    theme = 'light',
    enableExitAnimation = false,
    'data-test-id': dataTestId = 'toast',
}: ToastProps): ReactElement => (
    <AnimatePresence>
        {isOpen && (
            <motion.div
                className={getContainerClasses(theme)}
                initial={{
                    opacity: 0,
                    y: getToastStartPosition(animationDirection),
                }}
                transition={{
                    opacity: {
                        ease: [0, 0, 1, 1],
                    },
                    y: {
                        ease: [0, 0.55, 0.45, 1],
                    },
                    delay: 0.3,
                    duration: 0.2,
                }}
                animate={{ opacity: 1, y: 0 }}
                {...(enableExitAnimation ? { exit: { opacity: 0, y: getToastStartPosition(animationDirection) } } : {})}
                data-test-id={dataTestId}
                aria-live="polite"
                role="alert"
            >
                <div className="tw-flex">
                    <div
                        className={merge([
                            'tw-flex tw-items-center tw-justify-center tw-min-h-[2rem] tw-min-w-[3rem] tw-rounded-l-lg tw-text-white',
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
