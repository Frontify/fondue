import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";

function IconMagnifierPlus12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconMagnifierPlus12"
            {...props}
        >
            <g fill="currentColor">
                <path d="M6.918 5.115h-.853V4.24a.5.5 0 0 0-1 0v.875h-.852a.5.5 0 0 0 0 1h.852v.875a.5.5 0 1 0 1 0v-.875h.853a.5.5 0 0 0 0-1Z" />
                <path
                    fillRule="evenodd"
                    d="M1 5.615c0 2.55 2.044 4.616 4.565 4.616a4.516 4.516 0 0 0 2.862-1.02.509.509 0 0 0 .09.113l1.63 1.538a.503.503 0 0 0 .716-.025.517.517 0 0 0-.024-.725l-1.63-1.538a.51.51 0 0 0-.086-.066 4.627 4.627 0 0 0 1.008-2.893C10.13 3.066 8.087 1 5.565 1 3.044 1 1 3.066 1 5.615Zm8.116 0c0 1.983-1.59 3.59-3.55 3.59-1.962 0-3.551-1.607-3.551-3.59 0-1.982 1.59-3.59 3.55-3.59 1.962 0 3.551 1.608 3.551 3.59Z"
                    clipRule="evenodd"
                />
            </g>
        </svg>
    );
}

const Memo = memo(IconMagnifierPlus12);
export default Memo;
