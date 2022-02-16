import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconTypographyCase16(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconTypographyCase16"
            {...props}
        >
            <g fill="currentColor">
                <path d="M7.524 10.628V7.26H6.31v.616h-.95v-1.56h5.281v1.56h-.952V7.26H8.476v3.367h.828v.944H6.695v-.944h.829Z" />
                <path
                    fillRule="evenodd"
                    d="M6.571 2.333h2.857c.526 0 .953.422.953.942v.947h3.333c.526 0 .952.423.952.945v7.555a.948.948 0 0 1-.952.945H2.285a.948.948 0 0 1-.952-.945V5.167c0-.522.426-.945.952-.945H5.62v-.947c0-.52.426-.942.952-.942Zm-4.286 10.39V5.166h11.429v7.555H2.285Zm4.286-8.5v-.945h2.857v.944H6.571Z"
                    clipRule="evenodd"
                />
            </g>
        </svg>
    );
}

const Memo = memo(IconTypographyCase16);
export default Memo;
