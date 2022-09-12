import { ToolbarButton, ToolbarButtonProps, someNode, useEventPlateId, usePlateEditorState } from '@udecode/plate';
import React, { MutableRefObject, useState } from 'react';
import { IconLink, IconSize } from '../../../../..';
import { LINK_CHANGE_CANCELED, LINK_CHANGE_CONFIRMED } from '../events';
import { getAndUpsertLink } from '../transforms/getAndUpsertLink';
import { ChosenLink } from '../types';
import { LinkChooserFlyout } from './LinkChooserFlyout';
import { ELEMENT_CHECK_ITEM } from '../../../EditorActions/Plugins/CheckboxListPlugin/id';

export const EditLinkChooserButton = ({ id, styles, classNames }: Omit<ToolbarButtonProps, 'icon'>) => {
    id = useEventPlateId(id);
    const editor = usePlateEditorState(id)!;

    const [isFlyoutOpen, setIsFlyoutOpen] = useState<boolean>(false);
    const [chosenLink, setChosenLink] = useState<ChosenLink>({
        searchResult: null,
        openInNewTab: false,
    });

    const getLinkFromLinkChooser = (prevChosenLink: ChosenLink): Promise<ChosenLink | void> => {
        setChosenLink(prevChosenLink);
        setIsFlyoutOpen(true);

        return new Promise<ChosenLink | void>((resolve) => {
            document.addEventListener(LINK_CHANGE_CONFIRMED, (event: any) => {
                resolve(event.detail.chosenLink);
            });
            document.addEventListener(LINK_CHANGE_CANCELED, () => resolve());
        });
    };

    return (
        <LinkChooserFlyout
            isFlyoutOpen={isFlyoutOpen}
            setIsFlyoutOpen={setIsFlyoutOpen}
            chosenLink={chosenLink}
            setChosenLink={setChosenLink}
            trigger={({ 'aria-label': ariaLabel }, ref: MutableRefObject<HTMLDivElement>) => (
                <div
                    ref={ref}
                    aria-label={ariaLabel}
                    data-chosen-link={JSON.stringify(chosenLink)}
                    className="tw-cursor-pointer"
                >
                    <ToolbarButton
                        classNames={classNames}
                        styles={styles}
                        active={!!editor?.selection && someNode(editor, { match: { ELEMENT_CHECK_ITEM } })}
                        icon={<IconLink size={IconSize.Size16} />}
                        onMouseDown={async (event) => {
                            event.stopPropagation();
                            event.preventDefault();

                            getAndUpsertLink(editor, getLinkFromLinkChooser);
                        }}
                    />
                </div>
            )}
        />
    );
};
