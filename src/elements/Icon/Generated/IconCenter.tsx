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

function IconCenter(props: IconProps): React.ReactElement<IconProps> {
    const customClassName = [
        "flex items-center justify-center fill-current",
        iconSizeMap[props.size || IconSize.Size16],
    ].join(" ");
    return (
        <svg
            fill="currentColor"
            width="100%"
            height="100%"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            className={customClassName}
            {...props}
        >
            <path
                d="M6,3.15 L18,3.15 C19.5740115,3.15 20.85,4.42598846 20.85,6 L20.85,18 C20.85,19.5740115 19.5740115,20.85 18,20.85 L6,20.85 C4.42598846,20.85 3.15,19.5740115 3.15,18 L3.15,6 C3.15,4.42598846 4.42598846,3.15 6,3.15 Z M6,4.85 C5.36487254,4.85 4.85,5.36487254 4.85,6 L4.85,18 C4.85,18.6351275 5.36487254,19.15 6,19.15 L18,19.15 C18.6351275,19.15 19.15,18.6351275 19.15,18 L19.15,6 C19.15,5.36487254 18.6351275,4.85 18,4.85 L6,4.85 Z M10,8 L14,8 C15.1045695,8 16,8.8954305 16,10 L16,14 C16,15.1045695 15.1045695,16 14,16 L10,16 C8.8954305,16 8,15.1045695 8,14 L8,10 C8,8.8954305 8.8954305,8 10,8 Z M10,9.7 C9.83431458,9.7 9.7,9.83431458 9.7,10 L9.7,14 C9.7,14.1656854 9.83431458,14.3 10,14.3 L14,14.3 C14.1656854,14.3 14.3,14.1656854 14.3,14 L14.3,10 C14.3,9.83431458 14.1656854,9.7 14,9.7 L10,9.7 Z"
                id="Icon_center"
            />
        </svg>
    );
}

const MemoIconCenter = React.memo(IconCenter);
export default MemoIconCenter;
