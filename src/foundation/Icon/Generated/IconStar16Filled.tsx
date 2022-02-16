import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";

function IconStar16Filled(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconStar16Filled"
            {...props}
        >
            <path
                fill="currentColor"
                d="m3.88 14.014.786-4.588-3.333-3.25 4.607-.668L8 1.333l2.06 4.175 4.606.669-3.333 3.25.787 4.587L8 11.848l-4.12 2.166Z"
            />
        </svg>
    );
}

const Memo = memo(IconStar16Filled);
export default Memo;
