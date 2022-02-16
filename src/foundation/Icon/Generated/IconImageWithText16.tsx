import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";

function IconImageWithText16(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconImageWithText16"
            {...props}
        >
            <g fill="currentColor" fillRule="evenodd" clipRule="evenodd">
                <path d="M7.333 5.167a.5.5 0 0 1-.5.5h-3a.5.5 0 1 1 0-1h3a.5.5 0 0 1 .5.5ZM6 9.166a.5.5 0 0 1-.5.5H3.833a.5.5 0 1 1 0-1H5.5a.5.5 0 0 1 .5.5Zm1.333-1.999a.5.5 0 0 1-.5.5h-3a.5.5 0 1 1 0-1h3a.5.5 0 0 1 .5.5Zm2.334-.5a1 1 0 1 0 2 0 1 1 0 0 0-2 0Zm1-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z" />
                <path d="M13.334 3.667H2.667A.333.333 0 0 0 2.334 4v8c0 .184.149.333.333.333h10.666c.185 0 .334-.15.334-.333V4a.333.333 0 0 0-.333-.333Zm-10.667-1c-.737 0-1.333.596-1.333 1.333v8c0 .736.596 1.333 1.333 1.333h10.666c.737 0 1.334-.597 1.334-1.333V4c0-.737-.597-1.333-1.333-1.333H2.667Z" />
                <path d="m3.979 12.503 4.543-2.796c.244-.15.534-.205.815-.155l4.576.81-.174.984-4.576-.81a.167.167 0 0 0-.117.023l-4.543 2.795-.524-.851Z" />
            </g>
        </svg>
    );
}

const Memo = memo(IconImageWithText16);
export default Memo;
