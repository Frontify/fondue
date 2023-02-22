/* (c) Copyright Frontify Ltd., all rights reserved. */

import { merge } from '@utilities/merge';
import { AnimatePresence, motion } from 'framer-motion';
import React, { ReactElement } from 'react';
import { ToastProps, toastStylesBackgroundColorsMap } from './types';

export const Toast = ({ isOpen, style, icon, children }: ToastProps): ReactElement => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="tw-fixed tw-bottom-0 tw-left-[60px] tw-min-h-[4.25rem] tw-m-5 tw-rounded-lg tw-border tw-shadow-lg tw-bg-white tw-border-black-10"
                    initial={{ y: '150%' }}
                    animate={{ y: 0 }}
                    exit={{ y: '150%' }}
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
};
