/* (c) Copyright Frontify Ltd., all rights reserved. */

import { merge } from '@utilities/merge';
import { AnimatePresence, motion } from 'framer-motion';
import React, { ReactElement } from 'react';
import { ButtonGroup, ButtonSize, TooltipIcon } from '..';
import { ContextMenuProps, ContextMenuType, ContextMenuTypeIconMap } from './types';

export const ContextMenu = ({
    isOpen,
    contextMenuType,
    title,
    blockType,
    blockTypeIcon,
    tooltip,
    actionButtons,
}: ContextMenuProps): ReactElement => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="tw-fixed tw-bottom-5 tw-left-20 tw-bg-white tw-rounded-lg tw-border tw-border-black-10 tw-shadow-lg"
                    initial={{ y: '200%' }}
                    animate={{ y: 0 }}
                    exit={{ y: '200%' }}
                    data-test-id="context-menu"
                >
                    <div className="tw-flex ">
                        <div
                            className={merge([
                                'tw-rounded-l-lg tw-flex tw-items-center tw-justify-center tw-w-14 tw-text-white',
                                contextMenuType === ContextMenuType.Delete ? 'tw-bg-red-60' : 'tw-bg-violet-60',
                            ])}
                        >
                            {ContextMenuTypeIconMap[contextMenuType]}
                        </div>
                        <div
                            className={merge([
                                'tw-pl-5 tw-py-3 tw-text-md',
                                contextMenuType === ContextMenuType.Delete ? '' : 'tw-text-violet-60',
                            ])}
                        >
                            <div className="tw-border-r tw-border-black-20 tw-pr-4">
                                <div className="tw-flex">
                                    <div className="tw-font-bold">{title}</div>
                                    <div className="tw-pl-2 tw-pt-[2px]">
                                        <TooltipIcon
                                            tooltip={{
                                                content: tooltip,
                                            }}
                                        />
                                    </div>
                                </div>
                                <span className="tw-flex">
                                    <span className="tw-mt-1">{blockTypeIcon}</span>
                                    <span className="tw-ml-2">{blockType}</span>
                                </span>
                            </div>
                        </div>
                        <div className="tw-flex tw-items-center tw-p-4">
                            <ButtonGroup size={ButtonSize.Medium}>{actionButtons}</ButtonGroup>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
