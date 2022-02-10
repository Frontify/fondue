import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconTypographyCase20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconTypographyCase20"
            {...props}
        >
            <g fill="currentColor">
                <path d="M9.405 13.285V9.076H7.889v.77H6.7v-1.95h6.6v1.95h-1.19v-.77h-1.516v4.21h1.035v1.18H8.37v-1.18h1.035Z" />
                <path
                    fillRule="evenodd"
                    d="M8.214 2.917h3.572c.657 0 1.19.527 1.19 1.178v1.183h4.167c.657 0 1.19.528 1.19 1.18v9.445c0 .652-.533 1.18-1.19 1.18H2.857c-.658 0-1.19-.528-1.19-1.18V6.458c0-.652.532-1.18 1.19-1.18h4.167V4.095c0-.65.533-1.178 1.19-1.178ZM2.857 15.903V6.458h14.286v9.445H2.857ZM8.214 5.278v-1.18h3.572v1.18H8.214Z"
                    clipRule="evenodd"
                />
            </g>
        </svg>
    );
}

const Memo = memo(IconTypographyCase20);
export default Memo;
