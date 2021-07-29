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

function IconTemplate(props: IconProps): React.ReactElement<IconProps> {
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
            <g transform="translate(2.000000, 6.000000)">
                <path d="M10.4009493,0.76061233 L18.9148844,5.28013874 C19.34151,5.50660814 19.508609,6.04541135 19.2881104,6.4835894 C19.2036588,6.65141279 19.0695688,6.78740914 18.9051189,6.87202593 L10.4073742,11.2444918 C10.1626675,11.3704042 9.87452244,11.3706354 9.62962449,11.2451159 L1.09610621,6.8713613 C0.666400413,6.65112064 0.491888207,6.11480222 0.70632229,5.67346059 C0.78869545,5.50392268 0.921432323,5.36568527 1.08534079,5.27873576 L9.60266862,0.760498048 C9.85305858,0.627672191 10.1505954,0.627714787 10.4009493,0.76061233 Z M10.0015649,2.5592593 L3.40506119,6.05854597 L10.0171322,9.44748531 L16.5984161,6.06112337 L10.0015649,2.5592593 Z" />
            </g>
        </svg>
    );
}

const MemoIconTemplate = React.memo(IconTemplate);
export default MemoIconTemplate;
