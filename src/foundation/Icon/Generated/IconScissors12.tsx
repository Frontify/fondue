import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconScissors12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconScissors12"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="m7.943 2.56-2.65 2.65-.713-.662c.407-.764.305-1.732-.306-2.344-.713-.764-1.936-.713-2.7 0-.765.714-.765 1.937 0 2.803.662.662 1.63.764 2.343.305l.714.714-.714.713c-.764-.407-1.732-.305-2.344.306-.764.713-.713 1.936 0 2.7.714.765 1.937.765 2.7 0 .663-.662.765-1.63.307-2.343l4.076-4.077c.255-.255.612-.356.917-.255L5.65 6.994l2.19 2.191c.714.764 1.937.764 2.701 0l.357-.357-2.904-2.904L11 2.918l-.357-.357c-.713-.764-1.936-.764-2.7 0Zm.56 5.912L6.975 6.943l.356-.306 2.09 2.09c-.306.101-.663 0-.918-.255Zm-4.892-4.28c.357-.357.357-.969 0-1.376-.356-.357-.968-.357-1.375 0-.357.356-.357.968 0 1.375.407.408.968.408 1.375 0Zm0 3.413c.357.408.357 1.02 0 1.376a1.018 1.018 0 0 1-1.375 0c-.357-.407-.357-1.019 0-1.376.407-.356 1.019-.356 1.375 0Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconScissors12);
export default Memo;
