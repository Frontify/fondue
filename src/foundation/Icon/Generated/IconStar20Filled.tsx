import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";

function IconStar20Filled(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconStar20Filled"
            {...props}
        >
            <path
                fill="currentColor"
                d="m4.85 17.518.983-5.735L1.666 7.72l5.759-.836L10 1.667l2.575 5.218 5.758.836-4.166 4.062.983 5.735L10 14.81l-5.15 2.708Z"
            />
        </svg>
    );
}

const Memo = memo(IconStar20Filled);
export default Memo;
