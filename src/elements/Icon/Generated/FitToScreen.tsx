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

function IconFitToScreen(props: IconProps): React.ReactElement<IconProps> {
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
            <path d="M6,3.15 L18,3.15 C19.5740115,3.15 20.85,4.42598846 20.85,6 L20.85,18 C20.85,19.5740115 19.5740115,20.85 18,20.85 L6,20.85 C4.42598846,20.85 3.15,19.5740115 3.15,18 L3.15,6 C3.15,4.42598846 4.42598846,3.15 6,3.15 Z M6,4.85 C5.36487254,4.85 4.85,5.36487254 4.85,6 L4.85,18 C4.85,18.6351275 5.36487254,19.15 6,19.15 L18,19.15 C18.6351275,19.15 19.15,18.6351275 19.15,18 L19.15,6 C19.15,5.36487254 18.6351275,4.85 18,4.85 L6,4.85 Z M10,6 L14,6 C15.1045695,6 16,6.8954305 16,8 L16,16 C16,17.1045695 15.1045695,18 14,18 L10,18 C8.8954305,18 8,17.1045695 8,16 L8,8 C8,6.8954305 8.8954305,6 10,6 Z M10,7.7 C9.83431458,7.7 9.7,7.83431458 9.7,8 L9.7,16 C9.7,16.1656854 9.83431458,16.3 10,16.3 L14,16.3 C14.1656854,16.3 14.3,16.1656854 14.3,16 L14.3,8 C14.3,7.83431458 14.1656854,7.7 14,7.7 L10,7.7 Z" />
        </svg>
    );
}

const MemoIconFitToScreen = React.memo(IconFitToScreen);
export default MemoIconFitToScreen;
