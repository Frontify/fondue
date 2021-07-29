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

function IconTruck(props: IconProps): React.ReactElement<IconProps> {
    const customClassName = [
        "flex items-center justify-center fill-current",
        iconSizeMap[props.size || IconSize.Size16],
    ].join(" ");
    return (
        <svg
            fill="currentColor"
            className={customClassName}
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 24 24"
            width="100%"
            height="100%"
            {...props}
        >
            <path
                style={{}}
                d="M 0.875 7 C 0.394531 7 0 7.394531 0 7.875 L 0 20.125 C 0 20.605469 0.394531 21 0.875 21 L 3 21 C 3 22.65625 4.34375 24 6 24 C 7.65625 24 9 22.65625 9 21 L 12.125 21 C 12.605469 21 13 20.605469 13 20.125 L 13 7.875 C 13 7.394531 12.605469 7 12.125 7 Z M 14.65625 9 C 14.296875 9 14 9.292969 14 9.65625 L 14 20.34375 C 14 20.613281 14.171875 20.839844 14.40625 20.9375 C 14.484375 20.96875 14.566406 21 14.65625 21 L 16 21 C 16 22.65625 17.34375 24 19 24 C 20.65625 24 22 22.65625 22 21 L 23.34375 21 C 23.433594 21 23.515625 20.972656 23.59375 20.9375 C 23.75 20.871094 23.871094 20.75 23.9375 20.59375 C 23.972656 20.515625 24 20.433594 24 20.34375 L 24 15.1875 C 24 15.058594 23.945313 14.953125 23.875 14.84375 L 20.1875 9.28125 C 20.066406 9.101563 19.875 9 19.65625 9 Z M 17 11 L 19.53125 11 L 22.1875 15 L 17 15 Z M 6 19.5 C 6.828125 19.5 7.5 20.171875 7.5 21 C 7.5 21.828125 6.828125 22.5 6 22.5 C 5.171875 22.5 4.5 21.828125 4.5 21 C 4.5 20.171875 5.171875 19.5 6 19.5 Z M 19 19.5 C 19.828125 19.5 20.5 20.171875 20.5 21 C 20.5 21.828125 19.828125 22.5 19 22.5 C 18.171875 22.5 17.5 21.828125 17.5 21 C 17.5 20.171875 18.171875 19.5 19 19.5 Z "
            />
        </svg>
    );
}

const MemoIconTruck = React.memo(IconTruck);
export default MemoIconTruck;
