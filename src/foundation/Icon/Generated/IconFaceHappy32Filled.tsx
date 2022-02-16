import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";

function IconFaceHappy32Filled(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconFaceHappy32Filled"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M10.805 28.291c1.623.695 3.355 1.042 5.195 1.042 1.84 0 3.572-.347 5.195-1.041a13.379 13.379 0 0 0 4.245-2.852 13.38 13.38 0 0 0 2.852-4.245c.694-1.623 1.041-3.355 1.041-5.195 0-1.84-.347-3.572-1.041-5.195A13.38 13.38 0 0 0 25.44 6.56a13.38 13.38 0 0 0-4.245-2.852C19.572 3.014 17.84 2.666 16 2.666c-1.84 0-3.572.348-5.195 1.042A13.38 13.38 0 0 0 6.56 6.56a13.38 13.38 0 0 0-2.852 4.245C3.014 12.428 2.667 14.159 2.667 16c0 1.84.347 3.572 1.041 5.195A13.38 13.38 0 0 0 6.56 25.44a13.379 13.379 0 0 0 4.245 2.851Zm2.77-15.322a1.818 1.818 0 1 1-3.635 0 1.818 1.818 0 0 1 3.636 0Zm6.668 1.819a1.818 1.818 0 1 0 0-3.637 1.818 1.818 0 0 0 0 3.637ZM9.397 17.946a1.212 1.212 0 0 0-.542 1.626c1.42 2.84 3.864 4.307 7.145 4.307 3.282 0 5.725-1.466 7.145-4.307a1.212 1.212 0 1 0-2.168-1.084c-1.004 2.008-2.602 2.966-4.977 2.966-2.375 0-3.972-.958-4.976-2.966a1.212 1.212 0 0 0-1.627-.542Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconFaceHappy32Filled);
export default Memo;
