import React, { memo } from "react";
import { GeneratedIconProps } from "@components/Icon/IconProps";
import { IconSize, IconSizeMap } from "@components/Icon/IconSize";

function IconAnalytics(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = [
        "tw-flex tw-items-center tw-justify-center tw-fill-current",
        IconSizeMap[props.size || IconSize.Size16],
    ].join(" ");
    return (
        <svg
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="100%"
            height="100%"
            className={customClassName}
            name="IconAnalytics"
            {...props}
        >
            <path d="M20.535 11.277a8.134 8.134 0 0 0-.771-2.93 8.683 8.683 0 0 0-1.7-2.411 8.683 8.683 0 0 0-2.412-1.7 8.134 8.134 0 0 0-2.93-.771v7.812h7.813Zm0 1.446h-9.258V3.465a8.424 8.424 0 0 0-3.076.85 8.416 8.416 0 0 0-2.49 1.865 8.906 8.906 0 0 0-1.67 2.646A8.253 8.253 0 0 0 3.426 12c0 1.185.224 2.298.674 3.34a8.663 8.663 0 0 0 1.836 2.724A8.663 8.663 0 0 0 8.66 19.9a8.343 8.343 0 0 0 3.34.674c1.12 0 2.178-.205 3.174-.615a8.906 8.906 0 0 0 2.646-1.67 8.416 8.416 0 0 0 1.866-2.49 8.424 8.424 0 0 0 .85-3.076ZM12 22c-1.38 0-2.679-.26-3.896-.781A10.035 10.035 0 0 1 4.92 19.08a10.035 10.035 0 0 1-2.139-3.184A9.801 9.801 0 0 1 2 12c0-1.38.26-2.679.781-3.896A10.035 10.035 0 0 1 4.92 4.92 10.035 10.035 0 0 1 8.104 2.78 9.801 9.801 0 0 1 12 2c1.38 0 2.679.26 3.896.781A10.035 10.035 0 0 1 19.08 4.92a10.035 10.035 0 0 1 2.139 3.184A9.801 9.801 0 0 1 22 12c0 1.38-.26 2.679-.781 3.896a10.035 10.035 0 0 1-2.139 3.184 10.035 10.035 0 0 1-3.184 2.139A9.801 9.801 0 0 1 12 22Z" />
        </svg>
    );
}

const Memo = memo(IconAnalytics);
export default Memo;
