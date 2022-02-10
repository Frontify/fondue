import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconArrowRoundAntiClockwise24(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            className={customClassName}
            name="IconArrowRoundAntiClockwise24"
            {...props}
        >
            <path
                fill="currentColor"
                d="m10.24 18.537.195-.724-.194.724Zm8.268-4.773.724.194-.724-.194Zm-4.773-8.267.194-.724-.194.724Zm-7.31 4.967a.75.75 0 1 1-1.45-.388l1.45.388Zm-.323 6.245a.75.75 0 1 1 1.245-.838l-1.245.838ZM9.215 10.5a.75.75 0 0 1 0 1.5v-1.5Zm-4.465.75V12H4v-.75h.75ZM4 6.75a.75.75 0 0 1 1.5 0H4Zm6.435 11.063c3.267.875 6.473-.976 7.348-4.243l1.45.388c-1.09 4.068-5.12 6.394-9.187 5.304l.389-1.45Zm7.348-4.243c.876-3.267-.975-6.473-4.242-7.348l.388-1.45c4.067 1.09 6.393 5.119 5.303 9.186l-1.449-.388Zm-4.242-7.348c-3.244-.87-6.235.95-7.117 4.242l-1.448-.388c1.083-4.043 4.862-6.4 8.953-5.303l-.388 1.449ZM6.725 16.29l.622-.419-.001-.001-.001-.002.003.004.024.034a4.87 4.87 0 0 0 .675.687 6.2 6.2 0 0 0 2.388 1.22l-.389 1.449a7.699 7.699 0 0 1-2.962-1.519 6.396 6.396 0 0 1-.72-.702 4.525 4.525 0 0 1-.26-.331h-.001l.622-.42ZM9.215 12H4.75v-1.5h4.465V12ZM4 11.25v-4.5h1.5v4.5H4Z"
            />
        </svg>
    );
}

const Memo = memo(IconArrowRoundAntiClockwise24);
export default Memo;
