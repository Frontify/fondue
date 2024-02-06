/* (c) Copyright Frontify Ltd., all rights reserved. */

// import { useFloatingLinkUrlInput } from '@udecode/plate';
import { IconPen16, IconTrashBin16 } from '@foundation/Icon/Generated';
import { useRichTextEditorContext } from '@components/RichTextEditor/context';
import { LINK_PLUGIN } from '../../id';
import { useLinkOpenButtonState } from '@udecode/plate';
import { getUrlFromLinkOrLegacyLink } from '@components/RichTextEditor/Plugins/LinkPlugin/utils';

type EditModalProps = {
    editButtonProps: {
        onClick: () => void;
    };
    unlinkButtonProps: {
        onMouseDown: (e: React.MouseEvent<HTMLButtonElement>) => void;
        onClick: () => void;
    };
};

export const EditModal = ({ editButtonProps, unlinkButtonProps }: EditModalProps) => {
    const { element } = useLinkOpenButtonState();
    const { styles } = useRichTextEditorContext();
    const url = element ? getUrlFromLinkOrLegacyLink(element) : '';
    return (
        <div data-test-id="floating-link-edit" className="tw-bg-white tw-rounded tw-shadow tw-p-4 tw-min-w-[400px]">
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
        </div>
    );
};
