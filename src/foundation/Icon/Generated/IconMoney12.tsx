import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";

function IconMoney12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconMoney12"
            {...props}
        >
            <path
                fill="currentColor"
                d="M6.488 11V9.848C7.69 9.66 8.5 8.763 8.5 7.545c0-2.857-3.517-1.683-3.517-3.322 0-.587.374-.897.986-.897.633 0 1.068.365 1.172.908l1.245-.388c-.197-.908-.892-1.54-1.898-1.694V1h-1.09v1.174c-1.089.221-1.794 1.04-1.794 2.204 0 2.857 3.537 1.672 3.537 3.31 0 .621-.404.998-1.068.998-.695 0-1.287-.388-1.36-.997L3.5 8.02c.207 1.008.902 1.628 1.898 1.805V11h1.09Z"
            />
        </svg>
    );
}

const Memo = memo(IconMoney12);
export default Memo;
