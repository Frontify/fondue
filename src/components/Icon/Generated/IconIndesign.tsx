import React, { memo } from "react";
import { GeneratedIconProps } from "@components/Icon/IconProps";
import { IconSize, IconSizeMap } from "@components/Icon/IconSize";

function IconIndesign(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
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
            name="IconIndesign"
            {...props}
        >
            <path d="M18 3.25A2.75 2.75 0 0 1 20.75 6v12A2.75 2.75 0 0 1 18 20.75H6A2.75 2.75 0 0 1 3.25 18V6A2.75 2.75 0 0 1 6 3.25Zm0 1.5H6c-.69 0-1.25.56-1.25 1.25v12c0 .69.56 1.25 1.25 1.25h12c.69 0 1.25-.56 1.25-1.25V6c0-.69-.56-1.25-1.25-1.25ZM16.242 8v7.832h-1.298v-.76h-.033c-.347.67-1.052.928-1.69.928-1.42 0-2.484-1.141-2.484-2.83 0-1.701 1.108-2.843 2.518-2.843.772 0 1.331.37 1.577.828V8h1.41ZM9.235 8v7.832H7.758V8h1.477Zm4.288 3.57c-.85 0-1.365.682-1.365 1.6 0 .917.526 1.6 1.365 1.6.85 0 1.354-.672 1.354-1.6 0-.94-.503-1.6-1.354-1.6Z" />
        </svg>
    );
}

const Memo = memo(IconIndesign);
export default Memo;
