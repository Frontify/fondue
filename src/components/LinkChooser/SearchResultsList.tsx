/* (c) Copyright Frontify Ltd., all rights reserved. */

import { getKeyItemRecord, getMenuItems } from "@components/ActionMenu/Aria/helper";
import { MenuItem } from "@components/MenuItem/MenuItem";
import { useListBox, useListBoxSection, useOption } from "@react-aria/listbox";
import { merge } from "@utilities/merge";
import { useActor } from "@xstate/react";
import React, { FC, useMemo, useRef } from "react";
import { IconOptions } from "./LinkChooser";
import { DropdownState, LinkChooserState, SectionState } from "./state/machine";
import { SearchResultListProps, SearchResultSectionProps, SearchResultOptionProps, ImageMenuItemProps } from "./types";
import NoResultsIcon from "./assets/no-results.svg";
import BackgroundIcon from "./assets/background.svg";
import FetchingIcon from "./assets/nook-animated.png";
import { isFetching, isUnsuccessful, shouldGoBack } from "./utils/state";
import { getInteractionModality } from "@react-aria/interactions";
import { defaultSection } from "./sections";
import { goToSection } from "./utils/helpers";
import { NavigationMenuItem } from "./NavigationMenu";
import { MenuItemContentSize } from "@components/MenuItem";

export const SearchResultsList: FC<SearchResultListProps> = (props) => {
    const ref = useRef<HTMLUListElement>(null);
    const { listBoxRef = ref, state, menuBlocks, machineService } = props;
    const { listBoxProps } = useListBox(props, state, listBoxRef);
    const items = getMenuItems(menuBlocks);
    const keyItemRecord = getKeyItemRecord(items);

    const [machineState, send] = useActor(machineService);
    const { context, matches, value } = machineState;

    const title = useMemo(() => {
        if (machineState.toStrings()[1]) {
            return machineState.toStrings()[1].split(".")[1];
        }
    }, [value]);

    if (isFetching(matches)) {
        return <FetchingAnimation />;
    }

    if (isUnsuccessful(matches)) {
        return <FetchingError />;
    }

    return (
        <div>
            {shouldGoBack(matches) && (
                <div className="tw-mt-2">
                    <NavigationMenuItem
                        state={state}
                        section={defaultSection}
                        title={<p className="tw-ml-1 tw-text-black-80 tw-capitalize">{title}</p>}
                        onPress={() => goToSection(defaultSection.id, send)}
                        direction="left"
                    />
                </div>
            )}
            <ul
                {...listBoxProps}
                data-test-id="link-chooser-results-list"
                ref={listBoxRef}
                className="tw-list-none tw-p-0 tw-m-0 tw-bg-white tw-z-20 focus-visible:tw-outline-none"
            >
                {context.searchResults.length ? (
                    [...state.collection]
                        .filter((section) => section.key === "search")
                        .map((item) => (
                            <SearchResultSection
                                key={item.key}
                                heading={item}
                                state={state}
                                keyItemRecord={keyItemRecord}
                                machineService={machineService}
                            />
                        ))
                ) : (
                    <EmptyResults
                        prompt={
                            context.query
                                ? `We could not find any results for "${context.query}".`
                                : "Use the search above to discover your brand assets"
                        }
                        icon={context.query ? NoResultsIcon : BackgroundIcon}
                    />
                )}
            </ul>
        </div>
    );
};

const SearchResultSection: FC<SearchResultSectionProps> = ({ heading, state, keyItemRecord, machineService }) => {
    const { itemProps, groupProps } = useListBoxSection({
        heading: heading.rendered,
        "aria-label": heading["aria-label"],
    });

    return (
        <li {...itemProps} className="tw-border-b tw-border-b-black-10 last:tw-border-0">
            <ul
                {...groupProps}
                data-test-id="link-chooser-select-section"
                className="tw-py-2 tw-px-0 tw-m-0 tw-list-none"
            >
                {[...heading.childNodes].map((node) => (
                    <SearchResultOption
                        key={node.key}
                        item={node}
                        state={state}
                        keyItemRecord={keyItemRecord}
                        machineService={machineService}
                    />
                ))}
            </ul>
        </li>
    );
};

