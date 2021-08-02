/* (c) Copyright Frontify Ltd., all rights reserved. */

import IconProps from "@elements/Icon/IconProps";
import { useFocusRing } from "@react-aria/focus";
import { useRadio, useRadioGroup } from "@react-aria/radio";
import { VisuallyHidden } from "@react-aria/visually-hidden";
import { useRadioGroupState } from "@react-stately/radio";
import { merge } from "@utilities/merge";
import { AnimateSharedLayout, motion } from "framer-motion";
import { ReactElement, useRef } from "react";

export type IconItem = {
    id: string;
    icon: ReactElement<IconProps>;
    ariaLabel: string;
};

export type TextItem = {
    id: string;
    name: string;
};

export type SliderProps = {
    items: TextItem[] | IconItem[];
    activeItemId: string;
    onChange: (id: string) => void;
    ariaLabel?: string;
};

const isIconItem = (item: TextItem | IconItem): item is IconItem => (item as IconItem).icon !== undefined;

export default function Slider({
    items,
    activeItemId,
    onChange,
    ariaLabel = "Slider",
}: SliderProps): ReactElement<SliderProps> {
    const groupProps = { onChange, value: activeItemId, label: ariaLabel };
    const radioGroupState = useRadioGroupState(groupProps);
    const { radioGroupProps } = useRadioGroup(groupProps, radioGroupState);
    const { isFocusVisible, focusProps } = useFocusRing();
    const ref = useRef(null);

    return (
        <AnimateSharedLayout>
            <ul
                data-test-id="slider"
                className="w-full grid grid-flow-col auto-cols-fr justify-evenly p-0 border border-black-20 m-0 bg-black-0 rounded font-sans text-s list-none"
                {...radioGroupProps}
            >
                {items.map((item) => {
                    const isActive = item.id === activeItemId;
                    const { inputProps } = useRadio(
                        {
                            value: item.id,
                            "aria-label": isIconItem(item) ? item.ariaLabel : item.name,
                        },
                        radioGroupState,
                        ref,
                    );

                    return (
                        <li key={item.id} className="relative">
                            {isActive && (
                                <motion.div
                                    layoutId="border"
                                    className={merge([
                                        "absolute -inset-px border rounded bg-white",
                                        isFocusVisible ? "border-violet-60" : "border-black",
                                    ])}
                                />
                            )}
                            <label
                                data-test-id={isIconItem(item) ? "slider-item-icon" : "slider-item-text"}
                                className={merge([
                                    "relative w-full z-10 inline-flex justify-center items-center font-sans font-normal p-2.5 text-center hover:text-black hover:cursor-pointer",
                                    isActive ? "text-black" : "text-black-80",
                                ])}
                                aria-hidden="true"
                            >
                                <VisuallyHidden>
                                    <input
                                        data-test-id="slider-input"
                                        {...inputProps}
                                        {...focusProps}
                                        value={item.id}
                                        ref={ref}
                                    />
                                </VisuallyHidden>
                                <span className="overflow-hidden overflow-ellipsis whitespace-nowrap">
                                    {isIconItem(item) ? item.icon : item.name}
                                </span>
                            </label>
                        </li>
                    );
                })}
            </ul>
        </AnimateSharedLayout>
    );
}
