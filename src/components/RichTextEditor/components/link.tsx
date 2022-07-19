/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PlateRenderElementProps, unwrapNodes, useEditableProps } from '@udecode/plate';
import React, { FC, MutableRefObject, useState } from 'react';
import { LINK_CHANGE_CANCELED, LINK_CHANGE_CONFIRMED } from '../plugins/linkChooserPlugin/events';
import { getAndUpsertLink } from '../plugins/linkChooserPlugin/transforms/getAndUpsertLink';
import { ChosenLink } from '../plugins/linkChooserPlugin/types';
import { LinkChooserFlyout } from '../plugins/linkChooserPlugin/ui/LinkChooserFlyout';
import { LinkChooserPreviewFlyout } from '../plugins/linkChooserPlugin/ui/LinkChooserPreviewFlyout';

export const LINK_CHOOSER_CLASS_NAMES = 'tw-text-text-interactive tw-underline tw-cursor-pointer';

export const LinkElement: FC<PlateRenderElementProps> = (props) => {
    const { children, element, editor } = props;

    // Because an old version was already used in clarify, it must be ensured that the element can also handle the old structure.
    const {
        chosenLink = {
            searchResult: {
                link: element.url,
            },
            openInNewTab: false,
        },
    } = element;

    const [isLinkChooserPreviewFlyoutOpen, setIsLinkChooserPreviewFlyoutOpen] = useState<boolean>(false);
    const [isLinkChooserFlyoutOpen, setIsLinkChooserFlyoutOpen] = useState<boolean>(false);
    const [prevChosenLink, setPrevChosenLink] = useState<ChosenLink>(chosenLink);

    const isReadOnly = useEditableProps(editor).readOnly;

    const getHref = () => {
        if (!chosenLink || !chosenLink.searchResult) {
            return '';
        }
        return chosenLink.searchResult.link;
    };

    const getTarget = () => {
        const TARGET_DEFAULT = '_self';
        const TARGET_BLANK = '_blank';
        if (!chosenLink || !chosenLink.openInNewTab) {
            return TARGET_DEFAULT;
        }
        return TARGET_BLANK;
    };

    const getLinkFromLinkChooser = (prevLink: ChosenLink): Promise<ChosenLink | void> => {
        setPrevChosenLink(prevLink);
        setIsLinkChooserFlyoutOpen(true);

        return new Promise<ChosenLink | void>((resolve) => {
            document.addEventListener(LINK_CHANGE_CONFIRMED, (event: any) => {
                resolve(event.detail.chosenLink);
            });
            document.addEventListener(LINK_CHANGE_CANCELED, () => resolve());
        });
    };

    const onEdit = () => {
        setIsLinkChooserPreviewFlyoutOpen(false);
        if (!editor) {
            return;
        }
        getAndUpsertLink(editor, getLinkFromLinkChooser);
    };

    const onRemove = () => {
        if (!editor.selection) {
            return;
        }
        unwrapNodes(editor, {
            at: editor.selection,
            match: { type: ['a'] },
        });
    };

    return (
        <>
            {isReadOnly ? (
                <a
                    data-chosen-link={JSON.stringify(chosenLink)}
                    href={getHref()}
                    target={getTarget()}
                    rel="noreferrer"
                    className={LINK_CHOOSER_CLASS_NAMES}
                >
                    {children}
                </a>
            ) : (
                <>
                    <a
                        onClick={() => setIsLinkChooserPreviewFlyoutOpen(true)}
                        data-chosen-link={JSON.stringify(chosenLink)}
                        href={getHref()}
                        target={getTarget()}
                        rel="noreferrer"
                        className={LINK_CHOOSER_CLASS_NAMES}
                    >
                        {children}
                    </a>
                    <LinkChooserPreviewFlyout
                        isFlyoutOpen={isLinkChooserPreviewFlyoutOpen}
                        setIsFlyoutOpen={setIsLinkChooserPreviewFlyoutOpen}
                        trigger={({ 'aria-label': ariaLabel }, ref: MutableRefObject<HTMLDivElement>) => (
                            <span ref={ref} aria-label={ariaLabel}></span>
                        )}
                        href={getHref()}
                        onEditClick={onEdit}
                        onRemoveClick={onRemove}
                    />
                    <LinkChooserFlyout
                        isFlyoutOpen={isLinkChooserFlyoutOpen}
                        setIsFlyoutOpen={setIsLinkChooserFlyoutOpen}
                        chosenLink={prevChosenLink}
                        setChosenLink={setPrevChosenLink}
                        trigger={({ 'aria-label': ariaLabel }, ref: MutableRefObject<HTMLDivElement>) => (
                            <span ref={ref} aria-label={ariaLabel}></span>
                        )}
                    />
                </>
            )}
        </>
    );
};
