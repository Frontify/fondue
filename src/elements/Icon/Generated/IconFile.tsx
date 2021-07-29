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

function IconFile(props: IconProps): React.ReactElement<IconProps> {
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
                d="M18.9545454,10.4615385 L12.7691709,10.4615385 C12.3443695,10.4615385 12,10.120104 12,9.69230773 L12,8.92307691 L12,3.53846154 L6.8769,3.53846154 C5.86084687,3.53846154 5.04545454,4.34930326 5.04545454,5.34952721 L5.04545454,18.6504728 C5.04545454,19.6453033 5.85956686,20.4615385 6.8638253,20.4615385 L17.1361747,20.4615385 C18.1363962,20.4615385 18.9545454,19.6476966 18.9545454,18.6437719 L18.9545454,10.4615385 Z M18.9545454,8.92307691 L18.9545454,8.74556209 L13.5454546,3.68310322 L13.5454546,8.92307691 L18.9545454,8.92307691 Z M3.5,5.64505265 C3.5,3.63194565 5.13687126,2 7.15652226,2 L13.2191185,2 C13.719423,2 14.4154861,2.27339864 14.7832258,2.6195066 L19.8417742,7.38049336 C20.2053023,7.72263745 20.5,8.40389445 20.5,8.907792 L20.5,18.3582116 C20.5,20.3695158 18.8699686,22 16.8530735,22 L7.14692648,22 C5.13278461,22 3.5,20.3633161 3.5,18.3549474 L3.5,5.64505265 Z"
                id="icon_file"
            />
        </svg>
    );
}

const MemoIconFile = React.memo(IconFile);
export default MemoIconFile;
