import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";

function IconPerson24(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            className={customClassName}
            name="IconPerson24"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M15.961 12.997a8.35 8.35 0 0 1 4.349 8.19H3.69a8.35 8.35 0 0 1 4.407-8.22 5.833 5.833 0 0 1-1.891-4.308 5.843 5.843 0 0 1 5.84-5.845 5.843 5.843 0 0 1 5.84 5.845 5.835 5.835 0 0 1-1.925 4.338Zm-1.69 1.069a5.817 5.817 0 0 1-2.225.44c-.804 0-1.57-.163-2.267-.458a6.688 6.688 0 0 0-4.408 5.468h13.258a6.688 6.688 0 0 0-4.358-5.45Zm1.947-5.407a4.174 4.174 0 0 1-4.172 4.176 4.174 4.174 0 0 1-4.172-4.176 4.174 4.174 0 0 1 4.172-4.175 4.174 4.174 0 0 1 4.172 4.175Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconPerson24);
export default Memo;
