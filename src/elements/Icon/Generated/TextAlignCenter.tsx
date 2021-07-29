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

function IconTextAlignCenter(props: IconProps): React.ReactElement<IconProps> {
    const customClassName = [
        "flex items-center justify-center fill-current",
        iconSizeMap[props.size || IconSize.Size16],
    ].join(" ");
    return (
        <svg
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width="100%"
            height="100%"
            className={customClassName}
            {...props}
        >
            <g transform="translate(2.000000, 5.000000)">
                <path d="M3,2 C2.44771525,2 2,1.55228475 2,1 C2,0.44771525 2.44771525,0 3,0 L17,0 C17.5522847,0 18,0.44771525 18,1 C18,1.55228475 17.5522847,2 17,2 L3,2 Z M0.909090909,6 C0.407013864,6 0,5.55228475 0,5 C0,4.44771525 0.407013864,4 0.909090909,4 L19.0909091,4 C19.5929861,4 20,4.44771525 20,5 C20,5.55228475 19.5929861,6 19.0909091,6 L0.909090909,6 Z M3,10 C2.44771525,10 2,9.55228475 2,9 C2,8.44771525 2.44771525,8 3,8 L17,8 C17.5522847,8 18,8.44771525 18,9 C18,9.55228475 17.5522847,10 17,10 L3,10 Z M0.909090909,14 C0.407013864,14 0,13.5522847 0,13 C0,12.4477153 0.407013864,12 0.909090909,12 L19.0909091,12 C19.5929861,12 20,12.4477153 20,13 C20,13.5522847 19.5929861,14 19.0909091,14 L0.909090909,14 Z" />
            </g>
        </svg>
    );
}

const MemoIconTextAlignCenter = React.memo(IconTextAlignCenter);
export default MemoIconTextAlignCenter;
