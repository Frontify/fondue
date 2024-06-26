/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useContext, type ReactElement } from 'react';

import { Button, ButtonSize } from '@components/Button';

import { ModalLayout } from './context/ModalLayout';
import { type ModalFooterProps } from './types';

/**
 * @deprecated Use `Dialog.Footer` from `@frontify/fondue/components` instead. Also check {@link https://github.com/Frontify/fondue/blob/main/packages/components/MIGRATING.md#dialog the migration guide}.
 */
export const ModalFooter = ({ buttons }: ModalFooterProps): ReactElement => {
    const { padding } = useContext(ModalLayout);

    return (
        <div data-test-id="modal-footer" className={`${padding.bottom} ${padding.horizontal}`}>
            {buttons && (
                <div className="tw-flex tw-gap-x-3 tw-justify-end">
                    {buttons.map((button, index) => (
                        <Button {...button} size={ButtonSize.Medium} key={index} />
                    ))}
                </div>
            )}
        </div>
    );
};
ModalFooter.displayName = 'FondueModalFooter';
