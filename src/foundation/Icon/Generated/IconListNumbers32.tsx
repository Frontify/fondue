import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconListNumbers32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconListNumbers32"
            {...props}
        >
            <g fill="currentColor">
                <path
                    fillRule="evenodd"
                    d="M28 7.667a1 1 0 0 1-1 1H14.689a1 1 0 0 1 0-2h12.31a1 1 0 0 1 1 1ZM13.69 24.333a1 1 0 0 1 1-1h9.686a1 1 0 1 1 0 2h-9.687a1 1 0 0 1-1-1ZM25.376 13.19a1 1 0 0 1-1 1h-9.687a1 1 0 1 1 0-2h9.687a1 1 0 0 1 1 1ZM28 18.738a1 1 0 0 1-1 1H14.689a1 1 0 0 1 0-2h12.31a1 1 0 0 1 1 1ZM7.133 19.977H5.388v-.115c0-1.204.784-2.529 2.601-2.529 1.595 0 2.623.974 2.623 2.252 0 1.06-.58 1.713-1.109 2.308l-.169.192L8 23.628v.087h2.612v1.618H5.497v-1.267l2.518-2.828c.37-.409.774-.864.774-1.445 0-.473-.353-.864-.836-.864-.514 0-.826.432-.826.916l.003.08.003.052Z"
                    clipRule="evenodd"
                />
                <path d="M7.246 14.667h1.82v-8h-1.82L5.6 7.979v1.823L7.159 8.56h.087v6.107Z" />
            </g>
        </svg>
    );
}

const Memo = memo(IconListNumbers32);
export default Memo;
