import * as React from "react";
import { IconProps, IconSize } from "@elements/Icon/Icon";
const iconSizeMap = {
    [IconSize.Size8]: "h-2 w-2",
    [IconSize.Size12]: "h-3 w-3",
    [IconSize.Size16]: "h-4 w-4",
    [IconSize.Size20]: "h-5 w-5",
    [IconSize.Size24]: "h-6 w-6",
    [IconSize.Size32]: "h-8 w-8",
};

function IconMinus(props: IconProps): React.ReactElement<IconProps> {
    const customClassName = [
        "flex items-center justify-center fill-current",
        iconSizeMap[props.size || IconSize.Size16],
    ].join(" ");
    return (
        <svg
            fill="currentColor"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            className={customClassName}
            {...props}
        >
            <path d="M4.1257 8.70816C3.73356 8.70807 3.4167 8.3901 3.41798 7.99796C3.41926 7.60582 3.73819 7.28799 4.13033 7.28809L11.8737 7.29112C12.2658 7.29122 12.5827 7.60918 12.5814 8.00133C12.5801 8.39347 12.2612 8.71129 11.869 8.7112L4.1257 8.70816Z" />
        </svg>
    );
}

const MemoIconMinus = React.memo(IconMinus);
export default MemoIconMinus;
