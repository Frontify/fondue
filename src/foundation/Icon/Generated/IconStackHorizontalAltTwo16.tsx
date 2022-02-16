import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";

function IconStackHorizontalAltTwo16(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconStackHorizontalAltTwo16"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M3 4.667h2.778c.92 0 1.667.746 1.667 1.666v3.334c0 .92-.747 1.666-1.667 1.666H3c-.92 0-1.667-.746-1.667-1.666V6.333c0-.92.747-1.666 1.667-1.666Zm0 1.11a.556.556 0 0 0-.555.556v3.334c0 .307.248.555.555.555h2.778a.556.556 0 0 0 .556-.555V6.333a.556.556 0 0 0-.556-.555H3Zm7.222-1.11H13c.92 0 1.667.746 1.667 1.666v3.334c0 .92-.746 1.666-1.667 1.666h-2.778c-.92 0-1.666-.746-1.666-1.666V6.333c0-.92.746-1.666 1.666-1.666Zm0 1.11a.556.556 0 0 0-.555.556v3.334c0 .307.249.555.555.555H13a.556.556 0 0 0 .556-.555V6.333A.556.556 0 0 0 13 5.778h-2.778Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconStackHorizontalAltTwo16);
export default Memo;
