/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ReactElement } from "react";
import css from "./SidebarItemCheckbox.module.css";
import Checkbox, { CheckboxSelectionState } from "@components/Checkbox/Checkbox";

export interface SidebarItemCheckboxProps {
    label: string;
    value?: CheckboxSelectionState;
    onChange: (value: CheckboxSelectionState) => void;
}

export default function SidebarItemCheckbox({
    label,
    value = CheckboxSelectionState.Unselected,
    onChange,
}: SidebarItemCheckboxProps): ReactElement<SidebarItemCheckboxProps> {
    return (
        <div className={css.groupRow}>
            <Checkbox label={label} value={value} onChange={onChange} />
        </div>
    );
}
