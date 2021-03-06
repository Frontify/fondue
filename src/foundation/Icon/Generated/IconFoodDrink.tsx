import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconFoodDrink(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = [
        "tw-flex tw-items-center tw-justify-center tw-fill-current",
        IconSizeMap[props.size || IconSize.Size16],
    ].join(" ");
    return (
        <svg
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            className={customClassName}
            name="IconFoodDrink"
            {...props}
        >
            <path d="M14.5 18.552v.948a2.5 2.5 0 1 1-5 0v-.948H8a3 3 0 0 1-3-3V9a7 7 0 1 1 14 0v6.552a3 3 0 0 1-3 3h-1.5zm-1.5 0h-2v.948a1 1 0 0 0 2 0v-.948zM12 3.5A5.5 5.5 0 0 0 6.5 9v6.552a1.5 1.5 0 0 0 1.5 1.5h8a1.5 1.5 0 0 0 1.5-1.5V9A5.5 5.5 0 0 0 12 3.5zM9.25 8a.75.75 0 0 1 1.5 0v7a.75.75 0 1 1-1.5 0V8zm4 0a.75.75 0 0 1 1.5 0v7a.75.75 0 1 1-1.5 0V8z" />
        </svg>
    );
}

const Memo = memo(IconFoodDrink);
export default Memo;
