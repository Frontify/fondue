/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AnimatePresence, motion } from 'framer-motion';
import React, { ReactElement } from 'react';
import { CollapsibleWrapProps } from './types';

export const CollapsibleWrap = ({
    children,
    isOpen = false,
    preventInitialAnimation = false,
    animateOpacity = true,
    'data-test-id': dataTestId = 'collapsible-wrap',
}: CollapsibleWrapProps): ReactElement => (
    <AnimatePresence initial={preventInitialAnimation ? false : undefined}>
        {isOpen && children && (
            <motion.div
                initial={'collapsed'}
                animate={'open'}
                exit={'collapsed'}
                variants={{
                    open: { height: 'auto', overflow: 'hidden', opacity: 1 },
                    collapsed: { height: 0, overflow: 'hidden', opacity: animateOpacity ? 0 : 1 },
                }}
                transition={{ type: 'tween', duration: 0.25 }}
                data-test-id={dataTestId}
            >
                {children}
            </motion.div>
        )}
    </AnimatePresence>
);
CollapsibleWrap.displayName = 'FondueCollapsibleWrap';
