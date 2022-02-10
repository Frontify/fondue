import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconEyeOff12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconEyeOff12"
            {...props}
        >
            <g fill="currentColor">
                <path
                    fillRule="evenodd"
                    d="M2.11 9.889a.375.375 0 0 1 0-.53L9.36 2.11a.375.375 0 0 1 .53.53l-.601.602a5.963 5.963 0 0 1 2.075 2.393c.11.23.11.497 0 .727a5.938 5.938 0 0 1-7.978 2.782l-.744.744a.375.375 0 0 1-.53 0Zm5.544-5.013 1.091-1.091a5.214 5.214 0 0 1 1.745 1.802.822.822 0 0 1 0 .826 5.186 5.186 0 0 1-6.54 2.166l.926-.925a2 2 0 0 0 2.779-2.779Zm-.546.546L5.422 7.108a1.25 1.25 0 0 0 1.687-1.687Z"
                    clipRule="evenodd"
                />
                <path d="M7.257 3.153A5.199 5.199 0 0 0 1.51 5.587a.822.822 0 0 0 0 .826 5.2 5.2 0 0 0 1.133 1.354L2.11 8.3A5.958 5.958 0 0 1 .637 6.363a.845.845 0 0 1 0-.727 5.938 5.938 0 0 1 7.225-3.088l-.605.605Z" />
            </g>
        </svg>
    );
}

const Memo = memo(IconEyeOff12);
export default Memo;
