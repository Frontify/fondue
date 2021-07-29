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

function IconPlay(props: IconProps): React.ReactElement<IconProps> {
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
                d="M13.8682431,5.5194255 L21.1450635,18.2538611 C21.4190734,18.7333785 21.2524767,19.3442332 20.7729593,19.6182431 C20.6218616,19.7045847 20.4508473,19.75 20.2768203,19.75 L5.72317968,19.75 C5.17089493,19.75 4.72317968,19.3022847 4.72317968,18.75 C4.72317968,18.5759731 4.768595,18.4049588 4.85493654,18.2538611 L12.1317569,5.5194255 C12.4057668,5.03990805 13.0166215,4.87331133 13.4961389,5.14732129 C13.6511702,5.2359106 13.7796538,5.36439422 13.8682431,5.5194255 Z"
                id="Triangle"
                transform="translate(13.000000, 11.875000) rotate(-270.000000) translate(-13.000000, -11.875000) "
            />
        </svg>
    );
}

const MemoIconPlay = React.memo(IconPlay);
export default MemoIconPlay;
