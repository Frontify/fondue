import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconLightning32Filled(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconLightning32Filled"
            {...props}
        >
            <path
                fill="currentColor"
                d="M6.111 18.544h8.47l-3.93 9.72a.778.778 0 0 0 1.25.86l15.477-14.406a.778.778 0 0 0-.53-1.348h-9.042l3.716-9.646a.778.778 0 0 0-1.269-.836L5.568 17.209a.778.778 0 0 0 .543 1.335Z"
            />
        </svg>
    );
}

const Memo = memo(IconLightning32Filled);
export default Memo;
