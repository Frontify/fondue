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

function IconLightningFilled(props: IconProps): React.ReactElement<IconProps> {
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
            <g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                <g transform="translate(4.000000, 2.000000)" fillRule="nonzero">
                    <path
                        d="M0.58330756,11.9077949 L6.93601884,11.9077949 L3.98806358,19.1980086 C3.86729476,19.4966666 4.01150245,19.8366792 4.31016048,19.9574481 C4.52020981,20.042386 4.76044192,19.9980053 4.92627948,19.8436256 L16.5336801,9.03819089 C16.7694757,8.81868659 16.7826825,8.44959305 16.5631782,8.21379741 C16.4528337,8.0952633 16.2981776,8.02793784 16.1362324,8.02793784 L9.35428589,8.02793784 L12.1415096,0.793016689 C12.2573204,0.492401357 12.1075068,0.154821258 11.8068915,0.0390104331 C11.5941491,-0.0429476709 11.3531563,0.00654910345 11.1899396,0.165724255 L0.176049704,10.9068892 C-0.0545835164,11.1318115 -0.05921313,11.5011122 0.165709173,11.7317455 C0.27549084,11.8443145 0.426069477,11.9077949 0.58330756,11.9077949 Z"
                        id="Path"
                    />
                </g>
            </g>
        </svg>
    );
}

const MemoIconLightningFilled = React.memo(IconLightningFilled);
export default MemoIconLightningFilled;
