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

function IconDoDontsUnderline(props: IconProps): React.ReactElement<IconProps> {
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
                d="M7.25974026,12.7217391 L8.50197628,12.7217391 L8.50197628,14.1503106 L4.58893281,14.1503106 L4.58893281,12.7217391 L5.83116883,12.7217391 L5.83116883,7.62857143 L4.01298701,7.62857143 L4.01298701,8.56024845 L2.58441558,8.56024845 L2.58441558,6.2 L4.01298701,6.2 L9.07792208,6.2 L10.5064935,6.2 L10.5064935,8.56024845 L9.07792208,8.56024845 L9.07792208,7.62857143 L7.25974026,7.62857143 L7.25974026,12.7217391 Z M2.90909091,17.8374929 C2.40701386,17.8374929 2,17.4304791 2,16.928402 C2,16.426325 2.40701386,16.0193111 2.90909091,16.0193111 L21.0909091,16.0193111 C21.5929861,16.0193111 22,16.426325 22,16.928402 C22,17.4304791 21.5929861,17.8374929 21.0909091,17.8374929 L2.90909091,17.8374929 Z"
                id="Icon_Dodonts_underline"
            />
        </svg>
    );
}

const MemoIconDoDontsUnderline = React.memo(IconDoDontsUnderline);
export default MemoIconDoDontsUnderline;
