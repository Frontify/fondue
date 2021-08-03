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

function IconShare(props: IconProps): React.ReactElement<IconProps> {
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
            name="IconShare"
            {...props}
        >
            <path d="M11.273 4.518L9.44 6.37a.737.737 0 01-1.047-.005l.024.024a.755.755 0 01-.005-1.06l3.072-3.106a.739.739 0 01.019-.02l-.024.025a.735.735 0 011.028-.025l.022.022 3.069 3.105a.758.758 0 01-.005 1.06l.024-.025a.734.734 0 01-1.048.005l-1.842-1.863v9.4a.73.73 0 01-.727.736.73.73 0 01-.727-.737v-9.39zm4.363 5.712a.731.731 0 01-.727-.736c0-.406.326-.735.727-.735h2.37c1.101 0 1.994.889 1.994 1.996v9.248A1.997 1.997 0 0118.006 22H5.994A1.992 1.992 0 014 20.003v-9.248c0-1.102.895-1.996 1.994-1.996h2.37c.401 0 .727.329.727.735a.731.731 0 01-.727.736H6.46c-.555 0-1.005.45-1.005 1.006v8.286A1 1 0 006.46 20.53h11.08c.555 0 1.005-.45 1.005-1.007v-8.286a1 1 0 00-1.005-1.006h-1.904z" />
        </svg>
    );
}

const MemoIconShare = React.memo(IconShare);
export default MemoIconShare;
