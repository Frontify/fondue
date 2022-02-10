import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconPlay16Filled(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconPlay16Filled"
            {...props}
        >
            <path
                fill="currentColor"
                d="M12.904 7.338a.667.667 0 0 1 0 1.158l-8.49 4.85a.667.667 0 0 1-.997-.578V3.066c0-.512.552-.833.997-.58l8.49 4.852Z"
            />
        </svg>
    );
}

const Memo = memo(IconPlay16Filled);
export default Memo;
