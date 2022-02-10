import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconStackVertical24(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            className={customClassName}
            name="IconStackVertical24"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M20.75 13.35a1.15 1.15 0 0 1-1.15 1.15H4.4a1.15 1.15 0 0 1-1.15-1.15v-2.7c0-.635.515-1.15 1.15-1.15h15.2c.635 0 1.15.515 1.15 1.15v2.7Zm-1.5-.35v-2H4.75v2h14.5Zm1.5-6.14a1.15 1.15 0 0 1-1.15 1.15H4.4a1.15 1.15 0 0 1-1.15-1.15v-2.7c0-.635.515-1.15 1.15-1.15h15.2c.635 0 1.15.515 1.15 1.15v2.7Zm-1.5-.35v-2H4.75v2h14.5Zm1.5 13.33a1.15 1.15 0 0 1-1.15 1.15H4.4a1.15 1.15 0 0 1-1.15-1.15v-2.7c0-.635.515-1.15 1.15-1.15h15.2c.635 0 1.15.515 1.15 1.15v2.7Zm-1.5-.35v-2H4.75v2h14.5Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconStackVertical24);
export default Memo;
