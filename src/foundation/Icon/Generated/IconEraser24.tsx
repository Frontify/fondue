import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconEraser24(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            className={customClassName}
            name="IconEraser24"
            {...props}
        >
            <g fill="currentColor">
                <path
                    fillRule="evenodd"
                    d="M3.707 13.516a2 2 0 0 0 0 2.829l4.014 4.014a2 2 0 0 0 2.828 0L20.945 9.963 14.103 3.12 3.707 13.516Zm2.837-.715 4.72 4.72-1.775 1.777a.5.5 0 0 1-.708 0l-4.013-4.014a.5.5 0 0 1 0-.707l1.776-1.776Zm1.06-1.061 1.83 1.83 6.499-6.498-1.83-1.83-6.498 6.498Zm2.891 2.89 1.83 1.831 6.499-6.498-1.83-1.83-6.498 6.498Z"
                    clipRule="evenodd"
                />
                <path d="M13.569 19.45a.75.75 0 0 0 0 1.5h5.097a.75.75 0 1 0 0-1.5h-5.097Z" />
            </g>
        </svg>
    );
}

const Memo = memo(IconEraser24);
export default Memo;
