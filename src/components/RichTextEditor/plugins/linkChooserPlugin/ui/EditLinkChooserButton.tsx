import { ToolbarButtonProps, useEventPlateId, usePlateEditorState } from '@udecode/plate';
import React, { MutableRefObject, useState } from 'react';
import { getAndUpsertLink } from '../transforms/getAndUpsertLink';
import { ChosenLink } from '../types';
import { LinkChooserFlyout } from './LinkChooserFlyout';

export const EditLinkChooserButton = ({ id, icon }: ToolbarButtonProps) => {
    id = useEventPlateId(id);
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
                    onMouseDown={async (event) => {
                        if (!editor || isFlyoutOpen) {
                            return;
                        }

                        event.preventDefault();
                        getAndUpsertLink(editor, getLinkFromLinkChooser);
                    }}
                    data-chosen-link={JSON.stringify(chosenLink)}
                    className={'tw-text-violet-70 tw-underline tw-cursor-pointer'}
                >
                    {icon}
                </div>
            )}
        />
    );
};
