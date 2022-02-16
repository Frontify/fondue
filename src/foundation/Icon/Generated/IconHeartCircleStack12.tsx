import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconHeartCircleStack12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconHeartCircleStack12"
            {...props}
        >
            <g fill="currentColor" fillRule="evenodd" clipRule="evenodd">
                <path d="M7.132 4.55c.667.449.674 1.392.245 2.31-.396.847-1.432 1.876-2.104 1.897h-.032c-.667-.021-1.704-1.05-2.1-1.896-.429-.919-.422-1.862.245-2.31.62-.417 1.268-.282 1.873.324.605-.606 1.253-.741 1.873-.324Zm-.413.615c.276.186.28.754-.013 1.382-.29.62-1.136 1.46-1.454 1.47-.304-.01-1.15-.85-1.44-1.47-.293-.628-.289-1.196-.013-1.382.343-.23.696-.108 1.168.498a.37.37 0 0 0 .584 0c.473-.606.825-.728 1.168-.498Z" />
                <path d="M7.863 9.721a4.26 4.26 0 1 1-3.691-7.49l-.007-.008a4.26 4.26 0 1 1 3.698 7.499ZM9.07 8.253a3.518 3.518 0 0 0-3.031-6.09 4.26 4.26 0 0 1 3.03 6.09ZM5.259 9.869a3.519 3.519 0 1 0 0-7.037 3.519 3.519 0 0 0 0 7.037Z" />
            </g>
        </svg>
    );
}

const Memo = memo(IconHeartCircleStack12);
export default Memo;
