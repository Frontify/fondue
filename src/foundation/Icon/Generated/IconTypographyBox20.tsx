import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconTypographyBox20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconTypographyBox20"
            {...props}
        >
            <g fill="currentColor">
                <path d="M9.359 8.157v4.57H8.244v1.283h3.512v-1.282H10.64V8.157h1.632v.836h1.282V6.875h-7.11v2.118h1.282v-.836H9.36Z" />
                <path
                    fillRule="evenodd"
                    d="M16.41 2.75H3.59a1.923 1.923 0 0 0-1.923 1.923v11.539c0 1.062.86 1.923 1.923 1.923h12.82a1.923 1.923 0 0 0 1.923-1.924V4.674A1.923 1.923 0 0 0 16.41 2.75ZM2.95 4.673a.64.64 0 0 1 .64-.641h12.82c.354 0 .641.287.641.641v11.539a.641.641 0 0 1-.64.64H3.59a.641.641 0 0 1-.641-.64V4.673Z"
                    clipRule="evenodd"
                />
            </g>
        </svg>
    );
}

const Memo = memo(IconTypographyBox20);
export default Memo;
