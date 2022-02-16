import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconFunnel20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconFunnel20"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M16.745 2.5H3.444A1.667 1.667 0 0 0 2.05 5.082l4.85 7.38a2.5 2.5 0 0 1 .41 1.373v3.12a1.667 1.667 0 0 0 2.523 1.43l2.195-1.313a1.66 1.66 0 0 0 .81-1.406l.028-1.85a2.5 2.5 0 0 1 .41-1.337l4.861-7.397A1.667 1.667 0 0 0 16.745 2.5Zm-8.451 9.047-4.85-7.38h13.302l-4.861 7.396a4.167 4.167 0 0 0-.684 2.228l-.028 1.851-2.195 1.313v-3.12a4.17 4.17 0 0 0-.684-2.288Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconFunnel20);
export default Memo;
