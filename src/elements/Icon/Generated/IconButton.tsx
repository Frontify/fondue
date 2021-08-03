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

function IconButton(props: IconProps): React.ReactElement<IconProps> {
    const customClassName = [
        "flex items-center justify-center fill-current",
        iconSizeMap[props.size || IconSize.Size16],
    ].join(" ");
    return (
        <svg
            fill="currentColor"
            viewBox="0 0 31 28"
            width="100%"
            height="100%"
            className={customClassName}
            name="IconButton"
            {...props}
        >
            <path d="M25.075 15.125h1.991a3.045 3.045 0 003.045-3.045V5.99a3.045 3.045 0 00-3.045-3.045H4.228A3.045 3.045 0 001.183 5.99v6.09a3.045 3.045 0 003.045 3.045h10.919l-.58-8.221 10.508 8.221z" />
            <path d="M23.801 21.034l2.623 4.933-2.689 1.43-2.608-4.905-3.569 3.017-1.056-14.958 11.81 9.24z" />
        </svg>
    );
}

const MemoIconButton = React.memo(IconButton);
export default MemoIconButton;
