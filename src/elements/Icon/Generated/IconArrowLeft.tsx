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

function IconArrowLeft(props: IconProps): React.ReactElement<IconProps> {
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
                d="M5.5017575,13.0307692 L10.9303659,18.4593777 C11.3309037,18.8599154 11.3309037,19.5093154 10.9303659,19.9098531 C10.5298282,20.3103908 9.88042822,20.3103908 9.47989048,19.9098531 L2.3004033,12.7303659 C1.89986557,12.3298282 1.89986557,11.6804282 2.3004033,11.2798905 L9.47989048,4.1004033 C9.88042822,3.69986557 10.5298282,3.69986557 10.9303659,4.1004033 C11.3309037,4.50094104 11.3309037,5.15034101 10.9303659,5.55087875 L5.5017575,10.9794872 L20.974359,10.9794872 C21.5408049,10.9794872 22,11.4386823 22,12.0051282 C22,12.5715741 21.5408049,13.0307692 20.974359,13.0307692 L5.5017575,13.0307692 Z"
                id="Icon_ArrowLeft"
            />
        </svg>
    );
}

const MemoIconArrowLeft = React.memo(IconArrowLeft);
export default MemoIconArrowLeft;
