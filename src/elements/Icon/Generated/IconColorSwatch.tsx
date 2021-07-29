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

function IconColorSwatch(props: IconProps): React.ReactElement<IconProps> {
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
                d="M15.8461538,4.83846154 L12.7692308,4.83846154 L12.7692308,20.2230769 L15.8461538,20.2230769 L15.8461538,4.83846154 Z M17.3846154,4.83846154 L17.3846154,20.2230769 L19.6923077,20.2230769 C20.1171421,20.2230769 20.4615385,19.8786806 20.4615385,19.4538462 L20.4615385,5.60769231 C20.4615385,5.18285788 20.1171421,4.83846154 19.6923077,4.83846154 L17.3846154,4.83846154 Z M11.2307692,4.83846154 L8.92307692,4.83846154 L8.92307692,20.2230769 L11.2307692,20.2230769 L11.2307692,4.83846154 Z M7.38461538,4.83846154 L5.84615385,4.83846154 L5.84615385,20.2230769 L7.38461538,20.2230769 L7.38461538,4.83846154 Z M4.30769231,20.2230769 L4.30769231,4.83846154 C3.88285788,4.83846154 3.53846154,5.18285788 3.53846154,5.60769231 L3.53846154,19.4538462 C3.53846154,19.8786806 3.88285788,20.2230769 4.30769231,20.2230769 Z M4.30769231,3.3 L19.6923077,3.3 C20.966811,3.3 22,4.33318904 22,5.60769231 L22,19.4538462 C22,20.7283494 20.966811,21.7615385 19.6923077,21.7615385 L4.30769231,21.7615385 C3.03318904,21.7615385 2,20.7283494 2,19.4538462 L2,5.60769231 C2,4.33318904 3.03318904,3.3 4.30769231,3.3 Z"
                id="Icon_Gradient"
            />
        </svg>
    );
}

const MemoIconColorSwatch = React.memo(IconColorSwatch);
export default MemoIconColorSwatch;
