import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconPolygon20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconPolygon20"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="m15.15 17.917 3.183-9.786L10 2.083 1.667 8.131l3.183 9.786h10.3ZM5.836 16.56 3.263 8.65 10 3.76l6.737 4.89-2.573 7.91H5.836Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconPolygon20);
export default Memo;
