/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconProps } from "@elements/Icon/Icon";
import { merge } from "@utilities/merge";
import { ReactElement } from "react";
import { AnimateSharedLayout, motion } from "framer-motion";

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
    /*eslint-disable jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions,jsx-a11y/role-supports-aria-props */
    return (
        <AnimateSharedLayout>
            <ul
                data-test-id="slider"
                className="w-full grid grid-flow-col auto-cols-fr justify-evenly p-0 border border-black-20 m-0 bg-black-0 rounded font-sans text-s list-none"
            >
                {items.map((item) => {
                    const isActive = item.id === activeItemId;
                    return (
                        <li
                            key={item.id}
                            data-test-id={isIconItem(item) ? "slider-item-icon" : "slider-item-text"}
                            onClick={() => onChange(item.id)}
                            className="relative"
                            aria-selected={isActive}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="border"
                                    className="absolute top-0 bottom-0 right-0 left-0 border border-black rounded bg-white"
                                />
                            )}
                            <div
                                className={merge([
                                    "relative w-full z-10 inline-flex justify-center items-center font-sans font-normal p-2 text-center hover:text-black hover:cursor-pointer",
                                    isActive ? "text-black" : "text-black-80",
                                ])}
                            >
                                <span className="overflow-hidden overflow-ellipsis whitespace-nowrap">
                                    {isIconItem(item) ? item.icon : item.name}
                                </span>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </AnimateSharedLayout>
    );
    /*eslint-enable jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions,jsx-a11y/role-supports-aria-props */
}
