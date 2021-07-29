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

function IconTypography(props: IconProps): React.ReactElement<IconProps> {
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
            <polygon points="12.8181818 19.4355469 16.0909091 19.4355469 16.0909091 21 7.90909091 21 7.90909091 19.4355469 11.1818182 19.4355469 11.1818182 4.56445312 4.63636364 4.56445312 4.63636364 6.91992188 3 6.91992188 3 3 21 3 21 6.91992188 19.3636364 6.91992188 19.3636364 4.56445312 12.8181818 4.56445312" />
        </svg>
    );
}

const MemoIconTypography = React.memo(IconTypography);
export default MemoIconTypography;
