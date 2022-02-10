import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconDoAndDont32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconDoAndDont32"
            {...props}
        >
            <g fill="currentColor">
                <path d="M7.707 7.707a.952.952 0 0 0 0 1.347l.943.943-.943.943a.952.952 0 0 0 1.347 1.347l.943-.943.943.943a.952.952 0 0 0 1.347-1.347l-.943-.943.943-.943a.952.952 0 0 0-1.347-1.347l-.943.943-.943-.943a.952.952 0 0 0-1.347 0Z" />
                <path
                    fillRule="evenodd"
                    d="M9.81 16.952a7.143 7.143 0 1 1 0-14.285 7.143 7.143 0 0 1 0 14.285Zm0-1.905a5.238 5.238 0 1 0 0-10.476 5.238 5.238 0 0 0 0 10.476Z"
                    clipRule="evenodd"
                />
                <path d="M25.425 20.078a.952.952 0 0 0-1.347.02l-2.665 2.75-.7-.79a.952.952 0 0 0-1.426 1.263l1.381 1.56a.952.952 0 0 0 1.397.031l3.38-3.487a.952.952 0 0 0-.02-1.347Z" />
                <path
                    fillRule="evenodd"
                    d="M15.047 22.19a7.143 7.143 0 1 0 14.286 0 7.143 7.143 0 0 0-14.285 0Zm7.143 5.238a5.238 5.238 0 1 0 0-10.476 5.238 5.238 0 0 0 0 10.476Z"
                    clipRule="evenodd"
                />
            </g>
        </svg>
    );
}

const Memo = memo(IconDoAndDont32);
export default Memo;
