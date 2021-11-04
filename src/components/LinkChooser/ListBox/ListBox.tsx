/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useRef, RefObject, ReactNode } from "react";
import type { AriaListBoxOptions } from "@react-aria/listbox";
import type { ListState } from "@react-stately/list";
import type { Node } from "@react-types/shared";
import { useListBox, useListBoxSection, useOption } from "@react-aria/listbox";
import { FC } from "react";
import { merge } from "@utilities/merge";
import { getKeyItemRecord, getMenuItems } from "@components/Menu/Aria/helper";
import { MenuItem } from "@components/MenuItem/MenuItem";
import { MenuBlock, MenuItemType } from "@components/Menu/SelectMenu";
import { IconLabel, ICON_OPTIONS, OptionsType, TemplateMenuItemType } from "../LinkChooser";
import IconArrowLeft from "@foundation/Icon/Generated/IconArrowLeft";
import { OpenWindowType } from "../LinkChooser.stories";

interface ListBoxProps extends AriaListBoxOptions<unknown> {
    listBoxRef?: RefObject<HTMLUListElement>;
    state: ListState<unknown>;
    menuBlocks: MenuBlock[];
    noBorder?: boolean;
    hasItems?: boolean;
    optionsType?: OptionsType;
    openWindow: OpenWindowType;
    onClick: (window: OpenWindowType) => void;
}

interface SectionProps {
    section: Node<unknown>;
    state: ListState<unknown>;
    keyItemRecord: Record<string, MenuItemType>;
    openWindow: OpenWindowType;
}

interface OptionProps {
    item: Node<unknown>;
    state: ListState<unknown>;
    keyItemRecord: Record<string, MenuItemType | TemplateMenuItemType>;
    openWindow: OpenWindowType;
}

interface TemplateProps {
    title: ReactNode;
    subtitle?: string;
    preview?: string;
}

export const ListBox: FC<ListBoxProps> = (props: ListBoxProps) => {
    const ref = useRef<HTMLUListElement>(null);
    const { listBoxRef = ref, state, menuBlocks, noBorder, hasItems, optionsType, openWindow, onClick } = props;
    const { listBoxProps } = useListBox(props, state, listBoxRef);
    const items = getMenuItems(menuBlocks);
    const keyItemRecord = getKeyItemRecord(items);

    return (
        <div>
            {openWindow !== OpenWindowType.None && (
                <button className="tw-flex tw-px-5 tw-mt-4 tw-mb-5" onClick={() => onClick(OpenWindowType.None)}>
                    <IconArrowLeft />
                    <p className="tw-ml-2 tw-text-black-80">Templates</p>
                </button>
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
                {hasItems ? (
                    [...state.collection].map((item) => (
                        <ListBoxSection
                            key={item.key}
                            section={item}
                            state={state}
                            keyItemRecord={keyItemRecord}
                            openWindow={openWindow}
                        />
                    ))
                ) : optionsType === OptionsType.Server ? (
                    <EmptyList />
                ) : (
                    <EmptyRecent />
                )}
            </ul>
        </div>
    );
};

const ListBoxSection = ({ section, state, keyItemRecord, openWindow }: SectionProps) => {
    const { itemProps, groupProps } = useListBoxSection({
        heading: section.rendered,
        "aria-label": section["aria-label"],
    });

    return (
        <>
            <li {...itemProps} className="tw-border-b tw-border-b-black-10 last:tw-border-0">
                <ul {...groupProps} data-test-id="select-section" className="tw-py-2 tw-px-0 tw-m-0 tw-list-none">
                    {[...section.childNodes].map((node) => (
                        <Option
                            key={node.key}
                            item={node}
                            state={state}
                            keyItemRecord={keyItemRecord}
                            openWindow={openWindow}
                        />
                    ))}
                </ul>
            </li>
        </>
    );
};

const Option = ({ item, state, keyItemRecord, openWindow }: OptionProps) => {
    const ref = useRef<HTMLLIElement>(null);
    const { optionProps, isDisabled, isSelected } = useOption(
        {
            key: item.key,
        },
        state,
        ref,
    );

    const menuItem = keyItemRecord[item.key];
    const decorator = menuItem.iconLabel ? ICON_OPTIONS[menuItem.iconLabel] : undefined;

    return (
        <li
            {...optionProps}
            ref={ref}
            className={merge([
                "tw-relative hover:tw-bg-black-0 tw-list-none tw-outline-none",
                isDisabled && "tw-pointer-events-none tw-top-px",
            ])}
        >
            {openWindow === OpenWindowType.None ? (
                <MenuItem {...menuItem} active={isSelected} decorator={decorator} />
            ) : (
                <TemplateItem {...menuItem} />
            )}
        </li>
    );
};

const EmptyList = ({ title = "No search results matched your query", label = IconLabel.Reject, disabled = true }) => {
    return <MenuItem title={title} decorator={ICON_OPTIONS[label]} disabled={disabled} />;
};

const EmptyRecent = ({ title = "No recent queries found", label = IconLabel.Reject, disabled = true }) => {
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
