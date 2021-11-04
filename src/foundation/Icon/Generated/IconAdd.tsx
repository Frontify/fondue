import React from "react";
import { IconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconAdd(props: IconProps): React.ReactElement<IconProps> {
    const customClassName = [
        "tw-flex tw-items-center tw-justify-center tw-fill-current",
        IconSizeMap[props.size || IconSize.Size16],
    ].join(" ");
    return (
        <svg
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            width="100%"
            height="100%"
            className={customClassName}
            name="IconAdd"
            {...props}
        >
            <path d="M16 29.333c-1.84 0-3.572-.347-5.195-1.041A13.38 13.38 0 016.56 25.44a13.38 13.38 0 01-2.852-4.245C3.014 19.572 2.667 17.84 2.667 16c0-1.84.347-3.572 1.041-5.195A13.38 13.38 0 016.56 6.56a13.38 13.38 0 014.245-2.852C12.428 3.014 14.16 2.667 16 2.667c1.84 0 3.572.347 5.195 1.041A13.38 13.38 0 0125.44 6.56a13.38 13.38 0 012.852 4.245c.694 1.623 1.041 3.355 1.041 5.195 0 1.84-.347 3.572-1.041 5.195a13.38 13.38 0 01-2.852 4.245 13.38 13.38 0 01-4.245 2.852c-1.623.694-3.355 1.041-5.195 1.041zm0-1.9c1.58 0 3.064-.3 4.453-.9a11.55 11.55 0 003.633-2.447 11.55 11.55 0 002.448-3.633c.599-1.389.898-2.873.898-4.453s-.3-3.064-.898-4.453a11.55 11.55 0 00-2.448-3.633 11.55 11.55 0 00-3.633-2.448A11.124 11.124 0 0016 4.568c-1.58 0-3.064.3-4.453.898a11.55 11.55 0 00-3.633 2.448 11.55 11.55 0 00-2.448 3.633A11.124 11.124 0 004.568 16c0 1.58.3 3.064.898 4.453a11.55 11.55 0 002.448 3.633 11.55 11.55 0 003.633 2.448c1.389.599 2.873.898 4.453.898zm0-4.767a.958.958 0 01-.958-.958v-4.75h-4.75a.958.958 0 110-1.916h4.75v-4.75a.958.958 0 111.916 0v4.75h4.75a.958.958 0 110 1.916h-4.75v4.75a.958.958 0 01-.958.958z" />
        </svg>
    );
}

const MemoIconAdd = React.memo(IconAdd);
export default MemoIconAdd;
