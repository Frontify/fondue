import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconStackHorizontal24(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            className={customClassName}
            name="IconStackHorizontal24"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M13.35 3.25c.635 0 1.15.515 1.15 1.15v15.2a1.15 1.15 0 0 1-1.15 1.15h-2.7A1.15 1.15 0 0 1 9.5 19.6V4.4c0-.635.515-1.15 1.15-1.15h2.7ZM13 4.75h-2v14.5h2V4.75Zm-6.14-1.5c.635 0 1.15.515 1.15 1.15v15.2a1.15 1.15 0 0 1-1.15 1.15h-2.7a1.15 1.15 0 0 1-1.15-1.15V4.4c0-.635.515-1.15 1.15-1.15h2.7Zm-.35 1.5h-2v14.5h2V4.75Zm13.33-1.5c.635 0 1.15.515 1.15 1.15v15.2a1.15 1.15 0 0 1-1.15 1.15h-2.7a1.15 1.15 0 0 1-1.15-1.15V4.4c0-.635.515-1.15 1.15-1.15h2.7Zm-.35 1.5h-2v14.5h2V4.75Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconStackHorizontal24);
export default Memo;
