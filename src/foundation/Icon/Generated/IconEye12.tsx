import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconEye12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconEye12"
            {...props}
        >
            <g fill="currentColor">
                <path d="M8 6a2 2 0 1 1-3.92-.564c.061-.207.304-.276.49-.168.174.1.233.318.199.515a1.25 1.25 0 1 0 .866-.979.524.524 0 0 1-.416-.028c-.252-.145-.28-.497-.012-.613A2 2 0 0 1 8 6Z" />
                <path
                    fillRule="evenodd"
                    d="M11.363 5.637a.84.84 0 0 1 0 .726 5.938 5.938 0 0 1-10.726 0 .845.845 0 0 1 0-.726 5.938 5.938 0 0 1 10.726 0Zm-9.853.776a.822.822 0 0 1 0-.826A5.186 5.186 0 0 1 6 3a5.186 5.186 0 0 1 4.49 2.587.822.822 0 0 1 0 .826A5.186 5.186 0 0 1 6 9a5.186 5.186 0 0 1-4.49-2.587Z"
                    clipRule="evenodd"
                />
            </g>
        </svg>
    );
}

const Memo = memo(IconEye12);
export default Memo;
