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

function IconReject(props: IconProps): React.ReactElement<IconProps> {
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
            <path d="M13.507 12l6.18 6.178c.416.416.417 1.091.003 1.508a1.061 1.061 0 01-1.504.003L12 13.506l-6.186 6.183a1.061 1.061 0 01-1.504-.003 1.069 1.069 0 01.003-1.508L10.493 12l-6.18-6.178a1.069 1.069 0 01-.003-1.508 1.061 1.061 0 011.504-.003L12 10.494l6.186-6.183a1.061 1.061 0 011.504.003 1.069 1.069 0 01-.003 1.508L13.507 12z" />
        </svg>
    );
}

const MemoIconReject = React.memo(IconReject);
export default MemoIconReject;
