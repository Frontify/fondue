/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ReactComponent as IconSearch } from "@elements/Icon/Svg/Search.svg";
import TextInput from "@elements/TextInput/TextInput";
import { ReactElement } from "react";

export type SidebarItemSearchProps = {
    value?: string;
    onInput: (value: string) => void;
};

export default function SidebarItemSearch({
    value,
    onInput,
}: SidebarItemSearchProps): ReactElement<SidebarItemSearchProps> {
    return (
        <div data-test-id="sidebar-item-search">
            <TextInput decorator={<IconSearch />} onInput={onInput} defaultValue={value} />
        </div>
    );
}
