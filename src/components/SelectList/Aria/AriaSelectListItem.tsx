import { useOption } from "@react-aria/listbox";
import { ListState } from "@react-stately/list";
import React, { FC } from "react";
import { Checkbox } from "../../..";
import { SelectListItem } from "../SelectList";

type AriaSelectListItemProps = {
    item: SelectListItem;
    state: ListState<SelectListItem>;
};

export const AriaSelectListItem: FC<AriaSelectListItemProps> = ({ item, state }) => {
    let { optionProps, isSelected, isDisabled } = useOption({ key: item.key }, state, ref);
};
