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

function IconCheck(props: IconProps): React.ReactElement<IconProps> {
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
            <path d="M18.1032159,5.32391618 C18.5371315,4.89202794 19.2406477,4.89202794 19.6745633,5.32391618 C20.1084789,5.75580442 20.1084789,6.45603362 19.6745633,6.88792186 L8.50562909,19 L4.27858702,14.1089731 C3.87219798,13.6513242 3.91549383,12.9524223 4.375291,12.547932 C4.83508817,12.1434417 5.53727083,12.1865353 5.94365987,12.6441842 L8.60550088,15.7725835 L18.1032159,5.32391618 Z" />
        </svg>
    );
}

const MemoIconCheck = React.memo(IconCheck);
export default MemoIconCheck;
