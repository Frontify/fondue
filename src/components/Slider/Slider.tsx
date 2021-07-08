/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconProps } from "@components/Icon/Icon";
import { Dispatch, ReactElement, SetStateAction } from "react";
import css from "./Slider.module.css";

export interface IconItem {
    icon: ReactElement<IconProps>;
    name: string;
}

export interface SliderProps {
    items: string[] | IconItem[];
    activeItem: string;
    onChange: Dispatch<SetStateAction<string>>;
}

const isIconItem = (item: string | IconItem): item is IconItem => (item as IconItem).icon !== undefined;

export default function Slider({ items, activeItem: active, onChange }: SliderProps): ReactElement<SliderProps> {
    return (
        <div data-test-id="Slider" className={css.wrapper}>
            {items.map((item, i) =>
                isIconItem(item) ? (
                    <div
                        key={i}
                        onClick={() => onChange(item.name)}
                        className={`${css.item} ${item.name === active ? css.active : ""}`}
                    >
                        {item.icon}
                    </div>
                ) : (
                    <div
                        key={i}
                        onClick={() => onChange(item)}
                        className={`${css.item} ${item === active ? css.active : ""}`}
                    >
                        {item}
                    </div>
                ),
            )}
        </div>
    );
}
