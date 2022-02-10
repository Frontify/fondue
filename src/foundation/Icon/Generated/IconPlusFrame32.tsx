import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconPlusFrame32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconPlusFrame32"
            {...props}
        >
            <g fill="currentColor">
                <path d="M17.212 21.915a1.212 1.212 0 0 1-2.424 0v-2.424h-2.425a1.212 1.212 0 0 1 0-2.424h2.425v-2.425a1.212 1.212 0 1 1 2.424 0v2.425h2.424a1.212 1.212 0 1 1 0 2.424h-2.424v2.424Z" />
                <path
                    fillRule="evenodd"
                    d="M5.743 3.733h20.513c1.7 0 3.077 1.378 3.077 3.077v18.462c0 1.7-1.377 3.077-3.077 3.077H5.743a3.077 3.077 0 0 1-3.077-3.077V6.81c0-1.7 1.378-3.077 3.077-3.077Zm-1.025 7.18v14.359c0 .566.459 1.025 1.025 1.025h20.513c.567 0 1.026-.459 1.026-1.025v-14.36H4.718Zm22.564-2.051H4.718V6.81c0-.566.459-1.025 1.025-1.025h20.513c.567 0 1.026.459 1.026 1.025v2.052Z"
                    clipRule="evenodd"
                />
            </g>
        </svg>
    );
}

const Memo = memo(IconPlusFrame32);
export default Memo;
