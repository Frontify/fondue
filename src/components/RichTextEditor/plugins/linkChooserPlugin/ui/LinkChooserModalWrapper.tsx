import { EVENT_LINK_CHANGE_CONFIRMED } from "@components/RichTextEditor/Toolbar";
import React from "react";
import { ButtonStyle, LinkChooser, Modal } from "../../../../..";
import { ChosenLink } from "../types";

type LinkChooserModalWrapperProps = {
    isLinkChooserModalOpen: boolean;
    setLinkChooserModalIsOpen: (isOpen: boolean) => void;
    chosenLink: ChosenLink;
    setChosenLink: (chosenLink: ChosenLink) => void;
};

export const LinkChooserModalWrapper = ({
    isLinkChooserModalOpen,
    setLinkChooserModalIsOpen,
    chosenLink,
    setChosenLink,
}: LinkChooserModalWrapperProps) => {
    return (
        <Modal isOpen={isLinkChooserModalOpen} isDismissable>
            <LinkChooser
                openInNewTab={chosenLink?.openInNewTab || false}
                onOpenInNewTabChange={() => {
                    setChosenLink({
                        searchResult: chosenLink.searchResult,
                        openInNewTab: !chosenLink.openInNewTab,
                    });
                }}
                onLinkChange={(value) =>
                    setChosenLink({
                        searchResult: value,
                        openInNewTab: chosenLink.openInNewTab,
                    })
                }
                selectedResult={chosenLink.searchResult}
            />
            <Modal.Footer
                buttons={[
                    {
                        children: "Cancel",
                        onClick: () => setLinkChooserModalIsOpen(false),
                        style: ButtonStyle.Secondary,
                    },
                    {
                        children: "Choose",
                        onClick: () => {
                            document.dispatchEvent(
                                new CustomEvent(EVENT_LINK_CHANGE_CONFIRMED, { detail: { chosenLink } }),
                            );
                            setLinkChooserModalIsOpen(false);
                        },
                        style: ButtonStyle.Primary,
                    },
                ]}
            />
        </Modal>
    );
};
