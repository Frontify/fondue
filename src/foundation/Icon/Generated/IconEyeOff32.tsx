import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconEyeOff32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconEyeOff32"
            {...props}
        >
            <g fill="currentColor">
                <path
                    fillRule="evenodd"
                    d="M5.629 26.37a1 1 0 0 1 0-1.414L24.956 5.63a1 1 0 1 1 1.415 1.414l-1.604 1.604a15.9 15.9 0 0 1 5.534 6.383 2.253 2.253 0 0 1 0 1.939C27.757 22.31 22.309 26 16 26c-2.502 0-4.869-.58-6.972-1.613l-1.985 1.985a1 1 0 0 1-1.414 0Zm14.783-13.368 2.908-2.909a13.902 13.902 0 0 1 4.653 4.806c.395.68.395 1.52 0 2.202A13.829 13.829 0 0 1 16 24c-1.94 0-3.788-.4-5.465-1.121l2.467-2.467a5.333 5.333 0 0 0 7.41-7.41Zm-1.456 1.456-4.498 4.498a3.333 3.333 0 0 0 4.498-4.498Z"
                    clipRule="evenodd"
                />
                <path d="M19.351 8.409A13.864 13.864 0 0 0 16 7.999a13.83 13.83 0 0 0-11.973 6.9 2.192 2.192 0 0 0 0 2.202 13.897 13.897 0 0 0 3.02 3.612L5.629 22.13a15.887 15.887 0 0 1-3.93-5.162 2.253 2.253 0 0 1 0-1.939C4.242 9.69 9.69 6 15.998 6c1.735 0 3.405.279 4.966.794L19.351 8.41Z" />
            </g>
        </svg>
    );
}

const Memo = memo(IconEyeOff32);
export default Memo;
