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

function IconStarFilled(props: IconProps): React.ReactElement<IconProps> {
    const customClassName = [
        "flex items-center justify-center fill-current",
        iconSizeMap[props.size || IconSize.Size16],
    ].join(" ");
    return (
        <svg
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width="100%"
            height="100%"
            className={customClassName}
            {...props}
        >
            <polygon
                id="Icon_Star_filled"
                points="5.81966011 21.0211303 7 14.1392207 2 9.26542528 8.90983006 8.2613682 12 2 15.0901699 8.2613682 22 9.26542528 17 14.1392207 18.1803399 21.0211303 12 17.7719334"
            />
        </svg>
    );
}

const MemoIconStarFilled = React.memo(IconStarFilled);
export default MemoIconStarFilled;
