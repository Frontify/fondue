import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconPin16(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconPin16"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M10.332 1.576a1.34 1.34 0 0 0-1.575.544L6.613 5.49a4.713 4.713 0 0 0-3.116.578h-.002a1.34 1.34 0 0 0-.268 2.106l1.946 1.946-3.527 3.526a.5.5 0 0 0 .708.708l3.526-3.527 1.947 1.946a1.341 1.341 0 0 0 2.104-.268l.001-.002a4.712 4.712 0 0 0 .579-3.116l3.368-2.144a1.339 1.339 0 0 0 .229-2.078l-3.273-3.272a1.34 1.34 0 0 0-.503-.317Zm-.482.926a.34.34 0 0 1 .278.098L13.4 5.872a.341.341 0 0 1-.059.528L9.685 8.727a.5.5 0 0 0-.217.539c.223.928.08 1.907-.4 2.733a.34.34 0 0 1-.533.068l-4.601-4.6v-.001A.34.34 0 0 1 4 6.932a3.713 3.713 0 0 1 2.733-.4.5.5 0 0 0 .54-.217L9.6 2.657a.34.34 0 0 1 .25-.155Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconPin16);
export default Memo;
