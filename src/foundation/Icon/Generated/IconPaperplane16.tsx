import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconPaperplane16(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconPaperplane16"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="m4.973 10.563-3.35-1.806a.562.562 0 0 1-.016-.974l10.914-6.376a.543.543 0 0 1 .813.483v12.22a.544.544 0 0 1-.796.492l-3.742-2.004-2.962 1.977a.543.543 0 0 1-.84-.461l-.02-3.552Zm.42-1.03L3.004 8.245l7.317-4.275-4.93 5.561Zm6.854-5.023-2.73 7.22 2.73 1.462V4.51Zm-3.813 7.004-2.36 1.574-.015-2.653 4.852-5.473-2.477 6.552Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconPaperplane16);
export default Memo;
