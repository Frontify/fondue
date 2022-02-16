import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconLayers20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconLayers20"
            {...props}
        >
            <g fill="currentColor">
                <path
                    fillRule="evenodd"
                    d="m17.43 6.35-7.094-3.767a.708.708 0 0 0-.666 0L2.573 6.348a.754.754 0 0 0 .009 1.327l7.11 3.645a.708.708 0 0 0 .649 0l7.081-3.644a.754.754 0 0 0 .008-1.327Zm-7.414 3.472-5.51-2.824 5.497-2.916L15.5 7l-5.484 2.822Z"
                    clipRule="evenodd"
                />
                <path d="M2.066 10.514a.754.754 0 0 1-.322-1 .716.716 0 0 1 .973-.33L10 12.946l7.283-3.762a.716.716 0 0 1 .973.33.754.754 0 0 1-.322 1l-7.6 3.926a.718.718 0 0 1-.624.02.655.655 0 0 1-.043-.02l-7.601-3.926Z" />
                <path d="M2.066 13.49a.754.754 0 0 1-.322-.998.716.716 0 0 1 .973-.33L10 15.921l7.283-3.76a.716.716 0 0 1 .973.33.754.754 0 0 1-.322.999l-7.6 3.925a.718.718 0 0 1-.624.022.709.709 0 0 1-.043-.021L2.066 13.49Z" />
            </g>
        </svg>
    );
}

const Memo = memo(IconLayers20);
export default Memo;
