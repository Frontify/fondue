/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useLinkOpenButtonState } from '@udecode/plate-link';
import { type MouseEvent } from 'react';

import { getUrlFromLinkOrLegacyLink } from '@components/RichTextEditor/Plugins/LinkPlugin/utils';
import { FloatingModalWrapper } from '@components/RichTextEditor/components';
import { useRichTextEditorContext } from '@components/RichTextEditor/context';
import IconPen16 from '@foundation/Icon/Generated/IconPen16';
import IconTrashBin16 from '@foundation/Icon/Generated/IconTrashBin16';

import { LINK_PLUGIN } from '../../id';

type EditModalProps = {
    editButtonProps: {
        onClick: () => void;
    };
    unlinkButtonProps: {
        onMouseDown: (e: MouseEvent<HTMLButtonElement>) => void;
        onClick: () => void;
    };
};

export const EditModal = ({ editButtonProps, unlinkButtonProps }: EditModalProps) => {
    const { element } = useLinkOpenButtonState();
    const { styles } = useRichTextEditorContext();
    const url = element ? getUrlFromLinkOrLegacyLink(element) : '';

    return (
        <FloatingModalWrapper data-test-id="floating-link-edit" padding="16px" minWidth="400px">
            <span data-test-id={'preview-link-flyout'} className="tw-flex tw-justify-between">
                <span style={styles[LINK_PLUGIN]} className="tw-pointer-events-none">
                    {url}
                </span>
                <span className="tw-flex tw-gap-2">
                    <button
                        tabIndex={0}
                        data-test-id={'edit-link-button'}
                        className="tw-transition tw-cursor-pointer tw-rounded hover:tw-bg-black-10 tw-p-1"
                        {...editButtonProps}
                    >
                        <IconPen16 />
                    </button>

                    <button
                        tabIndex={0}
                        data-test-id={'remove-link-button'}
                        className="tw-transition tw-cursor-pointer tw-rounded hover:tw-bg-black-10 tw-p-1"
                        {...unlinkButtonProps}
                    >
                        <IconTrashBin16 />
                    </button>
                </span>
            </span>
        </FloatingModalWrapper>
    );
};
