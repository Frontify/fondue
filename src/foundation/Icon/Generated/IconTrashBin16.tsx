import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconTrashBin16(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconTrashBin16"
            {...props}
        >
            <g fill="currentColor">
                <path d="M5.837 6.788a.606.606 0 1 1 1.212 0v4.848a.606.606 0 0 1-1.212 0V6.788Zm3.636-.606a.606.606 0 0 0-.606.606v4.848a.606.606 0 0 0 1.212 0V6.788a.606.606 0 0 0-.606-.606Z" />
                <path
                    fillRule="evenodd"
                    d="M9.17 1.333H6.746c-.67 0-1.212.543-1.212 1.212v1.212H2.806a.606.606 0 1 0 0 1.213h.303v7.878c0 1.005.814 1.819 1.818 1.819h6.061a1.818 1.818 0 0 0 1.818-1.819V4.97h.422a.606.606 0 1 0 0-1.212h-2.846V2.544c0-.67-.543-1.212-1.212-1.212ZM4.32 4.97h7.273v7.878a.606.606 0 0 1-.606.606h-6.06a.606.606 0 0 1-.607-.606V4.97Zm2.425-1.213V2.545H9.17v1.212H6.746Z"
                    clipRule="evenodd"
                />
            </g>
        </svg>
    );
}

const Memo = memo(IconTrashBin16);
export default Memo;
