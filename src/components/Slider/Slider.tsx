/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconProps } from "@components/Icon/Icon";
import { ReactElement } from "react";
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
    onChange: (id: string) => void;
}

const isIconItem = (item: TextItem | IconItem): item is IconItem => (item as IconItem).icon !== undefined;
const getItemClasses = (id: string, activeItemId: string) =>
    [css.item, id === activeItemId ? css.active : ""].join(" ");

export default function Slider({ items, activeItemId, onChange }: SliderProps): ReactElement<SliderProps> {
    return (
        <ul data-test-id="slider" className={css.wrapper}>
            {items.map((item) =>
                isIconItem(item) ? (
                    <li
                        key={item.id}
                        onClick={() => onChange(item.id)}
                        className={getItemClasses(item.id, activeItemId)}
                    >
                        {item.icon}
                    </li>
                ) : (
                    <li
                        key={item.id}
                        onClick={() => onChange(item.id)}
                        className={getItemClasses(item.id, activeItemId)}
                    >
                        {item.name}
                    </li>
                ),
            )}
        </ul>
    );
}
