import * as React from "react";
import IconProps from "@elements/Icon/IconProps";
import IconSize from "@elements/Icon/IconSize";
const iconSizeMap = {
    [IconSize.Size8]: "h-2 w-2",
    [IconSize.Size12]: "h-3 w-3",
    [IconSize.Size16]: "h-4 w-4",
    [IconSize.Size20]: "h-5 w-5",
    [IconSize.Size24]: "h-6 w-6",
    [IconSize.Size32]: "h-8 w-8",
};

function IconFoodDrink(props: IconProps): React.ReactElement<IconProps> {
    const customClassName = [
        "flex items-center justify-center fill-current",
        iconSizeMap[props.size || IconSize.Size16],
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
            <path d="M14.5 18.552v.948a2.5 2.5 0 11-5 0v-.948H8a3 3 0 01-3-3V9a7 7 0 1114 0v6.552a3 3 0 01-3 3h-1.5zm-1.5 0h-2v.948a1 1 0 002 0v-.948zM12 3.5A5.5 5.5 0 006.5 9v6.552a1.5 1.5 0 001.5 1.5h8a1.5 1.5 0 001.5-1.5V9A5.5 5.5 0 0012 3.5zM9.25 8a.75.75 0 011.5 0v7a.75.75 0 11-1.5 0V8zm4 0a.75.75 0 011.5 0v7a.75.75 0 11-1.5 0V8z" />
        </svg>
    );
}

const MemoIconFoodDrink = React.memo(IconFoodDrink);
export default MemoIconFoodDrink;
