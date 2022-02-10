import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconEraser20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconEraser20"
            {...props}
        >
            <g fill="currentColor">
                <path
                    fillRule="evenodd"
                    d="M3.089 11.264c-.65.65-.65 1.706 0 2.357l3.345 3.345c.65.65 1.706.65 2.357 0l8.663-8.664-5.702-5.701-8.663 8.663Zm2.364-.597 3.934 3.934-1.48 1.48a.417.417 0 0 1-.59 0l-3.344-3.344a.417.417 0 0 1 0-.59l1.48-1.48Zm.884-.884 1.525 1.526 5.415-5.415-1.525-1.526-5.415 5.415Zm2.41 2.41 1.524 1.525 5.415-5.416-1.525-1.525-5.415 5.416Z"
                    clipRule="evenodd"
                />
                <path d="M11.307 16.208a.625.625 0 1 0 0 1.25h4.248a.625.625 0 0 0 0-1.25h-4.248Z" />
            </g>
        </svg>
    );
}

const Memo = memo(IconEraser20);
export default Memo;
