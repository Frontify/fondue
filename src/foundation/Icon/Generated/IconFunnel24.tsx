import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconFunnel24(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            className={customClassName}
            name="IconFunnel24"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M20.095 3H4.133A2 2 0 0 0 2.46 6.098l5.82 8.857a3 3 0 0 1 .493 1.647v3.744a2 2 0 0 0 3.027 1.716l2.634-1.575a2 2 0 0 0 .973-1.687l.032-2.222a3 3 0 0 1 .493-1.603l5.833-8.877A2 2 0 0 0 20.095 3ZM9.953 13.856 4.133 5h15.962l-5.833 8.876a5 5 0 0 0-.821 2.673l-.033 2.221-2.634 1.576v-3.744a5 5 0 0 0-.821-2.746Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconFunnel24);
export default Memo;
