import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconCards(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = [
        "tw-flex tw-items-center tw-justify-center tw-fill-current",
        IconSizeMap[props.size || IconSize.Size16],
    ].join(" ");
    return (
        <svg
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            className={customClassName}
            name="IconCards"
            {...props}
        >
            <path d="M18.7 8.25V4.5a.833.833 0 0 0-.833-.833H6.2a.833.833 0 0 0-.833.833v3.75H18.7Zm0 1.667H5.367V19.5c0 .46.373.833.833.833h11.667c.46 0 .833-.373.833-.833V9.917ZM6.2 2h11.667a2.5 2.5 0 0 1 2.5 2.5v15a2.5 2.5 0 0 1-2.5 2.5H6.2a2.5 2.5 0 0 1-2.5-2.5v-15A2.5 2.5 0 0 1 6.2 2Zm1.667 11.25a.833.833 0 1 1 0-1.667H11.2a.833.833 0 0 1 0 1.667H7.867Zm0 3.333a.833.833 0 1 1 0-1.666h7.5a.833.833 0 1 1 0 1.666h-7.5Z" />
        </svg>
    );
}

const Memo = memo(IconCards);
export default Memo;
