/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { FC, useContext } from 'react';
import { ModalBodyProps } from './types';
import { ScrollWrapper } from '@components/ScrollWrapper/ScrollWrapper';
import { ModalLayout } from './context/ModalLayout';

export const ModalBody: FC<ModalBodyProps> = ({ direction, children, horizontalPadding = true }) => {
    const { padding } = useContext(ModalLayout);

    return (
        <div
            data-test-id="modal-body"
            className={`tw-flex-auto tw-min-h-0 ${horizontalPadding ? padding.horizontal : 'tw-pr-2'}`}
        >
            <ScrollWrapper direction={direction}>{children}</ScrollWrapper>
        </div>
    );
};
ModalBody.displayName = 'FondueModalBody';
