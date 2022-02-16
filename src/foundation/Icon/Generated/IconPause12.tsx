import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";

function IconPause12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconPause12"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M5.071 2c.237 0 .429.199.429.444v7.112a.437.437 0 0 1-.429.444H2.93a.437.437 0 0 1-.429-.444V2.444A.436.436 0 0 1 2.929 2H5.07Zm-.171.622H3.1v6.756h1.8V2.622ZM9.071 2c.237 0 .429.199.429.444v7.112a.437.437 0 0 1-.429.444H6.93a.437.437 0 0 1-.429-.444V2.444A.436.436 0 0 1 6.929 2H9.07Zm-.171.622H7.1v6.756h1.8V2.622Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconPause12);
export default Memo;
