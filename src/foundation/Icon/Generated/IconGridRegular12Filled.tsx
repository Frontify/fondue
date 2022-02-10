import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconGridRegular12Filled(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconGridRegular12Filled"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M2.3 6.5a.8.8 0 0 0-.8.8v2.4a.8.8 0 0 0 .8.8h2.4a.8.8 0 0 0 .8-.8V7.3a.8.8 0 0 0-.8-.8H2.3Zm5 0a.8.8 0 0 0-.8.8v2.4a.8.8 0 0 0 .8.8h2.4a.8.8 0 0 0 .8-.8V7.3a.8.8 0 0 0-.8-.8H7.3Zm0-5a.8.8 0 0 0-.8.8v2.4a.8.8 0 0 0 .8.8h2.4a.8.8 0 0 0 .8-.8V2.3a.8.8 0 0 0-.8-.8H7.3Zm-5 0a.8.8 0 0 0-.8.8v2.4a.8.8 0 0 0 .8.8h2.4a.8.8 0 0 0 .8-.8V2.3a.8.8 0 0 0-.8-.8H2.3Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconGridRegular12Filled);
export default Memo;
