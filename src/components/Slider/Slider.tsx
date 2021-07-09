/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconProps } from "@components/Icon/Icon";
import { Dispatch, ReactElement, SetStateAction } from "react";
import css from "./Slider.module.css";

export interface IconItem {
    id: string;
    icon: ReactElement<IconProps>;
}

export interface TextItem {
    id: string;
    name: string;
}

export interface SliderProps {
    items: TextItem[] | IconItem[];
    activeItemId: string;
    onChange: Dispatch<SetStateAction<string>>;
}

const isIconItem = (item: TextItem | IconItem): item is IconItem => (item as IconItem).icon !== undefined;

export default function Slider({ items, activeItemId, onChange }: SliderProps): ReactElement<SliderProps> {
    const getItemClasses = (id: string) => [css.item, id === activeItemId ? css.active : ""].join(" ");

    return (
        <ul data-test-id="Slider" className={css.wrapper}>
            {items.map((item) =>
                isIconItem(item) ? (
                    <li key={item.id} onClick={() => onChange(item.id)} className={getItemClasses(item.id)}>
                        {item.icon}
                    </li>
                ) : (
                    <li key={item.id} onClick={() => onChange(item.id)} className={getItemClasses(item.id)}>
                        {item.name}
                    </li>
                ),
            )}
        </ul>
    );
}
