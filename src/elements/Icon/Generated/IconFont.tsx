import * as React from "react";
import { IconProps } from "@elements/Icon/IconProps";
import { IconSize } from "@elements/Icon/IconSize";
const iconSizeMap = {
    [IconSize.Size8]: "h-2 w-2",
    [IconSize.Size12]: "h-3 w-3",
    [IconSize.Size16]: "h-4 w-4",
    [IconSize.Size20]: "h-5 w-5",
    [IconSize.Size24]: "h-6 w-6",
    [IconSize.Size32]: "h-8 w-8",
};

function IconFont(props: IconProps): React.ReactElement<IconProps> {
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
            name="IconFont"
            {...props}
        >
            <path d="M12.77 15.273h1.337v1.539H9.893v-1.539h1.338V9.788H9.273v1.004H7.734V8.25h8.532v2.542h-1.539V9.788H12.77v5.485zM4.307 3.3h15.384A2.308 2.308 0 0122 5.608v13.846a2.308 2.308 0 01-2.308 2.308H4.308A2.308 2.308 0 012 19.454V5.608A2.308 2.308 0 014.308 3.3zm0 1.538a.77.77 0 00-.77.77v13.846c0 .425.345.77.77.77h15.384a.77.77 0 00.77-.77V5.608a.77.77 0 00-.77-.77H4.308z" />
        </svg>
    );
}

const MemoIconFont = React.memo(IconFont);
export default MemoIconFont;
