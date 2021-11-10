/* eslint-disable @typescript-eslint/no-use-before-define */
import { getKeyItemRecord, getMenuItems } from "@components/Menu/Aria/helper";
import { MenuItem } from "@components/MenuItem/MenuItem";
import IconArrowLeft from "@foundation/Icon/Generated/IconArrowLeft";
import { useListBox, useListBoxSection, useOption } from "@react-aria/listbox";
import { merge } from "@utilities/merge";
import { useActor } from "@xstate/react";
import React, { FC, useMemo, useRef } from "react";
import { IconLabel, ICON_OPTIONS } from "./LinkChooser";
import { DropdownState, LinkChooserState, SectionState } from "./state/machine";
import { SearchResultListProps, SearchResultSectionProps, SearchResultOptionProps, TemplateProps } from "./types";

export const SearchResultsList: FC<SearchResultListProps> = (props: SearchResultListProps) => {
    const ref = useRef<HTMLUListElement>(null);
    const { listBoxRef = ref, state, menuBlocks, noBorder, machineService } = props;
    const { listBoxProps } = useListBox(props, state, listBoxRef);
    const items = getMenuItems(menuBlocks);
    const keyItemRecord = getKeyItemRecord(items);

    const [machineState, send] = useActor(machineService);
    const { context, matches, value } = machineState;

    const isFetching = Object.values(DropdownState).some((state) =>
        matches(`${LinkChooserState.Focused}.${state}.${SectionState.Fetching}`),
    );

    const title = useMemo(() => {
        if (machineState.toStrings()[1]) {
            return machineState.toStrings()[1].split(".")[1];
        }
    }, [value]);

    const isUnsuccessful =
        matches(`${LinkChooserState.Focused}.${DropdownState.Default}.${SectionState.Error}`) ||
        matches(`${LinkChooserState.Focused}.${DropdownState.Templates}.${SectionState.Error}`);

    if (isFetching) return <span>Fetching results</span>;
    if (isUnsuccessful) return <span>Error</span>;

    return (
        <div>
            {!matches(`${LinkChooserState.Focused}.${DropdownState.Default}`) && (
                <div className="tw-flex tw-px-5 tw-mt-4 tw-mb-5">
                    <button onClick={() => send("GO_TO_DEFAULT")}>
                        <IconArrowLeft />
                    </button>
                    <p className="tw-ml-2 tw-text-black-80 tw-capitalize">{title}</p>
                </div>
            )}
            <ul
                {...listBoxProps}
                data-test-id="list-box"
                ref={listBoxRef}
                className={merge([
                    "tw-list-none tw-p-0 tw-m-0 tw-bg-white tw-z-20 focus-visible:tw-outline-none",
                    !noBorder && "tw-border tw-border-black-10 tw-rounded",
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
                ) : context.query ? (
                    <EmptyList query={context.query} />
                ) : (
                    <EmptyRecent />
                )}
            </ul>
        </div>
    );
};

const SearchResultSection = ({ heading, state, keyItemRecord, machineService }: SearchResultSectionProps) => {
    const { itemProps, groupProps } = useListBoxSection({
        heading: heading.rendered,
        "aria-label": heading["aria-label"],
    });

    return (
        <>
            <li {...itemProps} className="tw-border-b tw-border-b-black-10 last:tw-border-0">
                <ul {...groupProps} data-test-id="select-section" className="tw-py-2 tw-px-0 tw-m-0 tw-list-none">
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
        </>
    );
};

const SearchResultOption = ({ item, state, keyItemRecord, machineService }: SearchResultOptionProps) => {
    const ref = useRef<HTMLLIElement>(null);
    const { optionProps, isDisabled, isSelected } = useOption(
        {
            key: item.key,
        },
        state,
        ref,
    );
    const [{ matches }] = useActor(machineService);

    const menuItem = keyItemRecord[item.key];
    const decorator = menuItem.icon ? ICON_OPTIONS[menuItem.icon] : undefined;

    const renderOptionItem = () => {
        if (matches(`${LinkChooserState.Focused}.${DropdownState.Default}.${SectionState.Loaded}`))
            return <MenuItem {...menuItem} active={isSelected} decorator={decorator} />;
        else if (matches(`${LinkChooserState.Focused}.${DropdownState.Templates}.${SectionState.Loaded}`))
            return <TemplateItem {...menuItem} />;
        return <span>State not handled</span>;
    };

    return (
        <li
            {...optionProps}
            ref={ref}
            className={merge([
                "tw-relative hover:tw-bg-black-0 tw-list-none tw-outline-none",
                isDisabled && "tw-pointer-events-none tw-top-px",
            ])}
        >
            {renderOptionItem()}
        </li>
    );
};

const EmptyList = ({ query }: { query: string }) => {
    return <div>no result for {query}</div>;
};

const EmptyRecent = ({ title = "No recent queries found", label = IconLabel.Document, disabled = true }) => {
    return <MenuItem title={title} decorator={ICON_OPTIONS[label]} disabled={disabled} />;
};

const TemplateItem = ({ title, subtitle, preview }: TemplateProps) => {
    return (
        <div className="tw-flex tw-px-5 tw-py-1.5 tw-cursor-pointer">
            <div className="tw-flex tw-flex-shrink-0 tw-w-[75px] tw-h-[75px] tw-max-w-xs tw-bg-black-0 tw-border-black-10 tw-border tw-rounded">
                {preview && (
                    <img className="tw-w-full tw-object-contain" src={preview} alt="Man looking at item at a store" />
                )}
            </div>
            <div className="tw-flex tw-flex-col tw-justify-center tw-ml-4">
                <p className="tw-block tw-text-lg tw-leading-tight tw-hover:underline tw-text-black-80">{title}</p>
                {subtitle && <p className="tw-text-[12px] tw-text-black-80">{subtitle}</p>}
            </div>
        </div>
    );
};
