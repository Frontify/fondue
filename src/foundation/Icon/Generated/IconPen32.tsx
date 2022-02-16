import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";

function IconPen32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconPen32"
            {...props}
        >
            <g fill="currentColor">
                <path d="M18.092 25.955a1 1 0 1 0 0 2h6.796a1 1 0 1 0 0-2h-6.796Z" />
                <path
                    fillRule="evenodd"
                    d="M20.782 4.355a2.333 2.333 0 0 1 3.3 0l3.49 3.49a2.333 2.333 0 0 1 0 3.3L10.776 27.941h-6.79v-6.79L20.782 4.354Zm1.885 1.414a.333.333 0 0 0-.471 0l-16.21 16.21v3.962h3.962l16.21-16.21a.333.333 0 0 0 0-.472l-3.49-3.49Z"
                    clipRule="evenodd"
                />
                <path d="M5.34 23.999h2.666v2.667H5.339v-2.667Z" />
                <path
                    fillRule="evenodd"
                    d="m22.922 13.878-4.82-4.82 1.414-1.415 4.82 4.82-1.414 1.415Zm-7.869 13.077a1 1 0 0 1 1-1h8.834a1 1 0 1 1 0 2h-8.834a1 1 0 0 1-1-1Z"
                    clipRule="evenodd"
                />
            </g>
        </svg>
    );
}

const Memo = memo(IconPen32);
export default Memo;
