/* (c) Copyright Frontify Ltd., all rights reserved. */

import { merge } from '@utilities/merge';
import { AnimatePresence, motion } from 'framer-motion';
import React, { ReactElement } from 'react';
import { ToastProps, toastStylesBackgroundColorsMap } from './types';

export const Toast = ({ isOpen, style, icon, children }: ToastProps): ReactElement => (
    <AnimatePresence>
        {isOpen && (
            <motion.div
                className="tw-min-h-[4.25rem] tw-rounded-lg tw-border tw-shadow-lg tw-bg-white tw-border-black-10"
                initial={{ opacity: 0, y: '150%' }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: '150%' }}
                data-test-id="toast"
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
