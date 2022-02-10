import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconPerson16(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconPerson16"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M10.64 8.665a5.566 5.566 0 0 1 2.9 5.46H2.46a5.567 5.567 0 0 1 2.938-5.48 3.889 3.889 0 0 1-1.26-2.872A3.895 3.895 0 0 1 8.03 1.876a3.895 3.895 0 0 1 3.893 3.897 3.89 3.89 0 0 1-1.283 2.892Zm-1.126.712a3.879 3.879 0 0 1-1.483.293 3.878 3.878 0 0 1-1.512-.304 4.459 4.459 0 0 0-2.938 3.645h8.838a4.459 4.459 0 0 0-2.905-3.634Zm1.298-3.604A2.782 2.782 0 0 1 8.03 8.557a2.782 2.782 0 0 1-2.78-2.784 2.782 2.782 0 0 1 2.78-2.784 2.782 2.782 0 0 1 2.782 2.784Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconPerson16);
export default Memo;
