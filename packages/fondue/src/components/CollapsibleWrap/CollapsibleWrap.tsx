/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AnimatePresence, motion } from 'motion/react';
import { type ReactElement } from 'react';

import { type CollapsibleWrapProps } from './types';

export const CollapsibleWrap = ({
    children,
    isOpen = false,
    preventInitialAnimation = false,
    animateOpacity = true,
    'data-test-id': dataTestId = 'collapsible-wrap',
}: CollapsibleWrapProps): ReactElement => (
    <AnimatePresence initial={preventInitialAnimation ? false : undefined}>
        {isOpen && children ? (
            <motion.div
                initial={'collapsed'}
                animate={'open'}
                exit={'collapsed'}
                variants={{
                    open: {
                        height: 'auto',
                        overflow: 'hidden',
                        opacity: 1,
                        transitionEnd: {
                            overflow: 'visible',
                        },
                    },
                    collapsed: { height: 0, overflow: 'hidden', opacity: animateOpacity ? 0 : 1 },
                }}
                transition={{ type: 'tween' }}
                data-test-id={dataTestId}
            >
                {children}
            </motion.div>
        ) : null}
    </AnimatePresence>
);
CollapsibleWrap.displayName = 'FondueCollapsibleWrap';
