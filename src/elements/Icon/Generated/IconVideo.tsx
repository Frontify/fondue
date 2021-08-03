import * as React from "react";
import { IconProps } from "@elements/Icon/IconProps";
import { IconSize } from "@elements/Icon/IconSize";
const iconSizeMap = {
    [IconSize.Size8]: "h-2 w-2",
    [IconSize.Size12]: "h-3 w-3",
    [IconSize.Size16]: "h-4 w-4",
    [IconSize.Size20]: "h-5 w-5",
    [IconSize.Size24]: "h-6 w-6",
    [IconSize.Size32]: "h-8 w-8",
};

function IconVideo(props: IconProps): React.ReactElement<IconProps> {
    const customClassName = [
        "flex items-center justify-center fill-current",
        iconSizeMap[props.size || IconSize.Size16],
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
