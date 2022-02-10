import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconDocumentArrowRight32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconDocumentArrowRight32"
            {...props}
        >
            <g fill="currentColor">
                <path d="M16.608 17.135a1.004 1.004 0 0 0-.03 1.421l1.124 1.212-5.59-.064a1.04 1.04 0 0 0-1.034.991.966.966 0 0 0 .977 1.005l5.576.064-1.253 1.164c-.406.392-.417 1.04-.05 1.42.38.393 1.016.393 1.422 0l3.003-2.854c.205-.197.31-.46.32-.71a.993.993 0 0 0-.279-.72l-2.765-2.91a1.015 1.015 0 0 0-1.42-.019Z" />
                <path
                    fillRule="evenodd"
                    d="M4.667 7.527a4.867 4.867 0 0 1 4.875-4.86h8.083c.667 0 1.596.364 2.086.826l6.745 6.348c.484.456.877 1.364.877 2.036v12.6a4.857 4.857 0 0 1-4.862 4.856H9.529a4.865 4.865 0 0 1-4.862-4.86V7.527Zm12.358 6.422h8.248v10.91a2.428 2.428 0 0 1-2.425 2.423H9.152a2.424 2.424 0 0 1-2.425-2.415V7.133A2.425 2.425 0 0 1 9.17 4.718H16v8.205c0 .57.46 1.026 1.026 1.026Zm8.248-2.288v.236H18.06V4.911l7.212 6.75Z"
                    clipRule="evenodd"
                />
            </g>
        </svg>
    );
}

const Memo = memo(IconDocumentArrowRight32);
export default Memo;
