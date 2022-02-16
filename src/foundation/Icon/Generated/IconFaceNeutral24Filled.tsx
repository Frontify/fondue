import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";

function IconFaceNeutral24Filled(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            className={customClassName}
            name="IconFaceNeutral24Filled"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M8.104 21.219A9.802 9.802 0 0 0 12 22c1.38 0 2.679-.26 3.896-.781a10.038 10.038 0 0 0 3.184-2.139 10.038 10.038 0 0 0 2.139-3.183A9.802 9.802 0 0 0 22 12c0-1.38-.26-2.679-.781-3.896A10.037 10.037 0 0 0 19.08 4.92a10.036 10.036 0 0 0-3.183-2.139A9.802 9.802 0 0 0 12 2c-1.38 0-2.679.26-3.896.781A10.035 10.035 0 0 0 4.92 4.92a10.035 10.035 0 0 0-2.14 3.184A9.801 9.801 0 0 0 2 12c0 1.38.26 2.679.781 3.896A10.036 10.036 0 0 0 4.92 19.08a10.037 10.037 0 0 0 3.184 2.139Zm2.078-11.492a1.364 1.364 0 1 1-2.727 0 1.364 1.364 0 0 1 2.727 0Zm5 1.364a1.364 1.364 0 1 0 0-2.727 1.364 1.364 0 0 0 0 2.727Zm-8.637 4.09c0 .503.407.91.91.91h9.09a.91.91 0 1 0 0-1.818h-9.09a.91.91 0 0 0-.91.909Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconFaceNeutral24Filled);
export default Memo;
