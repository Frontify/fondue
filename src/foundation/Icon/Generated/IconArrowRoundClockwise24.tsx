import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconArrowRoundClockwise24(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            className={customClassName}
            name="IconArrowRoundClockwise24"
            {...props}
        >
            <path
                fill="currentColor"
                d="m13.724 18.537-.194-.724.194.724Zm-8.267-4.773-.724.194.724-.194Zm4.773-8.267-.194-.724.194.724Zm7.506 4.967a.75.75 0 1 0 1.449-.388l-1.45.388Zm.127 6.245a.75.75 0 0 0-1.245-.838l1.245.838ZM14.75 10.5a.75.75 0 0 0 0 1.5v-1.5Zm4.5.75V12H20v-.75h-.75Zm.75-4.5a.75.75 0 0 0-1.5 0H20Zm-6.47 11.063c-3.267.875-6.473-.976-7.348-4.243l-1.45.388c1.09 4.068 5.119 6.394 9.186 5.304l-.388-1.45ZM6.182 13.57c-.876-3.267.975-6.473 4.242-7.348l-.388-1.45c-4.068 1.09-6.393 5.119-5.303 9.186l1.449-.388Zm4.242-7.348c3.264-.875 6.435.971 7.312 4.242l1.449-.388c-1.09-4.064-5.078-6.394-9.149-5.303l.388 1.449ZM17.24 16.29l-.622-.419.001-.001.001-.002-.003.004a3.025 3.025 0 0 1-.149.185 4.904 4.904 0 0 1-.55.536 6.2 6.2 0 0 1-2.388 1.22l.388 1.449a7.699 7.699 0 0 0 2.962-1.519c.321-.268.56-.516.72-.702a4.58 4.58 0 0 0 .253-.319l.006-.008a.09.09 0 0 0 .002-.003v-.001h.001l-.622-.42ZM14.75 12h4.5v-1.5h-4.5V12Zm5.25-.75v-4.5h-1.5v4.5H20Z"
            />
        </svg>
    );
}

const Memo = memo(IconArrowRoundClockwise24);
export default Memo;
