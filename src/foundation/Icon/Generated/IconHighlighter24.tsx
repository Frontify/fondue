import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";

function IconHighlighter24(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            className={customClassName}
            name="IconHighlighter24"
            {...props}
        >
            <g fill="currentColor">
                <path
                    fillRule="evenodd"
                    d="M17.979 3.554a2 2 0 0 0-2.708-.112l-8.569 7.263a2 2 0 0 0-.579.822L4.63 15.502a1 1 0 0 0 .215 1.045l-1.698 1.591-.087.095c-1.031 1.122-.236 2.934 1.288 2.934h1.508c.422 0 .83-.152 1.148-.43l1.116-.969a1 1 0 0 0 .838.063l3.976-1.493a2 2 0 0 0 .822-.58l7.263-8.569a2 2 0 0 0-.112-2.707L17.98 3.554Zm1.867 3.989-2.928-2.929a.5.5 0 0 0-.677-.028l-8.23 6.976L12.9 16.45l6.975-8.23a.5.5 0 0 0-.027-.677ZM6.147 15.728l1.068-2.841 4.359 4.36-2.841 1.067-2.586-2.586Zm.88 3.002-1.12-1.122-1.694 1.587-.049.053a.25.25 0 0 0 .184.419h1.508a.25.25 0 0 0 .164-.061l1.008-.876Z"
                    clipRule="evenodd"
                />
                <path d="M13.1 19.466a.75.75 0 1 0 0 1.5h5.097a.75.75 0 0 0 0-1.5H13.1Z" />
            </g>
        </svg>
    );
}

const Memo = memo(IconHighlighter24);
export default Memo;
