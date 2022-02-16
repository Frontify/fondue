import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";

function IconMagnifierPlus20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconMagnifierPlus20"
            {...props}
        >
            <g fill="currentColor">
                <path d="M11.53 8.526h-1.42V7.067a.833.833 0 0 0-1.667 0v1.459H7.022a.833.833 0 1 0 0 1.666h1.42v1.459a.833.833 0 1 0 1.667 0v-1.459h1.421a.833.833 0 1 0 0-1.666Z" />
                <path
                    fillRule="evenodd"
                    d="M1.667 9.36c0 4.247 3.406 7.691 7.609 7.691a7.527 7.527 0 0 0 4.77-1.698c.04.067.089.13.148.186l2.717 2.565a.839.839 0 0 0 1.195-.042.861.861 0 0 0-.041-1.208l-2.717-2.564a.85.85 0 0 0-.143-.11 7.712 7.712 0 0 0 1.68-4.82c0-4.25-3.407-7.693-7.61-7.693-4.202 0-7.608 3.444-7.608 7.692Zm13.527 0c0 3.303-2.65 5.982-5.918 5.982-3.269 0-5.918-2.679-5.918-5.983s2.65-5.983 5.918-5.983c3.268 0 5.918 2.679 5.918 5.983Z"
                    clipRule="evenodd"
                />
            </g>
        </svg>
    );
}

const Memo = memo(IconMagnifierPlus20);
export default Memo;
