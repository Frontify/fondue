/* (c) Copyright Frontify Ltd., all rights reserved. */

import { CheckboxSelectionState } from "@elements/Checkbox/Checkbox";
import { ReactElement } from "react";
import css from "./Sidebar.module.css";
import SidebarItemCheckbox from "./SidebarItemCheckbox/SidebarItemCheckbox";
import SidebarItemDefault from "./SidebarItemDefault/SidebarItemDefault";
import SidebarItemLink from "./SidebarItemLink/SidebarItemLink";
import SidebarItemSearch from "./SidebarItemSearch/SidebarItemSearch";

export enum SidebarItemType {
    Default,
    Checkbox,
    Link,
    Search,
}

export interface DefaultSidebarItem {
    id: string;
    group?: string;
}

export interface SidebarItemForDefault extends DefaultSidebarItem {
    label: string;
    type: SidebarItemType.Default;
    onClick: () => void;
    selected?: boolean;
}

export interface SidebarItemForCheckbox extends DefaultSidebarItem {
    label: string;
    type: SidebarItemType.Checkbox;
    value?: CheckboxSelectionState;
    onChange: (value: CheckboxSelectionState) => void;
}

export interface SidebarItemForLink extends DefaultSidebarItem {
    label: string;
    type: SidebarItemType.Link;
    link: string;
}

export interface SidebarItemForSearch extends DefaultSidebarItem {
    type: SidebarItemType.Search;
    value?: string;
    onInput: (value: string) => void;
}

export type SidebarItem = SidebarItemForDefault | SidebarItemForCheckbox | SidebarItemForLink | SidebarItemForSearch;

export interface SidebarProps {
    items: readonly SidebarItem[];
}

export default function Sidebar({ items }: SidebarProps): ReactElement<SidebarProps> {
    const itemsGrouped = items.reduce(function (itemsGroupedStack: Record<string, SidebarItem[]>, value) {
        const groupKey = value.group || "";

        if (itemsGroupedStack[groupKey] === undefined) {
            itemsGroupedStack[groupKey] = [];
        }

        itemsGroupedStack[groupKey].push(value);

        return itemsGroupedStack;
    }, {});

    return (
        <div className={css.sidebar}>
            {Object.keys(itemsGrouped).map((groupName) => (
                <div key={groupName} className={css.group}>
                    {groupName !== "" && (
                        <span className={css.groupName} data-test="sidebar-group">
                            {groupName}
                        </span>
                    )}
                    {itemsGrouped[groupName].map((item) => {
                        switch (item.type) {
                            case SidebarItemType.Link:
                                return (
                                    <SidebarItemLink
                                        key={`${item.group}-${item.id}`}
                                        label={item.label}
                                        link={item.link || "#"}
                                    />
                                );
                            case SidebarItemType.Checkbox:
                                return (
                                    <SidebarItemCheckbox
                                        key={`${item.group}-${item.id}`}
                                        label={item.label}
                                        value={item.value}
                                        onChange={item.onChange}
                                    />
                                );
                            case SidebarItemType.Search:
                                return (
                                    <SidebarItemSearch
                                        key={`${item.group}-${item.id}`}
                                        value={item.value}
                                        onInput={item.onInput}
                                    />
                                );
                            case SidebarItemType.Default:
                            default:
                                return (
                                    <SidebarItemDefault
                                        key={`${item.group}-${item.id}`}
                                        label={item.label}
                                        selected={item.selected}
                                        onClick={item.onClick}
                                    />
                                );
                        }
                    })}
                </div>
            ))}
        </div>
    );
}
