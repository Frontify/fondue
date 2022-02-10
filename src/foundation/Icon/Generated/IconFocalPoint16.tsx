import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconFocalPoint16(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconFocalPoint16"
            {...props}
        >
            <path
                fill="currentColor"
                d="M3.029 2.999h2.833a.5.5 0 0 0 0-1H2.53a.5.5 0 0 0-.5.5v3.333a.5.5 0 0 0 1 0V2.999Zm7.109 0h2.833v2.833a.5.5 0 1 0 1 0V2.499a.5.5 0 0 0-.5-.5h-3.333a.5.5 0 0 0 0 1Zm-7.102 9.962H5.87a.5.5 0 0 1 0 1H2.536a.5.5 0 0 1-.5-.5v-3.333a.5.5 0 1 1 1 0v2.833Zm9.943 0h-2.833a.5.5 0 0 0 0 1h3.333a.5.5 0 0 0 .5-.5v-3.333a.5.5 0 1 0-1 0v2.833ZM8.667 8a.667.667 0 1 1-1.334 0 .667.667 0 0 1 1.334 0Z"
            />
        </svg>
    );
}

const Memo = memo(IconFocalPoint16);
export default Memo;
