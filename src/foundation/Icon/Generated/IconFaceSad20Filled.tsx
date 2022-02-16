import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";

function IconFaceSad20Filled(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconFaceSad20Filled"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M6.753 17.682a8.167 8.167 0 0 0 3.247.651c1.15 0 2.233-.217 3.247-.65A8.362 8.362 0 0 0 15.9 15.9a8.362 8.362 0 0 0 1.782-2.653A8.168 8.168 0 0 0 18.333 10c0-1.15-.217-2.233-.65-3.247A8.362 8.362 0 0 0 15.9 4.1a8.362 8.362 0 0 0-2.653-1.782A8.168 8.168 0 0 0 10 1.667c-1.15 0-2.232.217-3.247.65A8.362 8.362 0 0 0 4.1 4.1a8.362 8.362 0 0 0-1.782 2.653A8.168 8.168 0 0 0 1.667 10c0 1.15.217 2.232.65 3.247A8.361 8.361 0 0 0 4.1 15.9a8.362 8.362 0 0 0 2.653 1.782ZM8.485 7.348a1.136 1.136 0 1 1-2.273 0 1.136 1.136 0 0 1 2.273 0Zm4.167 1.137a1.136 1.136 0 1 0 0-2.273 1.136 1.136 0 0 0 0 2.273Zm-6.779 5.601a.758.758 0 0 1-.338-1.016c.887-1.775 2.414-2.691 4.465-2.691 2.051 0 3.578.916 4.466 2.691a.758.758 0 0 1-1.356.678c-.627-1.255-1.625-1.854-3.11-1.854-1.484 0-2.483.599-3.11 1.854a.758.758 0 0 1-1.017.338Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconFaceSad20Filled);
export default Memo;
