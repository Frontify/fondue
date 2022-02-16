import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconLockClosed12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconLockClosed12"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M8.517 3.5a2.5 2.5 0 0 0-5 0v.833H3.1c-.69 0-1.25.56-1.25 1.25V9.75c0 .69.56 1.25 1.25 1.25h5.833c.69 0 1.25-.56 1.25-1.25V5.583c0-.69-.56-1.25-1.25-1.25h-.416V3.5ZM3.1 5.167a.417.417 0 0 0-.417.416V9.75c0 .23.187.417.417.417h5.833c.23 0 .417-.187.417-.417V5.583a.417.417 0 0 0-.417-.416H3.1Zm4.583-.834V3.5a1.667 1.667 0 0 0-3.333 0v.833h3.333Zm-2.5 2.917c0 .308.168.578.417.722V8.5a.417.417 0 1 0 .833 0v-.528a.833.833 0 1 0-1.25-.722Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconLockClosed12);
export default Memo;
