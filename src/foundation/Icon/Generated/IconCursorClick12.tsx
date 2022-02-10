import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconCursorClick12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconCursorClick12"
            {...props}
        >
            <path
                fill="currentColor"
                d="m10.943 9.26-1.5-1.5 1.27-.605a.3.3 0 0 0-.025-.55l-1.44-.5a4.12 4.12 0 0 0 .065-.71 4.165 4.165 0 1 0-4.16 4.165 3.65 3.65 0 0 0 .47-.035h.125c.145-.02.289-.049.43-.085l.095-.03c.07 0 .135-.035.2-.06l.4 1.1a.3.3 0 0 0 .555.025l.6-1.265 1.5 1.5a.2.2 0 0 0 .285 0l1.13-1.13a.21.21 0 0 0 0-.32Zm-4.77-.61c-.11.035-.225.06-.34.085l-.15.03a3.5 3.5 0 0 1-.5.045 3.415 3.415 0 1 1 3.41-3.415 4.049 4.049 0 0 1-.03.43l-.77-.28c.003-.055.003-.11 0-.165a2.67 2.67 0 1 0-1.83 2.5l.27.745-.06.025ZM4.938 5.055l.77 2.125a1.745 1.745 0 0 1-.54.09 1.875 1.875 0 1 1 1.865-2l-1.71-.595a.3.3 0 0 0-.385.38Zm4.73 4.7-1.5-1.5-.35-.35-.5 1.03-.105.225-.05-.135-.26-.71-.595-1.65-.31-.96 1.645.6.745.27.705.255.365.13-.795.38-.46.215.24.245 1.605 1.605-.38.35Z"
            />
        </svg>
    );
}

const Memo = memo(IconCursorClick12);
export default Memo;
