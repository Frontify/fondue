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

function IconDoDontsStrikethrough(props: IconProps): React.ReactElement<IconProps> {
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
            <path
                d="M20.1672634,5.11667637 L4.33334247,18.7914263 L4.33334247,6.95000856 C4.33334247,5.93748715 5.15415325,5.11667637 6.16667466,5.11667637 L20.1672634,5.11667637 Z M17.8333253,18.7833271 L3.8327366,18.7833271 L19.6666575,5.10857716 L19.6666575,16.9499949 C19.6666575,17.9625163 18.8458468,18.7833271 17.8333253,18.7833271 Z M19.0253333,5.89595533 L18.5604044,5.63748599 C18.3401256,5.51502574 18.0925898,5.45001199 17.8333253,5.45001199 L6.16667466,5.45001199 C5.33824943,5.45001199 4.66667809,6.12158333 4.66667809,6.95000856 L4.66667809,16.9499949 C4.66667809,17.1465318 4.70397413,17.3362095 4.77559646,17.5129124 L4.97466666,18.0040481 L5.43959562,18.2625174 C5.65987443,18.3849777 5.90741025,18.4499914 6.16667466,18.4499914 L17.8333253,18.4499914 C18.6617506,18.4499914 19.3333219,17.7784201 19.3333219,16.9499949 L19.3333219,6.95000856 C19.3333219,6.75347162 19.2960259,6.56379392 19.2244035,6.38709102 L19.0253333,5.89595533 Z"
                id="icon_DodontsStrikethrough"
                strokeWidth={2}
            />
        </svg>
    );
}

const MemoIconDoDontsStrikethrough = React.memo(IconDoDontsStrikethrough);
export default MemoIconDoDontsStrikethrough;
