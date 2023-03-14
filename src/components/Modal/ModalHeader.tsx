/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { FC, cloneElement, useContext } from 'react';
import { merge } from '@utilities/merge';
import { ModalHeaderProps, ModalHeaderVariant, modalHeaderVariants } from './types';
import { IconSize } from '@foundation/Icon/IconSize';
import { ModalTitle } from './context/ModalTitle';
import { ModalLayout } from './context/ModalLayout';

export const ModalHeader: FC<ModalHeaderProps> = ({
    title,
    leadText,
    decorator,
    variant = ModalHeaderVariant.Default,
}) => {
    const ariaTitleProps = useContext(ModalTitle);
    const { padding, compact } = useContext(ModalLayout);

    return (
        <div data-test-id="modal-header" className={`${padding.top} ${padding.horizontal}`}>
            <div className="tw-flex tw-items-center">
                {decorator && (
                    <span
                        data-test-id="modal-header-decorator-container"
                        className={merge(['tw-mr-2', modalHeaderVariants[variant]])}
                    >
                        {cloneElement(decorator, { size: IconSize.Size24 })}
                    </span>
                )}
                <h3
                    {...ariaTitleProps}
                    className={merge([
                        'tw-font-heading tw-font-medium tw-text-text',
                        compact ? 'tw-text-lg' : 'tw-text-xl',
                    ])}
                >
                    {title}
                </h3>
            </div>
            {leadText && <p className="tw-text-text-weak tw-mt-4">{leadText}</p>}
        </div>
    );
};
ModalHeader.displayName = 'FondueModalHeader';
