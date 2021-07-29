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

function IconArrowUp(props: IconProps): React.ReactElement<IconProps> {
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
                d="M10.9794872,6.0017575 L5.55087875,11.4303659 C5.15034101,11.8309037 4.50094104,11.8309037 4.1004033,11.4303659 C3.69986557,11.0298282 3.69986557,10.3804282 4.1004033,9.97989048 L11.2798905,2.8004033 C11.6804282,2.39986557 12.3298282,2.39986557 12.7303659,2.8004033 L19.9098531,9.97989048 C20.3103908,10.3804282 20.3103908,11.0298282 19.9098531,11.4303659 C19.5093154,11.8309037 18.8599154,11.8309037 18.4593777,11.4303659 L13.0307692,6.0017575 L13.0307692,21.474359 C13.0307692,22.0408049 12.5715741,22.5 12.0051282,22.5 C11.4386823,22.5 10.9794872,22.0408049 10.9794872,21.474359 L10.9794872,6.0017575 Z"
                id="Icon_ArrowUp"
            />
        </svg>
    );
}

const MemoIconArrowUp = React.memo(IconArrowUp);
export default MemoIconArrowUp;
