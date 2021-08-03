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

function IconUser(props: IconProps): React.ReactElement<IconProps> {
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
            <path d="M16.312 13.184a8.35 8.35 0 014.349 8.188H4.041a8.35 8.35 0 014.407-8.22 5.833 5.833 0 01-1.891-4.306A5.843 5.843 0 0112.397 3a5.843 5.843 0 015.84 5.846c0 1.72-.743 3.268-1.925 4.338zm-1.69 1.068a5.818 5.818 0 01-2.225.44c-.804 0-1.57-.163-2.267-.457a6.688 6.688 0 00-4.408 5.467H18.98a6.688 6.688 0 00-4.358-5.45zm-2.225-1.23a4.174 4.174 0 004.172-4.176 4.174 4.174 0 00-4.172-4.176 4.174 4.174 0 00-4.172 4.176 4.174 4.174 0 004.172 4.175z" />
        </svg>
    );
}

const MemoIconUser = React.memo(IconUser);
export default MemoIconUser;
