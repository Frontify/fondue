import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconArrowRoundClockwise20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconArrowRoundClockwise20"
            {...props}
        >
            <path
                fill="currentColor"
                d="m11.519 15.685.194.725-.194-.725ZM4.326 11.53l-.724.195.724-.195Zm4.152-7.194-.194-.725.194.725Zm6.468 4.349a.75.75 0 0 0 1.45-.388l-1.45.388Zm.281 5.46a.75.75 0 1 0-1.234-.852l1.234.852ZM12 8.5a.75.75 0 0 0 0 1.5V8.5Zm4.25.75V10H17v-.75h-.75ZM17 5a.75.75 0 0 0-1.5 0H17Zm-5.675 9.96c-2.79.748-5.526-.831-6.274-3.624l-1.45.389c.963 3.591 4.521 5.647 8.112 4.685l-.388-1.45ZM5.05 11.337c-.748-2.792.83-5.528 3.621-6.276l-.388-1.449c-3.591.963-5.645 4.522-4.682 8.114l1.449-.389ZM8.672 5.06c2.79-.747 5.526.833 6.274 3.625l1.45-.388c-.963-3.592-4.521-5.648-8.112-4.686l.388 1.45Zm5.938 8.659-.617-.427h.001v-.002l.002-.001-.003.003a2.58 2.58 0 0 1-.129.157 4.23 4.23 0 0 1-.48.462 5.401 5.401 0 0 1-2.06 1.05l.39 1.449a6.9 6.9 0 0 0 2.627-1.344 5.86 5.86 0 0 0 .647-.623 4.131 4.131 0 0 0 .23-.286l.006-.007.002-.003v-.001l-.616-.427ZM12 9.999h4.25V8.5H12V10Zm5-.75V5h-1.5v4.25H17Z"
            />
        </svg>
    );
}

const Memo = memo(IconArrowRoundClockwise20);
export default Memo;
