import * as React from "react";
import { IconProps, IconSize } from "@elements/Icon/Icon";
const iconSizeMap = {
    [IconSize.Size8]: "h-2 w-2",
    [IconSize.Size12]: "h-3 w-3",
    [IconSize.Size16]: "h-4 w-4",
    [IconSize.Size20]: "h-5 w-5",
    [IconSize.Size24]: "h-6 w-6",
    [IconSize.Size32]: "h-8 w-8",
};

function IconUploadAlternative(props: IconProps): React.ReactElement<IconProps> {
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
            {...props}
        >
            <path d="M11.286 9.577v6.171c0 .394.32.711.714.711a.711.711 0 00.714-.71V9.566l1.818 1.817a.716.716 0 001.008-.001c.281-.281.28-.73.002-1.009l-3.034-3.033a.71.71 0 00-.501-.207.701.701 0 00-.506.207l-3.033 3.033a.716.716 0 00.001 1.009c.281.28.73.28 1.009.001l1.808-1.807zM12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-1.429A8.571 8.571 0 1012 3.43a8.571 8.571 0 000 17.142z" />
        </svg>
    );
}

const MemoIconUploadAlternative = React.memo(IconUploadAlternative);
export default MemoIconUploadAlternative;
