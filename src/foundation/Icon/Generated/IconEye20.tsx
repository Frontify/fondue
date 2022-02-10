import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconEye20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconEye20"
            {...props}
        >
            <g fill="currentColor">
                <path d="M13.333 10a3.333 3.333 0 1 1-6.532-.94c.101-.345.506-.46.817-.28.289.166.387.53.33.859A2.083 2.083 0 1 0 9.39 8.007c-.23.07-.484.074-.692-.047-.42-.242-.466-.829-.02-1.021A3.333 3.333 0 0 1 13.333 10Z" />
                <path
                    fillRule="evenodd"
                    d="M18.938 9.394c.183.383.183.829 0 1.212A9.897 9.897 0 0 1 10 16.25a9.897 9.897 0 0 1-8.939-5.644 1.408 1.408 0 0 1 0-1.212A9.897 9.897 0 0 1 10 3.75a9.897 9.897 0 0 1 8.938 5.644ZM2.517 10.688a1.37 1.37 0 0 1 0-1.376A8.643 8.643 0 0 1 10 5a8.643 8.643 0 0 1 7.483 4.312c.247.426.247.95 0 1.376A8.643 8.643 0 0 1 10 15a8.643 8.643 0 0 1-7.483-4.312Z"
                    clipRule="evenodd"
                />
            </g>
        </svg>
    );
}

const Memo = memo(IconEye20);
export default Memo;
