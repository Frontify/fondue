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

function IconColorSwatch(props: IconProps): React.ReactElement<IconProps> {
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
            <path d="M15.846 4.838H12.77v15.385h3.077V4.838zm1.539 0v15.385h2.307a.77.77 0 00.77-.77V5.609a.77.77 0 00-.77-.77h-2.307zm-6.154 0H8.923v15.385h2.308V4.838zm-3.846 0H5.846v15.385h1.539V4.838zM4.308 20.223V4.838a.77.77 0 00-.77.77v13.846c0 .425.345.77.77.77zm0-16.923h15.384A2.308 2.308 0 0122 5.608v13.846a2.308 2.308 0 01-2.308 2.308H4.308A2.308 2.308 0 012 19.454V5.608A2.308 2.308 0 014.308 3.3z" />
        </svg>
    );
}

const MemoIconColorSwatch = React.memo(IconColorSwatch);
export default MemoIconColorSwatch;
