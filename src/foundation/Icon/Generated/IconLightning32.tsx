import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconLightning32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconLightning32"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M27.057 13.407c-.32-.795-.912-1.193-1.777-1.193h-5.292l2.646-6.927c.363-.95.121-1.703-.726-2.256-.848-.554-1.635-.476-2.361.233L5.927 16.546c-.605.588-.747 1.276-.428 2.063.32.786.904 1.18 1.752 1.18h4.799l-2.802 6.874c-.363.952-.13 1.713.7 2.283.83.571 1.617.51 2.361-.181l14.268-13.283c.64-.587.8-1.28.48-2.075Zm-12.206 4.488h-7.6L20.87 4.613l-3.658 9.495h8.068L11.012 27.39l3.84-9.495Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconLightning32);
export default Memo;
