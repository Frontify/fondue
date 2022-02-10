import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconHeartCircle24(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            className={customClassName}
            name="IconHeartCircle24"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10Zm5.337-8.892c1.076-2.365 1.06-4.757-.549-5.867-1.577-1.09-3.225-.683-4.788 1.028-1.563-1.71-3.212-2.117-4.789-1.028-1.607 1.11-1.624 3.502-.548 5.867 1.002 2.202 3.66 4.91 5.296 4.963h.073c1.646-.054 4.303-2.76 5.305-4.963Zm-1.36-4.692c.872.602.884 2.29.06 4.1-.801 1.76-3.094 4.096-4.055 4.127-.926-.032-3.218-2.368-4.019-4.126-.824-1.811-.812-3.499.06-4.1 1.029-.711 2.09-.333 3.408 1.402a.714.714 0 0 0 1.138 0c1.318-1.736 2.38-2.113 3.408-1.403ZM20.57 12a8.571 8.571 0 1 1-17.14 0 8.571 8.571 0 0 1 17.142 0Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconHeartCircle24);
export default Memo;
