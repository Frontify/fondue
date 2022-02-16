import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";

function IconFlag12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconFlag12"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M2.625 1.575a.375.375 0 1 1 .75 0v.3H9.75c.312 0 .488.36.296.605L8.476 4.5l1.57 2.02a.375.375 0 0 1-.296.605H3.375v3.3a.375.375 0 0 1-.75 0v-8.85Zm.75 4.8h5.608L7.704 4.73a.375.375 0 0 1 0-.46l1.28-1.645h-5.61v3.75Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconFlag12);
export default Memo;
