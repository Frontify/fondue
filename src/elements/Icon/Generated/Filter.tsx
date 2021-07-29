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

function IconFilter(props: IconProps): React.ReactElement<IconProps> {
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
                d="M4.13270534,5 L9.95267868,13.856327 C10.488607,14.6718559 10.7741732,15.6263879 10.7741732,16.6022498 L10.7741732,20.3457641 L13.4083636,18.7705278 L13.4408084,16.5491327 C13.454697,15.5982214 13.7394883,14.6709923 14.2617697,13.87623 L20.0948224,5 L4.13270534,5 Z M4.13270534,3 L20.0948224,3 C21.1993919,3 22.0948224,3.8954305 22.0948224,5 C22.0948224,5.39034477 21.9805959,5.77215757 21.7662246,6.09836913 L15.9331719,14.9745991 C15.619803,15.4514565 15.4489283,16.007794 15.4405951,16.5783407 L15.4081503,18.7997359 C15.3980272,19.4928349 15.0297413,20.1312715 14.4348251,20.4870292 L11.8006347,22.0622654 C10.8526372,22.6291644 9.62457093,22.3202231 9.0576719,21.3722256 C8.87214579,21.0619794 8.77417321,20.7072508 8.77417321,20.3457641 L8.77417321,16.6022498 C8.77417321,16.0167327 8.60283348,15.4440135 8.28127649,14.9546961 L2.46130315,6.09836913 C1.85469063,5.17527919 2.11124627,3.93521033 3.03433621,3.32859782 C3.36054776,3.11422649 3.74236056,3 4.13270534,3 Z"
                id="Icon_Filter"
            />
        </svg>
    );
}

const MemoIconFilter = React.memo(IconFilter);
export default MemoIconFilter;
