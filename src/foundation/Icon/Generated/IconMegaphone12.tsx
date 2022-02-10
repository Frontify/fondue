import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconMegaphone12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconMegaphone12"
            {...props}
        >
            <g fill="currentColor">
                <path
                    fillRule="evenodd"
                    d="M8.038 1.139 5.583 2.757H2.25c-.69 0-1.25.554-1.25 1.237v2.06c0 .434.226.815.567 1.036l.867 3.594A.416.416 0 0 0 2.84 11h1.078c.23 0 .416-.184.416-.412V7.29h1.25l2.455 1.618a.84.84 0 0 0 .462.139.83.83 0 0 0 .833-.825V1.824a.818.818 0 0 0-.14-.457.839.839 0 0 0-1.155-.228ZM3.917 6.466H2.249a.414.414 0 0 1-.416-.412v-2.06c0-.228.187-.413.417-.413h1.667v2.885Zm-.749 3.71H3.5V7.29H2.472l.696 2.885ZM4.75 3.58v2.885h1.086L8.5 8.223V1.824L5.836 3.581H4.75Z"
                    clipRule="evenodd"
                />
                <path d="M10.583 3.581a.417.417 0 0 0-.416.417V6.05a.417.417 0 1 0 .833 0V3.998a.417.417 0 0 0-.417-.417Z" />
            </g>
        </svg>
    );
}

const Memo = memo(IconMegaphone12);
export default Memo;
