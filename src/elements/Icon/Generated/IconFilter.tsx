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
            width="100%"
            height="100%"
            className={customClassName}
            name="IconFilter"
            {...props}
        >
            <path d="M4.133 5l5.82 8.856a5 5 0 01.821 2.746v3.744l2.634-1.575.033-2.222a5 5 0 01.82-2.673L20.096 5H4.133zm0-2h15.962a2 2 0 011.671 3.098l-5.833 8.877a3 3 0 00-.492 1.603l-.033 2.222a2 2 0 01-.973 1.687L11.8 22.062a2 2 0 01-3.027-1.716v-3.744a3 3 0 00-.493-1.647l-5.82-8.857A2 2 0 014.133 3z" />
        </svg>
    );
}

const MemoIconFilter = React.memo(IconFilter);
export default MemoIconFilter;
