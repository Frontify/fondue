import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconMagnifier32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconMagnifier32"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M14.841 27.282c-6.724 0-12.174-5.51-12.174-12.308 0-6.797 5.45-12.307 12.174-12.307 6.724 0 12.175 5.51 12.175 12.307a12.34 12.34 0 0 1-2.688 7.715c.08.049.158.107.23.175l4.346 4.102c.546.516.575 1.381.065 1.933a1.342 1.342 0 0 1-1.912.066l-4.346-4.102a1.366 1.366 0 0 1-.238-.298 12.042 12.042 0 0 1-7.632 2.717Zm0-2.735c5.23 0 9.47-4.286 9.47-9.573 0-5.286-4.24-9.572-9.47-9.572s-9.469 4.286-9.469 9.572c0 5.287 4.24 9.573 9.47 9.573Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconMagnifier32);
export default Memo;
