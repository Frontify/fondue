import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconDoAndDontBox16(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconDoAndDontBox16"
            {...props}
        >
            <g fill="currentColor">
                <path d="M12.863 10.395a.44.44 0 0 0-.622.01l-1.23 1.269-.323-.365a.44.44 0 1 0-.658.583l.638.72a.44.44 0 0 0 .644.014l1.56-1.61a.44.44 0 0 0-.01-.62ZM3.66 3.66a.44.44 0 0 0 0 .622l.435.435-.435.435a.44.44 0 0 0 .622.622l.435-.436.435.436a.44.44 0 0 0 .622-.622l-.436-.435.436-.435a.44.44 0 0 0-.622-.622l-.435.435-.435-.435a.44.44 0 0 0-.622 0Z" />
                <path
                    fillRule="evenodd"
                    d="M7.42 2.872A3.297 3.297 0 1 0 2.446 7.1v4.746c0 .354.124.656.375.907.25.25.552.375.906.375H8.58A3.297 3.297 0 1 0 13.554 8.9V4.155c0-.354-.125-.656-.376-.906a1.235 1.235 0 0 0-.906-.376H7.419ZM3.37 7.677a3.297 3.297 0 0 0 4.45-3.882h4.452c.11 0 .176.028.254.105a.317.317 0 0 1 .105.254v4.17a3.297 3.297 0 0 0-4.45 3.882H3.727a.317.317 0 0 1-.253-.106.317.317 0 0 1-.106-.254V7.677Zm8 6.11a2.418 2.418 0 1 0 0-4.835 2.418 2.418 0 0 0 0 4.836Zm-6.74-6.74a2.418 2.418 0 1 0 0-4.834 2.418 2.418 0 0 0 0 4.835Z"
                    clipRule="evenodd"
                />
            </g>
        </svg>
    );
}

const Memo = memo(IconDoAndDontBox16);
export default Memo;
