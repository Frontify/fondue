/* (c) Copyright Frontify Ltd., all rights reserved. */

import { cloneElement, useContext, type ReactElement } from 'react';

import { IconSize } from '@foundation/Icon/IconSize';
import { merge } from '@utilities/merge';

import { ModalLayoutContext } from './context/ModalLayout';
import { ModalTitleContext } from './context/ModalTitle';
import { ModalHeaderVariant, modalHeaderVariants, type ModalHeaderProps } from './types';

/**
 * @deprecated Use `Dialog.Header` from `@frontify/fondue/components` instead. Also check {@link https://github.com/Frontify/fondue/blob/main/packages/components/MIGRATING.md#dialog the migration guide}.
 */
export const ModalHeader = ({
    title,
    leadText,
    decorator,
    variant = ModalHeaderVariant.Default,
}: ModalHeaderProps): ReactElement => {
    const ariaTitleProps = useContext(ModalTitleContext);
    const { padding, compact } = useContext(ModalLayoutContext);

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
            {leadText ? <p className="tw-text-text-weak tw-mt-4">{leadText}</p> : null}
        </div>
    );
};
ModalHeader.displayName = 'FondueModalHeader';
