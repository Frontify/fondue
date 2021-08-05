import * as React from "react";
import { IconProps } from "@elements/Icon/IconProps";
import { IconSize, IconSizeMap } from "@elements/Icon/IconSize";

function IconNotifications(props: IconProps): React.ReactElement<IconProps> {
    const customClassName = [
        "flex items-center justify-center fill-current",
        IconSizeMap[props.size || IconSize.Size16],
    ].join(" ");
    return (
        <svg
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="100%"
            height="100%"
            className={customClassName}
            name="IconNotifications"
            {...props}
        >
            <path d="M9.818 5.23V4.143c0-1.184.969-2.143 2.144-2.143h.076c1.184 0 2.144.951 2.144 2.143v1.086a6.539 6.539 0 014.363 6.165v6.32h.747a.71.71 0 01.708.715c0 .394-.32.714-.708.714h-5.11v.714A2.149 2.149 0 0112.038 22h-.076a2.138 2.138 0 01-2.144-2.143v-.714h-5.11A.71.71 0 014 18.429c0-.395.32-.715.708-.715h.747v-6.32A6.545 6.545 0 019.818 5.23zm0 12.484h7.273v-6.332c0-2.811-2.28-5.096-5.091-5.096a5.097 5.097 0 00-5.09 5.096v6.332h2.908z" />
        </svg>
    );
}

const MemoIconNotifications = React.memo(IconNotifications);
export default MemoIconNotifications;
