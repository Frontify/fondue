import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconMagnifierPlus32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconMagnifierPlus32"
            {...props}
        >
            <g fill="currentColor">
                <path d="M18.448 13.641h-2.273v-2.333a1.333 1.333 0 0 0-2.667 0v2.333h-2.273a1.333 1.333 0 1 0 0 2.667h2.273v2.333a1.333 1.333 0 0 0 2.667 0v-2.333h2.273a1.333 1.333 0 1 0 0-2.667Z" />
                <path
                    fillRule="evenodd"
                    d="M2.667 14.974c0 6.798 5.45 12.308 12.174 12.308 2.89 0 5.544-1.017 7.632-2.717.063.107.143.208.238.298l4.347 4.102a1.342 1.342 0 0 0 1.911-.066 1.38 1.38 0 0 0-.065-1.933l-4.347-4.102a1.358 1.358 0 0 0-.23-.175 12.34 12.34 0 0 0 2.689-7.715c0-6.797-5.45-12.307-12.175-12.307-6.724 0-12.174 5.51-12.174 12.307Zm21.643 0c0 5.287-4.24 9.573-9.469 9.573-5.23 0-9.469-4.286-9.469-9.573 0-5.286 4.24-9.572 9.47-9.572 5.229 0 9.468 4.286 9.468 9.572Z"
                    clipRule="evenodd"
                />
            </g>
        </svg>
    );
}

const Memo = memo(IconMagnifierPlus32);
export default Memo;
