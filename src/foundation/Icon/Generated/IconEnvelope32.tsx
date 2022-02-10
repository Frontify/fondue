import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconEnvelope32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconEnvelope32"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M2.667 8a2.667 2.667 0 0 1 2.666-2.667h21.334A2.667 2.667 0 0 1 29.333 8v16a2.667 2.667 0 0 1-2.666 2.667H5.333A2.667 2.667 0 0 1 2.667 24V8Zm23.252-.667H5.702l9.108 8.794a1.667 1.667 0 0 0 2.336-.02l8.773-8.773ZM4.667 23.253l7.193-7.194-7.193-6.945v14.139Zm8.632-5.804L6.08 24.667h19.84l-7.253-7.253-.107.107a3.667 3.667 0 0 1-5.14.045l-.121-.117Zm14.034-8.701v14.504L20.081 16l7.252-7.252Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconEnvelope32);
export default Memo;
