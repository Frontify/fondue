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

function IconFont(props: IconProps): React.ReactElement<IconProps> {
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
                d="M12.7692308,15.2732441 L14.1070234,15.2732441 L14.1070234,16.8117057 L9.89297659,16.8117057 L9.89297659,15.2732441 L11.2307692,15.2732441 L11.2307692,9.78829431 L9.27272727,9.78829431 L9.27272727,10.7916388 L7.73426573,10.7916388 L7.73426573,8.24983278 L9.27272727,8.24983278 L14.7272727,8.24983278 L16.2657343,8.24983278 L16.2657343,10.7916388 L14.7272727,10.7916388 L14.7272727,9.78829431 L12.7692308,9.78829431 L12.7692308,15.2732441 Z M4.30769231,3.3 L19.6923077,3.3 C20.966811,3.3 22,4.33318904 22,5.60769231 L22,19.4538462 C22,20.7283494 20.966811,21.7615385 19.6923077,21.7615385 L4.30769231,21.7615385 C3.03318904,21.7615385 2,20.7283494 2,19.4538462 L2,5.60769231 C2,4.33318904 3.03318904,3.3 4.30769231,3.3 Z M4.30769231,4.83846154 C3.88285788,4.83846154 3.53846154,5.18285788 3.53846154,5.60769231 L3.53846154,19.4538462 C3.53846154,19.8786806 3.88285788,20.2230769 4.30769231,20.2230769 L19.6923077,20.2230769 C20.1171421,20.2230769 20.4615385,19.8786806 20.4615385,19.4538462 L20.4615385,5.60769231 C20.4615385,5.18285788 20.1171421,4.83846154 19.6923077,4.83846154 L4.30769231,4.83846154 Z"
                id="Icon_Font"
            />
        </svg>
    );
}

const MemoIconFont = React.memo(IconFont);
export default MemoIconFont;
