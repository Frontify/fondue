import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconFunnel16(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconFunnel16"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M13.396 2H2.755A1.333 1.333 0 0 0 1.64 4.066L5.52 9.97a2 2 0 0 1 .328 1.098v2.496a1.333 1.333 0 0 0 2.018 1.144l1.756-1.05c.397-.237.642-.663.649-1.125l.021-1.48a2 2 0 0 1 .329-1.07l3.889-5.917A1.333 1.333 0 0 0 13.396 2ZM6.635 9.238l-3.88-5.905h10.641L9.508 9.251a3.333 3.333 0 0 0-.548 1.782l-.021 1.48-1.756 1.05v-2.495c0-.65-.19-1.287-.548-1.83Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconFunnel16);
export default Memo;
