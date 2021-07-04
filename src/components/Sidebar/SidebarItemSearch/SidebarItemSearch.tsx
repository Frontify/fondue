/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ReactElement } from "react";
import TextInput from "@components/Form/TextInput/TextInput";
import { ReactComponent as IconSearch } from "@components/Icon/Svg/Search.svg";

export interface SidebarItemSearchProps {
    value?: string;
    onInput: (value: string) => void;
}

export default function SidebarItemSearch({
    value,
    onInput,
}: SidebarItemSearchProps): ReactElement<SidebarItemSearchProps> {
    return (
        <div data-test-id="sidebar-item-search">
            <TextInput decorator={<IconSearch />} onInput={onInput} value={value} />
        </div>
    );
}
