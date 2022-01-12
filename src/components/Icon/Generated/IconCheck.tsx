import React, { memo } from "react";
import { GeneratedIconProps } from "@components/Icon/IconProps";
import { IconSize, IconSizeMap } from "@components/Icon/IconSize";

function IconCheck(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = [
        "tw-flex tw-items-center tw-justify-center tw-fill-current",
        IconSizeMap[props.size || IconSize.Size16],
    ].join(" ");
    return (
        <svg
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            className={customClassName}
            name="IconCheck"
            {...props}
        >
            <path d="M18.103 5.324a1.115 1.115 0 0 1 1.572 0 1.102 1.102 0 0 1 0 1.564L8.505 19 4.28 14.109a1.102 1.102 0 0 1 .096-1.561 1.115 1.115 0 0 1 1.569.096l2.662 3.129 9.497-10.45Z" />
        </svg>
    );
}

const Memo = memo(IconCheck);
export default Memo;
