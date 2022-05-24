/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PlateRenderElementProps, unwrapNodes, useEditableProps } from "@udecode/plate";
import React, { FC, MutableRefObject, useState } from "react";
import { getAndUpsertLink } from "../plugins/linkChooserPlugin/transforms/getAndUpsertLink";
import { ChosenLink } from "../plugins/linkChooserPlugin/types";
import { LinkChooserFlyout } from "../plugins/linkChooserPlugin/ui/LinkChooserFlyout";
import { LinkChooserPreviewFlyout } from "../plugins/linkChooserPlugin/ui/LinkChooserPreviewFlyout";

export const ChosenLinkElement: FC<PlateRenderElementProps> = (props) => {
    const { children, element, editor } = props;

    const { chosenLink } = element;

    const [isLinkChooserPreviewFlyoutOpen, setIsLinkChooserPreviewFlyoutOpen] = useState<boolean>(false);
    const [isLinkChooserFlyoutOpen, setIsLinkChooserFlyoutOpen] = useState<boolean>(false);
    const [prevChosenLink, setPrevChosenLink] = useState<ChosenLink>(chosenLink);

    const isReadOnly = useEditableProps(editor).readOnly;

    const getHref = () => {
        return chosenLink ? (chosenLink.searchResult ? element.chosenLink.searchResult.link : "") : "";
    };

    const getTarget = () => {
        const TARGET_DEFAULT = "_self";
        const TARGET_BLANK = "_blank";
        return chosenLink ? (chosenLink.openInNewTab ? TARGET_BLANK : TARGET_DEFAULT) : TARGET_DEFAULT;
    };

    const getLinkFromLinkChooser = (prevChosenLink: ChosenLink): Promise<ChosenLink> => {
        setPrevChosenLink(prevChosenLink);
        setTimeout(() => {
            setIsLinkChooserFlyoutOpen(true);
        }, 100);

        return new Promise<ChosenLink>((resolve) => {
            document.addEventListener("linkChangeConfirmed", (event: any) => {
                resolve(event.detail.chosenLink);
            });
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
            match: { type: "link_chooser" },
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
                    className={"tw-text-violet-70 tw-underline tw-cursor-pointer"}
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
                        className={"tw-text-violet-70 tw-underline tw-cursor-pointer"}
                    >
                        {children}
                    </a>
                    <LinkChooserPreviewFlyout
                        isFlyoutOpen={isLinkChooserPreviewFlyoutOpen}
                        setIsFlyoutOpen={setIsLinkChooserPreviewFlyoutOpen}
                        trigger={({ "aria-label": ariaLabel }, ref: MutableRefObject<HTMLDivElement>) => (
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
                        trigger={({ "aria-label": ariaLabel }, ref: MutableRefObject<HTMLDivElement>) => (
                            <span ref={ref} aria-label={ariaLabel}></span>
                        )}
                    />
                </>
            )}
        </>
    );
};
