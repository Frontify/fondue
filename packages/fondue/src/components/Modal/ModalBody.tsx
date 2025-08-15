/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useContext, type ReactElement } from 'react';

import { ScrollWrapper } from '@components/ScrollWrapper/ScrollWrapper';

import { ModalLayoutContext } from './context/ModalLayout';
import { type ModalBodyProps } from './types';

/**
 * @deprecated Use `Dialog.Body` from `@frontify/fondue/components` instead. Also check {@link https://github.com/Frontify/fondue/blob/main/packages/components/MIGRATING.md#dialog the migration guide}.
 */
export const ModalBody = ({ direction, children, horizontalPadding = true }: ModalBodyProps): ReactElement => {
    const { padding } = useContext(ModalLayoutContext);

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
