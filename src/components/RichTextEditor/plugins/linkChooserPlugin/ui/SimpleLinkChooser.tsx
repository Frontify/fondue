import React from "react";
import { Checkbox, CheckboxState } from "../../../../..";
import { ChosenLink } from "../types";

type SimpleLinkChooserProps = {
    chosenLink: ChosenLink;
    setChosenLink: (chosenLink: ChosenLink) => void;
};

export const SimpleLinkChooser = ({ chosenLink, setChosenLink }: SimpleLinkChooserProps) => {
    return (
        <>
            <input
                className="tw-h-9 tw-px-2.5 tw-border tw-rounded"
                value={chosenLink.searchResult?.link}
                placeholder="https://www.google.com"
                onInput={(event) => {
                    setChosenLink({
                        searchResult: event.currentTarget.value
                            ? {
                                  id: event.currentTarget.value,
                                  title: event.currentTarget.value,
                                  link: event.currentTarget.value,
                                  icon: "LINK",
                              }
                            : null,
                        openInNewTab: chosenLink.openInNewTab,
                    });
                }}
            />
            <div className="tw-my-2">
                <Checkbox
                    value="new-tab"
                    label="Open in New Tab"
                    state={chosenLink?.openInNewTab || false ? CheckboxState.Checked : CheckboxState.Unchecked}
                    onChange={() => {
                        setChosenLink({
                            searchResult: chosenLink.searchResult,
                            openInNewTab: !chosenLink.openInNewTab,
                        });
                    }}
                />
            </div>
        </>
    );
};
