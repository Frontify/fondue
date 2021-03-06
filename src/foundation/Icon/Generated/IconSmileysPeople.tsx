import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconSmileysPeople(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = [
        "tw-flex tw-items-center tw-justify-center tw-fill-current",
        IconSizeMap[props.size || IconSize.Size16],
    ].join(" ");
    return (
        <svg
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            className={customClassName}
            name="IconSmileysPeople"
            {...props}
        >
            <path d="M12 22c-1.38 0-2.679-.26-3.896-.781A10.035 10.035 0 0 1 4.92 19.08a10.035 10.035 0 0 1-2.139-3.184A9.801 9.801 0 0 1 2 12c0-1.38.26-2.679.781-3.896A10.035 10.035 0 0 1 4.92 4.92a10.035 10.035 0 0 1 3.184-2.14A9.801 9.801 0 0 1 12 2c1.38 0 2.679.26 3.896.781A10.035 10.035 0 0 1 19.08 4.92a10.035 10.035 0 0 1 2.139 3.184A9.801 9.801 0 0 1 22 12c0 1.38-.26 2.679-.781 3.896a10.035 10.035 0 0 1-2.139 3.184 10.035 10.035 0 0 1-3.184 2.139A9.801 9.801 0 0 1 12 22zm0-1.426a8.343 8.343 0 0 0 3.34-.674 8.663 8.663 0 0 0 2.724-1.836A8.663 8.663 0 0 0 19.9 15.34a8.343 8.343 0 0 0 .674-3.34 8.343 8.343 0 0 0-.674-3.34 8.663 8.663 0 0 0-1.836-2.724A8.663 8.663 0 0 0 15.34 4.1 8.343 8.343 0 0 0 12 3.426a8.343 8.343 0 0 0-3.34.674 8.663 8.663 0 0 0-2.724 1.836A8.663 8.663 0 0 0 4.1 8.66 8.343 8.343 0 0 0 3.426 12c0 1.185.224 2.298.674 3.34a8.663 8.663 0 0 0 1.836 2.724A8.663 8.663 0 0 0 8.66 19.9a8.343 8.343 0 0 0 3.34.674zm-3.182-9.483a1.364 1.364 0 1 1 0-2.727 1.364 1.364 0 0 1 0 2.727zm6.364 0a1.364 1.364 0 1 1 0-2.727 1.364 1.364 0 0 1 0 2.727zm-7.69 2.795h8.977a1 1 0 0 1 .86 1.51c-1.26 2.127-3.053 3.191-5.377 3.191-2.33 0-4.105-1.068-5.327-3.205a1 1 0 0 1 .868-1.496zm4.46 3.201c1.491 0 2.65-.542 3.57-1.701h-7.1c.896 1.16 2.038 1.701 3.53 1.701z" />
        </svg>
    );
}

const Memo = memo(IconSmileysPeople);
export default Memo;
