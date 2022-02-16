import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";

function IconPerson32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconPerson32"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M21.282 17.33a11.133 11.133 0 0 1 5.798 10.918H4.92a11.133 11.133 0 0 1 5.876-10.96 7.777 7.777 0 0 1-2.522-5.742c0-4.305 3.487-7.794 7.787-7.794 4.301 0 7.787 3.49 7.787 7.794a7.78 7.78 0 0 1-2.566 5.784Zm-2.254 1.425a7.758 7.758 0 0 1-2.967.585 7.757 7.757 0 0 1-3.023-.609 8.917 8.917 0 0 0-5.877 7.29H24.84a8.918 8.918 0 0 0-5.81-7.266Zm2.596-7.21a5.565 5.565 0 0 1-5.563 5.568 5.565 5.565 0 0 1-5.562-5.567 5.565 5.565 0 0 1 5.562-5.568 5.565 5.565 0 0 1 5.563 5.568Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconPerson32);
export default Memo;
