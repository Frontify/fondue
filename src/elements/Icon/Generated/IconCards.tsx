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

function IconCards(props: IconProps): React.ReactElement<IconProps> {
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
            {...props}
        >
            <path d="M18.7 8.25V4.5a.833.833 0 00-.833-.833H6.2a.833.833 0 00-.833.833v3.75H18.7zm0 1.667H5.367V19.5c0 .46.373.833.833.833h11.667c.46 0 .833-.373.833-.833V9.917zM6.2 2h11.667a2.5 2.5 0 012.5 2.5v15a2.5 2.5 0 01-2.5 2.5H6.2a2.5 2.5 0 01-2.5-2.5v-15A2.5 2.5 0 016.2 2zm1.667 11.25a.833.833 0 110-1.667H11.2a.833.833 0 010 1.667H7.867zm0 3.333a.833.833 0 110-1.666h7.5a.833.833 0 110 1.666h-7.5z" />
        </svg>
    );
}

const MemoIconCards = React.memo(IconCards);
export default MemoIconCards;
