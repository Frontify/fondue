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

function IconFiletype(props: IconProps): React.ReactElement<IconProps> {
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
            <path d="M4.343 18.208A2.731 2.731 0 012.5 15.636c0-1.187.77-2.197 1.843-2.572V5.645C4.343 3.632 5.995 2 8.033 2h6.119c.505 0 1.207.273 1.579.62l5.105 4.76c.367.343.664 1.024.664 1.528v9.45C21.5 20.37 19.855 22 17.82 22H8.023c-2.033 0-3.68-1.637-3.68-3.645v-.147zm1.56.156v.286c0 .995.822 1.812 1.835 1.812h10.367a1.83 1.83 0 001.835-1.818v-8.182h-6.242a.77.77 0 01-.776-.77V3.538h-5.17c-1.026 0-1.849.811-1.849 1.812v7.56h6.735c1.527 0 2.765 1.22 2.765 2.726 0 1.507-1.238 2.728-2.765 2.728H5.903zm14.037-9.44v-.178l-5.459-5.063v5.24h5.46zM5.265 14.726a.915.915 0 00-.922.91c0 .501.413.908.922.908h7.373a.915.915 0 00.922-.909.915.915 0 00-.922-.909H5.265z" />
        </svg>
    );
}

const MemoIconFiletype = React.memo(IconFiletype);
export default MemoIconFiletype;
