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

function IconText(props: IconProps): React.ReactElement<IconProps> {
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
            <path
                d="M3,7 C2.44771525,7 2,6.55228475 2,6 C2,5.44771525 2.44771525,5 3,5 L17,5 C17.5522847,5 18,5.44771525 18,6 C18,6.55228475 17.5522847,7 17,7 L3,7 Z M2.90909091,11 C2.40701386,11 2,10.5522847 2,10 C2,9.44771525 2.40701386,9 2.90909091,9 L21.0909091,9 C21.5929861,9 22,9.44771525 22,10 C22,10.5522847 21.5929861,11 21.0909091,11 L2.90909091,11 Z M3,15 C2.44771525,15 2,14.5522847 2,14 C2,13.4477153 2.44771525,13 3,13 L17,13 C17.5522847,13 18,13.4477153 18,14 C18,14.5522847 17.5522847,15 17,15 L3,15 Z M2.90909091,19 C2.40701386,19 2,18.5522847 2,18 C2,17.4477153 2.40701386,17 2.90909091,17 L21.0909091,17 C21.5929861,17 22,17.4477153 22,18 C22,18.5522847 21.5929861,19 21.0909091,19 L2.90909091,19 Z"
                id="Icon_Text"
            />
        </svg>
    );
}

const MemoIconText = React.memo(IconText);
export default MemoIconText;
