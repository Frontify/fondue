import * as React from "react";
import IconProps from "@elements/Icon/IconProps";
import IconSize from "@elements/Icon/IconSize";
const iconSizeMap = {
    [IconSize.Size8]: "h-2 w-2",
    [IconSize.Size12]: "h-3 w-3",
    [IconSize.Size16]: "h-4 w-4",
    [IconSize.Size20]: "h-5 w-5",
    [IconSize.Size24]: "h-6 w-6",
    [IconSize.Size32]: "h-8 w-8",
};

function IconDoDontsUnderline(props: IconProps): React.ReactElement<IconProps> {
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
            <path d="M7.26 12.722h1.242v1.428H4.589v-1.428H5.83V7.629H4.013v.931H2.584V6.2H10.506v2.36H9.078V7.63H7.26v5.093zm-4.35 5.115a.91.91 0 110-1.818h18.18a.91.91 0 010 1.818H2.91z" />
        </svg>
    );
}

const MemoIconDoDontsUnderline = React.memo(IconDoDontsUnderline);
export default MemoIconDoDontsUnderline;
