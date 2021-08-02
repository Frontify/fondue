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

function IconDrops(props: IconProps): React.ReactElement<IconProps> {
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
            <path d="M9.442 21c-.636 0-1.151-.387-1.151-.864s.515-.863 1.151-.863h4.606c.636 0 1.152.386 1.152.863s-.516.864-1.152.864H9.442zm-1.936-3.455c-.52 0-.942-.386-.942-.863s.421-.864.942-.864h8.48c.52 0 .941.387.941.864s-.422.863-.942.863h-8.48zm4.24-3.454a6.045 6.045 0 110-12.091 6.045 6.045 0 010 12.09zm0-1.727a4.318 4.318 0 100-8.637 4.318 4.318 0 000 8.637z" />
        </svg>
    );
}

const MemoIconDrops = React.memo(IconDrops);
export default MemoIconDrops;
