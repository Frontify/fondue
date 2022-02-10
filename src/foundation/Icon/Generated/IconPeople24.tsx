import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconPeople24(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            className={customClassName}
            name="IconPeople24"
            {...props}
        >
            <g fill="currentColor">
                <path d="M17.065 17.172h4.522a6.895 6.895 0 0 0-3.591-6.763 4.817 4.817 0 0 0 1.59-3.581A4.825 4.825 0 0 0 14.761 2a4.826 4.826 0 0 0-4.625 3.453 5.9 5.9 0 0 1 1.378.22 3.447 3.447 0 0 1 6.692 1.155 3.45 3.45 0 0 1-2.368 3.276c.126.438.209.896.245 1.368.176-.05.348-.11.515-.18a5.523 5.523 0 0 1 3.6 4.501h-4.134c.379.423.714.885 1 1.38Z" />
                <path
                    fillRule="evenodd"
                    d="M3 21.31c0 .233.012.463.034.69h13.725a6.895 6.895 0 0 0-3.591-6.763 4.817 4.817 0 0 0 1.59-3.582 4.825 4.825 0 0 0-4.824-4.827 4.825 4.825 0 0 0-4.823 4.827c0 1.408.602 2.675 1.562 3.557A6.896 6.896 0 0 0 3 21.31Zm6.934-4.827a4.804 4.804 0 0 1-1.872-.378 5.523 5.523 0 0 0-3.64 4.516h10.95a5.523 5.523 0 0 0-3.6-4.501 4.805 4.805 0 0 1-1.838.363Zm3.446-4.828a3.447 3.447 0 0 1-3.446 3.448 3.447 3.447 0 0 1-3.445-3.448 3.447 3.447 0 0 1 3.445-3.448 3.447 3.447 0 0 1 3.446 3.448Z"
                    clipRule="evenodd"
                />
            </g>
        </svg>
    );
}

const Memo = memo(IconPeople24);
export default Memo;
