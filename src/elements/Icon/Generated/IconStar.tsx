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

function IconStar(props: IconProps): React.ReactElement<IconProps> {
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
                d="M12,16.0659189 L16.1747996,18.2607409 L15.3774838,13.6120333 L18.7549676,10.3198002 L14.0873998,9.64156292 L12,5.412029 L9.91260022,9.64156292 L5.24503241,10.3198002 L8.62251621,13.6120333 L7.82520044,18.2607409 L12,16.0659189 Z M5.81966011,21.0211303 L7,14.1392207 L2,9.26542528 L8.90983006,8.2613682 L12,2 L15.0901699,8.2613682 L22,9.26542528 L17,14.1392207 L18.1803399,21.0211303 L12,17.7719334 L5.81966011,21.0211303 Z"
                id="Icon_Star"
            />
        </svg>
    );
}

const MemoIconStar = React.memo(IconStar);
export default MemoIconStar;
