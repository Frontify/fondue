import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconStar20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconStar20"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="m5.833 11.783-.983 5.735L10 14.81l5.15 2.708-.984-5.735 4.167-4.062-5.758-.836L10 1.667 7.425 6.885l-5.758.836 4.166 4.062Zm6.981-.44.665 3.874-3.48-1.829-3.478 1.83.664-3.875L4.371 8.6l3.89-.565L10 4.51l1.74 3.525 3.889.565-2.815 2.743Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconStar20);
export default Memo;
