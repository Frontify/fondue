import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconTypographyBox12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconTypographyBox12"
            {...props}
        >
            <g fill="currentColor">
                <path d="M5.615 4.894v2.743h-.669v.769h2.107v-.77h-.668V4.895h.979v.502h.769V4.125H3.867v1.27h.77v-.5h.978Z" />
                <path
                    fillRule="evenodd"
                    d="M9.846 1.65H2.154C1.517 1.65 1 2.167 1 2.804v6.923c0 .637.517 1.154 1.154 1.154h7.692c.637 0 1.154-.517 1.154-1.154V2.804c0-.637-.517-1.154-1.154-1.154ZM1.77 2.804c0-.213.172-.385.385-.385h7.692c.213 0 .385.172.385.385v6.923a.385.385 0 0 1-.385.384H2.154a.385.385 0 0 1-.385-.384V2.804Z"
                    clipRule="evenodd"
                />
            </g>
        </svg>
    );
}

const Memo = memo(IconTypographyBox12);
export default Memo;
