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

function IconIndesign(props: IconProps): React.ReactElement<IconProps> {
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
                d="M18,3.25 C19.5187831,3.25 20.75,4.48121694 20.75,6 L20.75,6 L20.75,18 C20.75,19.5187831 19.5187831,20.75 18,20.75 L18,20.75 L6,20.75 C4.48121694,20.75 3.25,19.5187831 3.25,18 L3.25,18 L3.25,6 C3.25,4.48121694 4.48121694,3.25 6,3.25 L6,3.25 Z M18,4.75 L6,4.75 C5.30964406,4.75 4.75,5.30964406 4.75,6 L4.75,6 L4.75,18 C4.75,18.6903559 5.30964406,19.25 6,19.25 L6,19.25 L18,19.25 C18.6903559,19.25 19.25,18.6903559 19.25,18 L19.25,18 L19.25,6 C19.25,5.30964406 18.6903559,4.75 18,4.75 L18,4.75 Z M16.2420852,8 L16.2420852,15.8321678 L14.9441831,15.8321678 L14.9441831,15.0713287 L14.9106167,15.0713287 C14.5637635,15.7426573 13.8588684,16 13.2211062,16 C11.8001272,16 10.7371901,14.8587413 10.7371901,13.1692308 C10.7371901,11.4685315 11.8448824,10.3272727 13.2546726,10.3272727 C14.0267006,10.3272727 14.5861411,10.6965035 14.832295,11.1552448 L14.832295,11.1552448 L14.832295,8 L16.2420852,8 Z M9.23483788,8 L9.23483788,15.8321678 L7.75791481,15.8321678 L7.75791481,8 L9.23483788,8 Z M13.5232041,11.5692308 C12.6728544,11.5692308 12.1581691,12.2517483 12.1581691,13.1692308 C12.1581691,14.0867133 12.6840432,14.7692308 13.5232041,14.7692308 C14.3735537,14.7692308 14.8770502,14.0979021 14.8770502,13.1692308 C14.8770502,12.2293706 14.3735537,11.5692308 13.5232041,11.5692308 Z"
                fillRule="nonzero"
            />
        </svg>
    );
}

const MemoIconIndesign = React.memo(IconIndesign);
export default MemoIconIndesign;
