import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";

function IconMapPointer12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconMapPointer12"
            {...props}
        >
            <g fill="currentColor" fillRule="evenodd" clipRule="evenodd">
                <path d="M7.75 4.727a1.75 1.75 0 1 1-3.5 0 1.75 1.75 0 0 1 3.5 0Zm-.75 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" />
                <path d="M10.25 4.35c0 3.247-2.555 5.757-3.703 6.721a.842.842 0 0 1-1.094 0C4.305 10.107 1.75 7.597 1.75 4.35 1.75 2.224 3.653.5 6 .5s4.25 1.724 4.25 3.85Zm-.75 0c0 1.424-.561 2.718-1.292 3.796a11.867 11.867 0 0 1-2.143 2.35.1.1 0 0 1-.065.027.1.1 0 0 1-.065-.026 11.867 11.867 0 0 1-2.143-2.35C3.062 7.067 2.5 5.773 2.5 4.35c0-1.644 1.496-3.1 3.5-3.1s3.5 1.456 3.5 3.1Z" />
            </g>
        </svg>
    );
}

const Memo = memo(IconMapPointer12);
export default Memo;
