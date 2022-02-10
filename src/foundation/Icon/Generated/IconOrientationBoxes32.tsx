import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconOrientationBoxes32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconOrientationBoxes32"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M7.111 2.667h7.778a4.444 4.444 0 0 1 4.444 4.444v5.556h5.556a4.444 4.444 0 0 1 4.445 4.444v7.778a4.444 4.444 0 0 1-4.445 4.444H11.556A4.444 4.444 0 0 1 7.11 24.89a4.445 4.445 0 0 1-4.444-4.445V7.111A4.444 4.444 0 0 1 7.11 2.667Zm4.445 24.444a2.222 2.222 0 0 1-2.222-2.222h5.555a4.444 4.444 0 0 0 4.444-4.445V14.89h5.556c1.227 0 2.222.995 2.222 2.222v7.778a2.222 2.222 0 0 1-2.222 2.222H11.556Zm-6.667-20c0-1.227.995-2.222 2.222-2.222h7.778c1.227 0 2.222.995 2.222 2.222v13.334a2.222 2.222 0 0 1-2.222 2.222H7.11a2.222 2.222 0 0 1-2.222-2.223V7.112Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconOrientationBoxes32);
export default Memo;
