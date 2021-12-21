/* (c) Copyright Frontify Ltd., all rights reserved. */

/* eslint-disable @typescript-eslint/no-use-before-define */
import { getKeyItemRecord, getMenuItems } from "@components/Menu/Aria/helper";
import { MenuItem } from "@components/MenuItem";
import IconArrowLeft from "@foundation/Icon/Generated/IconArrowLeft";
import { useListBox, useListBoxSection, useOption } from "@react-aria/listbox";
import { merge } from "@utilities/merge";
import { useActor } from "@xstate/react";
import React, { FC, useMemo, useRef } from "react";
import BackgroundIcon from "./assets/background.svg";
import NoResultsIcon from "./assets/no-results.svg";
import FetchingIcon from "./assets/nook-animated.png";
import { DropdownState, LinkChooserState, SectionState } from "./state/machine";
import { SearchResultListProps, SearchResultOptionProps, SearchResultSectionProps, TemplateProps } from "./types";
import { isFetching, isUnsuccessful, shouldGoBack } from "./utils/state";

export const SearchResultsList: FC<SearchResultListProps> = (props: SearchResultListProps) => {
    const ref = useRef<HTMLUListElement | null>(null);
    const { listBoxRef = ref, state, menuBlocks, border = true, machineService } = props;
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

    console.log(context.searchResults);

    return (
        <div>
            {shouldGoBack(matches) && (
                <div className="tw-flex tw-px-5 tw-mt-4 tw-mb-5">
                    <button data-test-id="link-chooser-back-button" onClick={() => send("GO_TO_DEFAULT")}>
                        <IconArrowLeft />
                    </button>
                    <p className="tw-ml-2 tw-text-black-80 tw-capitalize">{title}</p>
                </div>
            )}
            <ul
                {...listBoxProps}
                data-test-id="link-chooser-results-list"
                ref={listBoxRef}
                className={merge([
                    "tw-list-none tw-p-0 tw-m-0 tw-bg-white tw-z-20 focus-visible:tw-outline-none",
                    border && "tw-border tw-border-black-10 tw-rounded",
                ])}
            >
                {context.searchResults.length ? (
                    [...state.collection].map((item) => (
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
    const ref = useRef<HTMLLIElement | null>(null);
    const { optionProps, isDisabled, isSelected } = useOption(
        {
            key: item.key,
        },
        state,
        ref,
    );
    const [{ matches }] = useActor(machineService);

    const menuItem = keyItemRecord[item.key];
    const isMenuItem = matches(`${LinkChooserState.Focused}.${DropdownState.Default}.${SectionState.Loaded}`);
    const isTemplateItem = matches(`${LinkChooserState.Focused}.${DropdownState.Templates}.${SectionState.Loaded}`);

    return (
        <li
            {...optionProps}
            ref={ref}
            className={merge([
                "tw-relative hover:tw-bg-black-0 tw-list-none tw-outline-none",
                isDisabled && "tw-pointer-events-none tw-top-px",
            ])}
        >
            {isMenuItem && <MenuItem {...menuItem} active={isSelected} />}
            {isTemplateItem && <TemplateItem {...menuItem} />}
        </li>
    );
};

type EmptyResultsProps = { prompt: string; icon: string };
const EmptyResults: FC<EmptyResultsProps> = ({ prompt, icon }) => (
    <div
        data-test-id="link-chooser-empty-results"
        className="tw-flex tw-flex-col tw-justify-center tw-items-center tw-h-[350px]"
    >
        <img className="tw-w-[75px] tw-mb-5" src={icon} alt="Icon" />
        <p className="tw-text-black-60">{prompt}</p>
    </div>
);

type FetchingErrorProps = { error?: string };
const FetchingError: FC<FetchingErrorProps> = ({ error = "An error occurred while fetching the results" }) => (
    <div
        data-test-id="link-chooser-error"
        className="tw-flex tw-flex-col tw-justify-center tw-items-center tw-h-[350px]"
    >
        <img className="tw-w-[75px] tw-mb-5" src={NoResultsIcon} alt="Error" />
        <p className="tw-text-black-60">{error}</p>
    </div>
);

const FetchingAnimation: FC = () => (
    <div
        data-test-id="link-chooser-loader"
        className="tw-flex tw-flex-col tw-justify-center tw-items-center tw-h-[350px]"
    >
        <img className="tw-w-[50px]" src={FetchingIcon} alt="Fetching" />
    </div>
);

const TemplateItem: FC<TemplateProps> = ({ title, subtitle, preview }) => (
    <div className="tw-flex tw-px-5 tw-py-1.5 tw-cursor-pointer">
        <div className="tw-flex tw-flex-shrink-0 tw-w-[75px] tw-h-[75px] tw-max-w-xs tw-bg-black-0 tw-border-black-10 tw-border tw-rounded">
            {preview && <img className="tw-w-full tw-object-contain" src={preview} alt={title as string} />}
        </div>
        <div className="tw-flex tw-flex-col tw-justify-center tw-ml-4">
            <p className="tw-block tw-text-lg tw-leading-tight tw-hover:underline tw-text-black-80">{title}</p>
            {subtitle && <p className="tw-text-[12px] tw-text-black-80">{subtitle}</p>}
        </div>
    </div>
);
