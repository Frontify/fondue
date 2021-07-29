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

function IconDivider(props: IconProps): React.ReactElement<IconProps> {
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
                d="M5.81818182,3.54545455 C5.39141633,3.54545455 5.04545455,3.89141633 5.04545455,4.31818182 L5.04545455,19.7727273 C5.04545455,20.1994928 5.39141633,20.5454545 5.81818182,20.5454545 L18.1818182,20.5454545 C18.6085837,20.5454545 18.9545455,20.1994928 18.9545455,19.7727273 L18.9545455,4.31818182 C18.9545455,3.89141633 18.6085837,3.54545455 18.1818182,3.54545455 L5.81818182,3.54545455 Z M5.81818182,2 L18.1818182,2 C19.4621146,2 20.5,3.03788535 20.5,4.31818182 L20.5,19.7727273 C20.5,21.0530237 19.4621146,22.0909091 18.1818182,22.0909091 L5.81818182,22.0909091 C4.53788535,22.0909091 3.5,21.0530237 3.5,19.7727273 L3.5,4.31818182 C3.5,3.03788535 4.53788535,2 5.81818182,2 Z M7.36363636,12.8181818 C6.93687088,12.8181818 6.59090909,12.47222 6.59090909,12.0454545 C6.59090909,11.6186891 6.93687088,11.2727273 7.36363636,11.2727273 L16.6363636,11.2727273 C17.0631291,11.2727273 17.4090909,11.6186891 17.4090909,12.0454545 C17.4090909,12.47222 17.0631291,12.8181818 16.6363636,12.8181818 L7.36363636,12.8181818 Z"
                id="Icon_Divider"
            />
        </svg>
    );
}

const MemoIconDivider = React.memo(IconDivider);
export default MemoIconDivider;
