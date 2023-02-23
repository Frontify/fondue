/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AnimatePresence, motion } from 'framer-motion';
import React, { FC } from 'react';
import { CollapsibleWrapProps } from './types';

export const CollapsibleWrap: FC<CollapsibleWrapProps> = ({
    children,
    isOpen = false,
    preventInitialAnimation = false,
    animateOpacity = true,
}) => (
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
                transition={{ type: 'tween' }}
                data-test-id="collapsible-wrap"
            >
                {children}
            </motion.div>
        )}
    </AnimatePresence>
);
CollapsibleWrap.displayName = 'FondueCollapsibleWrap';
