import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconPen20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconPen20"
            {...props}
        >
            <g fill="currentColor">
                <path d="M11.307 16.222a.625.625 0 0 0 0 1.25h4.248a.625.625 0 1 0 0-1.25h-4.248Z" />
                <path
                    fillRule="evenodd"
                    d="M12.989 2.722a1.457 1.457 0 0 1 2.062 0l2.182 2.181c.57.57.57 1.493 0 2.063L6.735 17.463H2.491v-4.244L12.988 2.722Zm1.178.883a.208.208 0 0 0-.295 0L3.742 13.737v2.476h2.475L16.35 6.082a.208.208 0 0 0 0-.295l-2.182-2.182Z"
                    clipRule="evenodd"
                />
                <path d="M3.337 15h1.667v1.666H3.337v-1.667Z" />
                <path
                    fillRule="evenodd"
                    d="m14.326 8.673-3.012-3.012.884-.884L15.21 7.79l-.884.883Zm-4.918 8.174c0-.345.28-.625.625-.625h5.522a.625.625 0 1 1 0 1.25h-5.522a.625.625 0 0 1-.625-.625Z"
                    clipRule="evenodd"
                />
            </g>
        </svg>
    );
}

const Memo = memo(IconPen20);
export default Memo;
