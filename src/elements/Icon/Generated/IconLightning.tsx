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

function IconLightning(props: IconProps): React.ReactElement<IconProps> {
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
                d="M5.4377661,13.421375 L11.1384581,13.421375 L8.25892765,20.5423759 L18.9598853,10.5807572 L12.9089802,10.5807572 L15.6523166,3.45975627 L5.4377661,13.421375 Z M14.9908028,9.16044824 L18.9598853,9.16044824 C19.6084314,9.16044824 20.0526789,9.45877499 20.2926409,10.0554374 C20.532603,10.6520999 20.4126238,11.170929 19.9326996,11.6119404 L9.23174198,21.5735591 C8.67399231,22.092396 8.08382419,22.1377936 7.4612199,21.7097531 C6.83861562,21.2817127 6.66351079,20.7110006 6.93590016,19.9975999 L9.03717912,14.8416839 L5.4377661,14.8416839 C4.80219089,14.8416839 4.36442882,14.5465999 4.12446675,13.9564229 C3.88450468,13.3662459 3.99151319,12.8506595 4.44549548,12.4096481 L14.6600459,2.44802936 C15.2048247,1.91622154 15.7949928,1.85785326 16.430568,2.27292278 C17.0661432,2.68799231 17.2477334,3.25221898 16.9753441,3.96561972 L14.9908028,9.16044824 Z"
                id="Icon_Lightning"
            />
        </svg>
    );
}

const MemoIconLightning = React.memo(IconLightning);
export default MemoIconLightning;
