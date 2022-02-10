import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconHeartCircle20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconHeartCircle20"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M10 18.333a8.333 8.333 0 1 1 0-16.666 8.333 8.333 0 0 1 0 16.666Zm4.447-7.41c.898-1.97.883-3.964-.456-4.89-1.315-.907-2.689-.568-3.99.858-1.303-1.426-2.677-1.765-3.991-.857-1.34.925-1.354 2.919-.457 4.89.835 1.835 3.049 4.09 4.413 4.135h.06c1.372-.044 3.586-2.3 4.421-4.135Zm-1.133-3.91c.727.502.737 1.908.05 3.418-.667 1.466-2.578 3.412-3.38 3.438-.77-.027-2.68-1.973-3.348-3.438-.687-1.51-.677-2.916.05-3.417.857-.592 1.742-.278 2.84 1.168.238.314.71.314.948 0 1.098-1.446 1.983-1.76 2.84-1.169ZM17.143 10a7.143 7.143 0 1 1-14.286 0 7.143 7.143 0 0 1 14.286 0Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconHeartCircle20);
export default Memo;
