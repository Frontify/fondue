import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconDocumentCheck32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconDocumentCheck32"
            {...props}
        >
            <g fill="currentColor">
                <path d="M11.78 19.786a1.221 1.221 0 0 1 1.718.169l1.151 1.402 3.933-3.933a1.221 1.221 0 1 1 1.727 1.727l-4.885 4.885a1.22 1.22 0 0 1-1.807-.088l-2.006-2.443a1.221 1.221 0 0 1 .168-1.719Z" />
                <path
                    fillRule="evenodd"
                    d="M4.667 7.527a4.867 4.867 0 0 1 4.875-4.86h8.083c.667 0 1.596.364 2.086.826l6.745 6.348c.484.456.877 1.364.877 2.036v12.6a4.857 4.857 0 0 1-4.862 4.856H9.529a4.865 4.865 0 0 1-4.862-4.86V7.527Zm12.358 6.422h8.248v10.91a2.428 2.428 0 0 1-2.425 2.423H9.152a2.424 2.424 0 0 1-2.425-2.415V7.133A2.425 2.425 0 0 1 9.17 4.718H16v8.205c0 .57.46 1.026 1.026 1.026Zm8.248-2.288v.236H18.06V4.911l7.212 6.75Z"
                    clipRule="evenodd"
                />
            </g>
        </svg>
    );
}

const Memo = memo(IconDocumentCheck32);
export default Memo;
