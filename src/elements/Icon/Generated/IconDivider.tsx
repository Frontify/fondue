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

function IconDivider(props: IconProps): React.ReactElement<IconProps> {
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
            name="IconDivider"
            {...props}
        >
            <path d="M5.818 3.545a.773.773 0 00-.773.773v15.455c0 .426.346.772.773.772h12.364a.773.773 0 00.773-.772V4.318a.773.773 0 00-.773-.773H5.818zm0-1.545h12.364A2.318 2.318 0 0120.5 4.318v15.455a2.318 2.318 0 01-2.318 2.318H5.818A2.318 2.318 0 013.5 19.773V4.318A2.318 2.318 0 015.818 2zm1.546 10.818a.773.773 0 010-1.545h9.272a.773.773 0 110 1.545H7.364z" />
        </svg>
    );
}

const MemoIconDivider = React.memo(IconDivider);
export default MemoIconDivider;
