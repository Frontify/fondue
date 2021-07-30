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

function IconCopyToClipboard(props: IconProps): React.ReactElement<IconProps> {
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
            {"&gt;"}
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M14.339 2.733h-4.214a2.26 2.26 0 00-2.132 1.511H7a2.75 2.75 0 00-2.75 2.75v11.5A2.75 2.75 0 007 21.244h10.463a2.75 2.75 0 002.75-2.75v-11.5a2.75 2.75 0 00-2.75-2.75h-.992a2.26 2.26 0 00-2.132-1.51zM7.994 5.744a2.26 2.26 0 002.13 1.507h4.215a2.26 2.26 0 002.13-1.507h.994c.69 0 1.25.56 1.25 1.25v11.5c0 .69-.56 1.25-1.25 1.25H7c-.69 0-1.25-.56-1.25-1.25v-11.5c0-.69.56-1.25 1.25-1.25h.994zm2.13-1.51a.759.759 0 000 1.517h4.215a.759.759 0 100-1.518h-4.214zm1.126 6.626v1.81H9.5a.75.75 0 000 1.5h1.75v1.809a.75.75 0 001.5 0v-1.81h1.75a.75.75 0 000-1.5h-1.75V10.86a.75.75 0 10-1.5 0z"
            />
        </svg>
    );
}

const MemoIconCopyToClipboard = React.memo(IconCopyToClipboard);
export default MemoIconCopyToClipboard;
