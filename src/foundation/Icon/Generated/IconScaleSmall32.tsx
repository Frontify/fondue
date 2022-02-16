import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";

function IconScaleSmall32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconScaleSmall32"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M27.282 10.4H4.718a2.051 2.051 0 0 0-2.051 2.051v7.18a2.05 2.05 0 0 0 2.051 2.051h22.564a2.051 2.051 0 0 0 2.051-2.051v-7.18a2.051 2.051 0 0 0-2.05-2.05ZM4.718 19.63v-7.179h9.23v7.18h-9.23Zm11.282 0v-7.179h6.154v7.18H16Zm8.205 0h3.077v-7.179h-3.077v7.18Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconScaleSmall32);
export default Memo;
