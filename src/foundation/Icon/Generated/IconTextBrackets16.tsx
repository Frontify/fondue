import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";

function IconTextBrackets16(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconTextBrackets16"
            {...props}
        >
            <g fill="currentColor">
                <path d="M5 4.167H3.667A.833.833 0 0 0 2.834 5v6c0 .46.373.833.833.833H5a.5.5 0 0 1 0 1H3.667A1.833 1.833 0 0 1 1.834 11V5c0-1.012.82-1.833 1.833-1.833H5a.5.5 0 1 1 0 1Z" />
                <path d="M5.172 6.5a.503.503 0 0 1-.505-.5c0-.276.226-.5.505-.5h5.656c.28 0 .506.224.506.5s-.227.5-.506.5H5.172Zm.05 2c-.306 0-.555-.224-.555-.5s.249-.5.555-.5h5.556c.307 0 .556.224.556.5s-.25.5-.556.5H5.222ZM4.667 10c0 .276.226.5.505.5h3.434a.503.503 0 0 0 .505-.5c0-.276-.226-.5-.505-.5H5.172a.503.503 0 0 0-.505.5Z" />
                <path d="M12.334 4.167H11a.5.5 0 1 1 0-1h1.334c1.012 0 1.833.82 1.833 1.833v6a1.833 1.833 0 0 1-1.833 1.833H11a.5.5 0 1 1 0-1h1.334c.46 0 .833-.373.833-.833V5a.833.833 0 0 0-.833-.833Z" />
            </g>
        </svg>
    );
}

const Memo = memo(IconTextBrackets16);
export default Memo;
