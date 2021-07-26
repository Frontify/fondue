/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconProps } from "@elements/Icon/Icon";
import { merge } from "@utilities/merge";
import { ReactElement } from "react";

export type IconItem = {
    id: string;
    icon: ReactElement<IconProps>;
};

export type TextItem = {
    id: string;
    name: string;
};

export type SliderProps = {
    items: TextItem[] | IconItem[];
    activeItemId: string;
    onChange: (id: string) => void;
};

const isIconItem = (item: TextItem | IconItem): item is IconItem => (item as IconItem).icon !== undefined;

export default function Slider({ items, activeItemId, onChange }: SliderProps): ReactElement<SliderProps> {
    return (
        <ul
            data-test-id="slider"
            className="flex w-full justify-evenly p-0 border border-black-20 m-0 bg-black-0 rounded font-sans text-s list-none"
        >
            {items.map((item) => (
                <li
                    key={item.id}
                    onClick={() => onChange(item.id)}
                    className={merge([
                        "overflow-hidden flex-1 p-2 text-black-80 text-center overflow-ellipsis transition-colors whitespace-nowrap hover:text-black hover:cursor-pointer",
                        item.id === activeItemId &&
                            "box-border border border-black m-[-1px] bg-white rounded text-black",
                    ])}
                    data-test-id={`slider-item-${isIconItem(item) ? "icon" : "text"}`}
                >
                    {isIconItem(item) ? item.icon : item.name}
                </li>
            ))}
        </ul>
    );
}
