import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconPin12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconPin12"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M7.749 1.182a1.005 1.005 0 0 0-1.181.408L4.96 4.117a3.535 3.535 0 0 0-2.337.434H2.62a1.005 1.005 0 0 0-.2 1.58L3.88 7.59l-2.645 2.645a.375.375 0 0 0 .53.53L4.41 8.12l1.46 1.46a1.005 1.005 0 0 0 1.579-.201v-.002a3.535 3.535 0 0 0 .434-2.337l2.526-1.607a1.005 1.005 0 0 0 .172-1.56L8.126 1.42a1.005 1.005 0 0 0-.377-.237Zm-.361.695a.255.255 0 0 1 .208.073l2.454 2.454a.255.255 0 0 1-.043.396L7.264 6.545a.375.375 0 0 0-.163.404c.167.697.06 1.431-.3 2.05a.255.255 0 0 1-.4.051L2.95 5.6A.255.255 0 0 1 3 5.198a2.785 2.785 0 0 1 2.05-.3.375.375 0 0 0 .405-.163L7.2 1.993a.255.255 0 0 1 .188-.116Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconPin12);
export default Memo;