const SearchResultOption: FC<SearchResultOptionProps> = ({ item, state, keyItemRecord, machineService }) => {
    const ref = useRef<HTMLLIElement>(null);
    const { optionProps, isDisabled, isSelected, isFocused } = useOption(
        {
            key: item.key,
            shouldFocusOnHover: false,
        },
        state,
        ref,
    );
    const [{ matches }] = useActor(machineService);

    const menuItem = keyItemRecord[item.key];
    const decorator = menuItem.icon ? IconOptions[menuItem.icon] : undefined;

    const renderOptionItem = () => {
        if (matches(`${LinkChooserState.Focused}.${DropdownState.Default}.${SectionState.Loaded}`)) {
            return (
                <MenuItem {...menuItem} active={isSelected} decorator={decorator} size={MenuItemContentSize.Large} />
            );
        } else if (
            matches(`${LinkChooserState.Focused}.${DropdownState.Templates}.${SectionState.Loaded}`) ||
            matches(`${LinkChooserState.Focused}.${DropdownState.Guidelines}.${SectionState.Loaded}`)
        ) {
            return <ImageMenuItem {...menuItem} />;
        }
    };

    const isFocusVisible = getInteractionModality() !== "pointer";

    return (
        <li
            {...optionProps}
            ref={ref}
            className={merge([
                "tw-relative hover:tw-bg-black-0 tw-list-none tw-outline-none",
                isDisabled && "tw-pointer-events-none tw-top-px",
                isFocused && isFocusVisible && "tw-bg-black-0",
            ])}
        >
            {renderOptionItem()}
        </li>
    );
};

const EmptyResults: FC<{ prompt: string; icon: string }> = ({ prompt, icon }) => (
    <div
        data-test-id="link-chooser-empty-results"
        className="tw-flex tw-flex-col tw-justify-center tw-items-center tw-h-[220px] tw-p-3"
    >
        <img className="tw-w-[75px] tw-mb-5" src={icon} alt="Icon" />
        <p className="tw-text-black-60 tw-text-center">{prompt}</p>
    </div>
);

const FetchingError: FC<{ error?: string }> = ({ error = "An error occurred while fetching the results" }) => (
    <div
        data-test-id="link-chooser-error"
        className="tw-flex tw-flex-col tw-justify-center tw-items-center tw-h-[220px] tw-p-3"
    >
        <img className="tw-w-[75px] tw-mb-5" src={NoResultsIcon} alt="Error" />
        <p className="tw-text-black-60 tw-text-center">{error}</p>
    </div>
);

const FetchingAnimation: FC = () => (
    <div
        data-test-id="link-chooser-loader"
        className="tw-flex tw-flex-col tw-justify-center tw-items-center tw-h-[220px] tw-p-3"
    >
        <img className="tw-w-[50px]" src={FetchingIcon} alt="Fetching" />
    </div>
);

const ImageMenuItem: FC<ImageMenuItemProps> = ({ title, subtitle, preview }) => (
    <div className="tw-flex tw-px-5 tw-py-1.5 tw-cursor-pointer">
        <div className="tw-flex tw-shrink-0 tw-w-[75px] tw-h-[75px] tw-max-w-xs tw-bg-black-0 tw-rounded">
            {preview && <img className="tw-w-full tw-object-contain" src={preview} alt={title as string} />}
        </div>
        <div className="tw-flex tw-flex-col tw-justify-center tw-ml-4">
            <p className="tw-block tw-text-md tw-leading-tight tw-hover:underline tw-text-black-80">{title}</p>
            {subtitle && <p className="tw-text-[12px] tw-text-black-80">{subtitle}</p>}
        </div>
    </div>
);
