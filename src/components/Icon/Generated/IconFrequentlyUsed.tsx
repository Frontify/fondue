import React, { memo } from "react";
import { GeneratedIconProps } from "@components/Icon/IconProps";
import { IconSize, IconSizeMap } from "@components/Icon/IconSize";

function IconFrequentlyUsed(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
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
            name="IconFrequentlyUsed"
            {...props}
        >
            <path d="M12.85 11.65H16a.85.85 0 0 1 0 1.7h-4a.847.847 0 0 1-.85-.85V6.727a.85.85 0 1 1 1.7 0v4.923zM12 22c-1.38 0-2.679-.26-3.896-.781A10.035 10.035 0 0 1 4.92 19.08a10.035 10.035 0 0 1-2.139-3.184A9.801 9.801 0 0 1 2 12c0-1.38.26-2.679.781-3.896A10.035 10.035 0 0 1 4.92 4.92a10.035 10.035 0 0 1 3.184-2.14A9.801 9.801 0 0 1 12 2c1.38 0 2.679.26 3.896.781A10.035 10.035 0 0 1 19.08 4.92a10.035 10.035 0 0 1 2.139 3.184A9.801 9.801 0 0 1 22 12c0 1.38-.26 2.679-.781 3.896a10.035 10.035 0 0 1-2.139 3.184 10.035 10.035 0 0 1-3.184 2.139A9.801 9.801 0 0 1 12 22zm0-1.426a8.343 8.343 0 0 0 3.34-.674 8.663 8.663 0 0 0 2.724-1.836A8.663 8.663 0 0 0 19.9 15.34a8.343 8.343 0 0 0 .674-3.34 8.343 8.343 0 0 0-.674-3.34 8.663 8.663 0 0 0-1.836-2.724A8.663 8.663 0 0 0 15.34 4.1 8.343 8.343 0 0 0 12 3.426a8.343 8.343 0 0 0-3.34.674 8.663 8.663 0 0 0-2.724 1.836A8.663 8.663 0 0 0 4.1 8.66 8.343 8.343 0 0 0 3.426 12c0 1.185.224 2.298.674 3.34a8.663 8.663 0 0 0 1.836 2.724A8.663 8.663 0 0 0 8.66 19.9a8.343 8.343 0 0 0 3.34.674z" />
        </svg>
    );
}

const Memo = memo(IconFrequentlyUsed);
export default Memo;
