import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";

function IconStackHorizontalAltTwo12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconStackHorizontalAltTwo12"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M2.25 3.5h2.083c.69 0 1.25.56 1.25 1.25v2.5c0 .69-.56 1.25-1.25 1.25H2.25C1.56 8.5 1 7.94 1 7.25v-2.5c0-.69.56-1.25 1.25-1.25Zm0 .833a.417.417 0 0 0-.417.417v2.5c0 .23.187.417.417.417h2.083c.23 0 .417-.187.417-.417v-2.5a.417.417 0 0 0-.417-.417H2.25ZM7.667 3.5H9.75c.69 0 1.25.56 1.25 1.25v2.5c0 .69-.56 1.25-1.25 1.25H7.667c-.69 0-1.25-.56-1.25-1.25v-2.5c0-.69.56-1.25 1.25-1.25Zm0 .833a.417.417 0 0 0-.417.417v2.5c0 .23.187.417.417.417H9.75c.23 0 .417-.187.417-.417v-2.5a.417.417 0 0 0-.417-.417H7.667Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconStackHorizontalAltTwo12);
export default Memo;
