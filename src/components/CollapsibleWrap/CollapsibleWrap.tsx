/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AnimatePresence, motion } from "framer-motion";
import React, { FC } from "react";
import { CollapsibleWrapProps } from "./types";

export const CollapsibleWrap: FC<CollapsibleWrapProps> = ({
    children,
    isOpen = false,
    preventInitialAnimation = false,
}) => (
    <AnimatePresence initial={preventInitialAnimation ? false : undefined}>
        {isOpen && children && (
            <motion.div
                initial={"collapsed"}
                animate={"open"}
                exit={"collapsed"}
                variants={{
                    open: { height: "auto", overflow: "hidden" },
                    collapsed: { height: 0, overflow: "hidden" },
                }}
                transition={{ type: "tween" }}
                data-test-id="collapsible-wrap"
            >
                {children}
            </motion.div>
        )}
    </AnimatePresence>
);
