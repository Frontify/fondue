/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useFloatingLinkUrlInput } from '@udecode/plate';
import IconPen16 from '@foundation/Icon/Generated/IconPen16';
import IconTrashBin16 from '@foundation/Icon/Generated/IconTrashBin16';
import { FloatingLink } from '../FloatingLink';
import { useRichTextEditorContext } from '@components/RichTextEditor/context';
import { LINK_PLUGIN } from '../../id';

export const EditModal = () => {
    const urlHtmlProps = useFloatingLinkUrlInput({});
    const { styles } = useRichTextEditorContext();
    return (
        <div data-test-id="floating-link-edit" className="tw-bg-white tw-rounded tw-shadow tw-p-4 tw-min-w-[400px]">
            <span data-test-id={'preview-link-flyout'} className="tw-flex tw-justify-between">
                <span style={styles[LINK_PLUGIN]} className="tw-pointer-events-none">
                    {urlHtmlProps.defaultValue}
                </span>
                <span className="tw-flex tw-gap-2">
                    <span
                        role="button"
                        tabIndex={0}
                        data-test-id={'edit-link-button'}
                        className="tw-transition tw-cursor-pointer tw-rounded hover:tw-bg-black-10 tw-p-1"
                    >
                        <FloatingLink.EditButton>
                            <IconPen16 />
                        </FloatingLink.EditButton>
                    </span>

                    <span
                        role="button"
                        tabIndex={0}
                        data-test-id={'remove-link-button'}
                        className="tw-transition tw-cursor-pointer tw-rounded hover:tw-bg-black-10 tw-p-1"
                    >
                        <FloatingLink.UnlinkButton>
                            <IconTrashBin16 />
                        </FloatingLink.UnlinkButton>
                    </span>
                </span>
            </span>
        </div>
    );
};
