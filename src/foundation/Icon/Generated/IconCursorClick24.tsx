import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconCursorClick24(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            className={customClassName}
            name="IconCursorClick24"
            {...props}
        >
            <path
                fill="currentColor"
                d="m21.886 18.52-3-3 2.54-1.21a.6.6 0 0 0-.05-1.1l-2.88-1c.084-.468.128-.943.13-1.42a8.33 8.33 0 1 0-8.32 8.33c.314-.003.628-.026.94-.07h.25a8.14 8.14 0 0 0 .86-.17l.19-.06c.14 0 .27-.07.4-.12l.8 2.2a.6.6 0 0 0 1.11.05l1.2-2.53 3 3a.399.399 0 0 0 .57 0l2.26-2.26a.418.418 0 0 0 0-.64Zm-9.54-1.22c-.22.07-.45.12-.68.17l-.3.06c-.33.054-.665.084-1 .09a6.83 6.83 0 1 1 6.82-6.83 8.08 8.08 0 0 1-.06.86l-1.54-.56c.005-.11.005-.22 0-.33a5.34 5.34 0 1 0-3.66 5l.54 1.49-.12.05Zm-2.47-7.19 1.54 4.25a3.488 3.488 0 0 1-1.08.18 3.75 3.75 0 1 1 3.73-4l-3.42-1.19a.6.6 0 0 0-.77.76Zm9.46 9.4-3-3-.7-.7-1 2.06-.21.45-.1-.27-.52-1.42-1.19-3.3-.62-1.92 3.29 1.2 1.49.54 1.41.51.73.26-1.59.76-.92.43.48.49 3.21 3.21-.76.7Z"
            />
        </svg>
    );
}

const Memo = memo(IconCursorClick24);
export default Memo;
