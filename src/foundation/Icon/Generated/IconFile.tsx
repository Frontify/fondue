import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconFile(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
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
            name="IconFile"
            {...props}
        >
            <path d="M18.955 10.462h-6.186a.767.767 0 0 1-.769-.77V3.538H6.877c-1.016 0-1.832.811-1.832 1.812v13.3c0 .995.815 1.812 1.819 1.812h10.272c1 0 1.819-.814 1.819-1.818v-8.182Zm0-1.539v-.177l-5.41-5.063v5.24h5.41ZM3.5 5.645A3.65 3.65 0 0 1 7.157 2h6.062c.5 0 1.196.273 1.564.62l5.059 4.76c.363.343.658 1.024.658 1.528v9.45A3.643 3.643 0 0 1 16.853 22H7.147A3.649 3.649 0 0 1 3.5 18.355V5.645Z" />
        </svg>
    );
}

const Memo = memo(IconFile);
export default Memo;
