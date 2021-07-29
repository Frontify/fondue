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

function IconArrowRight(props: IconProps): React.ReactElement<IconProps> {
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
                d="M18.4982425,13.0307692 L3.02564103,13.0307692 C2.45919513,13.0307692 2,12.5715741 2,12.0051282 C2,11.4386823 2.45919513,10.9794872 3.02564103,10.9794872 L18.4982425,10.9794872 L13.0696341,5.55087875 C12.6690963,5.15034101 12.6690963,4.50094104 13.0696341,4.1004033 C13.4701718,3.69986557 14.1195718,3.69986557 14.5201095,4.1004033 L21.6995967,11.2798905 C22.1001344,11.6804282 22.1001344,12.3298282 21.6995967,12.7303659 L14.5201095,19.9098531 C14.1195718,20.3103908 13.4701718,20.3103908 13.0696341,19.9098531 C12.6690963,19.5093154 12.6690963,18.8599154 13.0696341,18.4593777 L18.4982425,13.0307692 Z"
                id="Icon_Arrow_right"
            />
        </svg>
    );
}

const MemoIconArrowRight = React.memo(IconArrowRight);
export default MemoIconArrowRight;
