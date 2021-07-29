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

function IconBold(props: IconProps): React.ReactElement<IconProps> {
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
            <path d="M17.4884 8.34286C17.4884 5.64571 15.4884 4 11.814 4H6V20H11.907C15.9767 20 18 18.3771 18 15.3143C18 13.5771 16.9302 12.0229 14.6047 11.7943C16.4884 11.52 17.4884 10.0114 17.4884 8.34286ZM9.67442 7.26857H11.4651C13.1163 7.26857 13.6977 7.97714 13.6977 8.82286C13.6977 9.76 13.1163 10.3771 11.8605 10.3771H9.67442V7.26857ZM14.2326 15.0629C14.2326 16.16 13.3953 16.7543 11.8605 16.7543H9.67442V13.3943H11.8372C13.4884 13.3943 14.2326 13.92 14.2326 15.0629Z" />
        </svg>
    );
}

const MemoIconBold = React.memo(IconBold);
export default MemoIconBold;
