import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconDoAndDontBox12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconDoAndDontBox12"
            {...props}
        >
            <g fill="currentColor">
                <path d="M9.647 7.796a.33.33 0 0 0-.466.008l-.923.951-.242-.273a.33.33 0 0 0-.494.437l.479.54a.33.33 0 0 0 .483.01l1.17-1.207a.33.33 0 0 0-.007-.466ZM2.745 2.745a.33.33 0 0 0 0 .466l.326.326-.326.327a.33.33 0 0 0 .466.466l.327-.326.326.326a.33.33 0 1 0 .466-.466l-.326-.327.326-.326a.33.33 0 0 0-.466-.466l-.326.326-.327-.326a.33.33 0 0 0-.466 0Z" />
                <path
                    fillRule="evenodd"
                    d="M5.564 2.154a2.473 2.473 0 1 0-3.73 3.17v3.56c0 .266.094.493.282.68a.926.926 0 0 0 .68.282h3.64a2.473 2.473 0 1 0 3.73-3.17v-3.56a.926.926 0 0 0-.282-.68.926.926 0 0 0-.68-.282h-3.64ZM2.527 5.758a2.473 2.473 0 0 0 3.338-2.912h3.339c.082 0 .132.021.19.08a.237.237 0 0 1 .08.19v3.126a2.473 2.473 0 0 0-3.338 2.912h-3.34a.237.237 0 0 1-.19-.08.237.237 0 0 1-.08-.19V5.759Zm6 4.583a1.813 1.813 0 1 0 0-3.627 1.813 1.813 0 0 0 0 3.627ZM3.473 5.286a1.813 1.813 0 1 0 0-3.627 1.813 1.813 0 0 0 0 3.627Z"
                    clipRule="evenodd"
                />
            </g>
        </svg>
    );
}

const Memo = memo(IconDoAndDontBox12);
export default Memo;
