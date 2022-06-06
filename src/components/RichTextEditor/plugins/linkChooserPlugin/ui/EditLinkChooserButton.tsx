import { ToolbarButton, ToolbarButtonProps, someNode, useEventPlateId, usePlateEditorState } from '@udecode/plate';
import React, { MutableRefObject, useState } from 'react';
import { IconLink, IconSize } from '../../../../..';
import { ELEMENT_CHECK_ITEM } from '../../checkboxListPlugin/createCheckboxListPlugin';
import { getAndUpsertLink } from '../transforms/getAndUpsertLink';
import { ChosenLink } from '../types';
import { LinkChooserFlyout } from './LinkChooserFlyout';

export const EditLinkChooserButton = ({ id, styles, classNames }: Omit<ToolbarButtonProps, 'icon'>) => {
    id = useEventPlateId(id);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const editor = usePlateEditorState(id)!;

    const [isFlyoutOpen, setIsFlyoutOpen] = useState<boolean>(false);
    const [chosenLink, setChosenLink] = useState<ChosenLink>({
        searchResult: null,
        openInNewTab: false,
    });

    const getLinkFromLinkChooser = (prevChosenLink: ChosenLink): Promise<ChosenLink> => {
        setChosenLink(prevChosenLink);
        setTimeout(() => {
            setIsFlyoutOpen(true);
        }, 100);

        return new Promise<ChosenLink>((resolve) => {
            document.addEventListener('linkChangeConfirmed', (event: any) => {
                resolve(event.detail.chosenLink);
            });
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
                        icon={<IconLink size={IconSize.Size24} />}
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
