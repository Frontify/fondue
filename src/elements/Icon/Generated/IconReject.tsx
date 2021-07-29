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

function IconReject(props: IconProps): React.ReactElement<IconProps> {
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
                d="M13.5065686,12 L19.6872109,18.1777709 C20.1032358,18.5936026 20.104411,19.2689775 19.6898356,19.6862631 C19.2752603,20.1035487 18.6019257,20.1047274 18.1859008,19.6888957 L12,13.5058687 L5.81409918,19.6888957 C5.39807427,20.1047274 4.72473973,20.1035487 4.31016439,19.6862631 C3.89558905,19.2689775 3.89676415,18.5936026 4.31278906,18.1777709 L10.4934314,12 L4.31278906,5.82222907 C3.89676415,5.40639744 3.89558905,4.73102249 4.31016439,4.3137369 C4.72473973,3.89645131 5.39807427,3.89527265 5.81409918,4.31110428 L12,10.4941313 L18.1859008,4.31110428 C18.6019257,3.89527265 19.2752603,3.89645131 19.6898356,4.3137369 C20.104411,4.73102249 20.1032358,5.40639744 19.6872109,5.82222907 L13.5065686,12 Z"
                id="Icon_reject"
            />
        </svg>
    );
}

const MemoIconReject = React.memo(IconReject);
export default MemoIconReject;
