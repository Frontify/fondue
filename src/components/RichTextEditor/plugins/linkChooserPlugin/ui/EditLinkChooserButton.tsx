import { Checkbox, CheckboxState } from "@components/Checkbox";
import { Flyout } from "@components/Flyout";
import { FormControl } from "@components/FormControl";
import { TextInput } from "@components/TextInput";
import { ToolbarButtonProps, useEventPlateId, usePlateEditorState } from "@udecode/plate";
import React, { useState } from "react";
import { getAndUpsertLink } from "../transforms/getAndUpsertLink";
import { ChosenLink } from "../types";

const EVENT_LINK_CHANGE_CONFIRMED = "linkChangeConfirmed";

export const EditLinkChooserButton = ({ id, icon }: ToolbarButtonProps) => {
    id = useEventPlateId(id);
    const editor = usePlateEditorState(id)!;

    const [isFlyoutOpen, setIsFlyoutOpen] = useState<boolean>(false);
    const [chosenLink, setChosenLink] = useState<ChosenLink>({
        searchResult: null,
        openInNewTab: false,
    });

    const getLinkFromLinkChoser = (prevChosenLink: ChosenLink): Promise<ChosenLink> => {
        setChosenLink(prevChosenLink);
        setTimeout(() => {
            setIsFlyoutOpen(true);
        }, 100);

        return new Promise<ChosenLink>((resolve) => {
            document.addEventListener(EVENT_LINK_CHANGE_CONFIRMED, (event: any) => {
                resolve(event.detail.chosenLink);
            });
        });
    };

    const onConfirm = () => {
        document.dispatchEvent(new CustomEvent(EVENT_LINK_CHANGE_CONFIRMED, { detail: { chosenLink } }));
        setIsFlyoutOpen(false);
    };

    return (
        <div
            onMouseDown={async (event) => {
                if (!editor || isFlyoutOpen) {
                    return;
                }

                event.preventDefault();
                getAndUpsertLink(editor, getLinkFromLinkChoser);
            }}
        >
            {icon}
            <Flyout
                isOpen={isFlyoutOpen}
                onOpenChange={setIsFlyoutOpen}
                contentMinHeight={180}
                onCancel={() => setIsFlyoutOpen(false)}
                onConfirm={onConfirm}
                trigger={<span />}
            >
                <div
                    onKeyDown={(event) => {
                        if (event.key === "Enter") {
                            onConfirm();
                        }
                    }}
                    className="tw-flex tw-flex-col tw-gap-y-8 tw-p-8"
                    data-test-id={"link-chooser-flyout"}
                >
                    {/* Todo: Until we have moved the search logic, a 'simple link chooser' is rendered instead of the real link chooser */}
                    <FormControl
                        label={{
                            children: "URL",
                            htmlFor: "url",
                        }}
                    >
                        <TextInput
                            id={"url"}
                            placeholder="https://example.com"
                            value={chosenLink.searchResult?.link}
                            onChange={(value) => {
                                setChosenLink({
                                    searchResult: value
                                        ? {
                                              id: value,
                                              title: value,
                                              link: value,
                                              icon: "LINK",
                                          }
                                        : null,
                                    openInNewTab: chosenLink.openInNewTab,
                                });
                            }}
                        />
                    </FormControl>
                    <Checkbox
                        value="new-tab"
                        label="Open in New Tab"
                        state={chosenLink.openInNewTab ? CheckboxState.Checked : CheckboxState.Unchecked}
                        onChange={() => {
                            setChosenLink({
                                searchResult: chosenLink.searchResult,
                                openInNewTab: !chosenLink.openInNewTab,
                            });
                        }}
                    />
                </div>
            </Flyout>
        </div>
    );
};
