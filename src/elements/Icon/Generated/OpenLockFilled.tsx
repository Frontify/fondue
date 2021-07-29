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

function IconOpenLockFilled(props: IconProps): React.ReactElement<IconProps> {
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
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15.3667 8.66667V6.16667C15.3667 4.78595 14.2474 3.66667 12.8667 3.66667H11.2C9.81928 3.66667 8.69999 4.78595 8.69999 6.16667C8.69999 6.6269 8.3269 7 7.86666 7C7.40642 7 7.03333 6.6269 7.03333 6.16667C7.03333 3.86548 8.89881 2 11.2 2H12.8667C15.1678 2 17.0333 3.86548 17.0333 6.16667V8.66667H17.8667C19.2474 8.66667 20.3667 9.78596 20.3667 11.1667V19.5C20.3667 20.8807 19.2474 22 17.8667 22H6.20001C4.8193 22 3.70001 20.8807 3.70001 19.5V11.1667C3.70001 9.78596 4.8193 8.66667 6.20001 8.66667H15.3667ZM11.2 15.9437C10.7019 15.6555 10.3667 15.1169 10.3667 14.5C10.3667 13.5795 11.1129 12.8333 12.0334 12.8333C12.9538 12.8333 13.7 13.5795 13.7 14.5C13.7 15.1169 13.3649 15.6555 12.8667 15.9437V17C12.8667 17.4602 12.4936 17.8333 12.0333 17.8333C11.5731 17.8333 11.2 17.4602 11.2 17V15.9437Z"
            />
        </svg>
    );
}

const MemoIconOpenLockFilled = React.memo(IconOpenLockFilled);
export default MemoIconOpenLockFilled;
