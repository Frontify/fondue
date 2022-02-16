import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";

function IconFaceNeutral20Filled(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconFaceNeutral20Filled"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M6.753 17.682a8.167 8.167 0 0 0 3.247.651c1.15 0 2.233-.217 3.247-.65A8.362 8.362 0 0 0 15.9 15.9a8.362 8.362 0 0 0 1.782-2.653A8.168 8.168 0 0 0 18.333 10c0-1.15-.217-2.233-.65-3.247A8.362 8.362 0 0 0 15.9 4.1a8.362 8.362 0 0 0-2.653-1.782A8.168 8.168 0 0 0 10 1.667c-1.15 0-2.232.217-3.247.65A8.362 8.362 0 0 0 4.1 4.1a8.362 8.362 0 0 0-1.782 2.653A8.168 8.168 0 0 0 1.667 10c0 1.15.217 2.232.65 3.247A8.361 8.361 0 0 0 4.1 15.9a8.362 8.362 0 0 0 2.653 1.782Zm1.732-9.576a1.136 1.136 0 1 1-2.273 0 1.136 1.136 0 0 1 2.273 0Zm4.167 1.136a1.136 1.136 0 1 0 0-2.273 1.136 1.136 0 0 0 0 2.273Zm-7.197 3.41c0 .418.339.757.757.757h7.576a.758.758 0 1 0 0-1.515H6.212a.758.758 0 0 0-.757.757Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconFaceNeutral20Filled);
export default Memo;
