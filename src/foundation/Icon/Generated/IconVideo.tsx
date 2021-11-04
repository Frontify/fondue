import React from "react";
import { IconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconVideo(props: IconProps): React.ReactElement<IconProps> {
    const customClassName = [
        "tw-flex tw-items-center tw-justify-center tw-fill-current",
        IconSizeMap[props.size || IconSize.Size16],
    ].join(" ");
    return (
        <svg
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            className={customClassName}
            name="IconVideo"
            {...props}
        >
            <path d="M9.143 14.705V9.813c0-.508.279-.956.775-1.242.46-.212.972-.193 1.395.09l3.622 2.402c.4.255.636.696.636 1.16 0 .45-.222.884-.599 1.148l-3.578 2.44a1.3 1.3 0 01-.835.292c-.22 0-.431-.043-.634-.142-.473-.224-.746-.684-.782-1.256zm4.967-2.475L10.57 9.883l-.001 4.765 3.54-2.418zM12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-1.429A8.571 8.571 0 1012 3.43a8.571 8.571 0 000 17.142z" />
        </svg>
    );
}

const MemoIconVideo = React.memo(IconVideo);
export default MemoIconVideo;
