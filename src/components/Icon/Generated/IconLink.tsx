import React, { memo } from "react";
import { GeneratedIconProps } from "@components/Icon/IconProps";
import { IconSize, IconSizeMap } from "@components/Icon/IconSize";

function IconLink(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
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
            name="IconLink"
            {...props}
        >
            <path d="M9.368 6.7c.223 0 .443.014.658.04a6.348 6.348 0 0 0-1.918 2.065h-.845a3.158 3.158 0 0 0 0 6.316h2.105a3.158 3.158 0 0 0 3.158-3.158c0-.632-.202-1.152-.42-1.386.208-.481.888-.722 2.039-.722.38.54.487 1.5.487 2.108a5.263 5.263 0 0 1-5.264 5.263H7.263a5.263 5.263 0 0 1 0-10.526h2.105Zm7.369 0a5.263 5.263 0 0 1 0 10.526h-2.105c-.223 0-.443-.014-.658-.04a6.348 6.348 0 0 0 1.918-2.065h.845a3.158 3.158 0 1 0 0-6.316h-2.105a3.158 3.158 0 0 0-3.158 3.158c0 .633.202 1.152.42 1.386-.208.482-.888.722-2.039.722-.38-.54-.487-1.5-.487-2.108A5.263 5.263 0 0 1 14.632 6.7h2.105Z" />
        </svg>
    );
}

const Memo = memo(IconLink);
export default Memo;
