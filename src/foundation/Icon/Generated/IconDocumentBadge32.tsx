import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconDocumentBadge32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconDocumentBadge32"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M5.791 7.527c0-2.685 2.203-4.86 4.92-4.86h8.158c.674 0 1.61.364 2.105.826l6.807 6.348c.49.456.886 1.364.886 2.036v12.6c0 2.682-2.194 4.856-4.908 4.856H10.7c-2.71 0-4.908-2.182-4.908-4.86v-.195c-1.432-.5-2.458-1.846-2.458-3.43 0-1.583 1.026-2.93 2.458-3.43v-9.89Zm2.08 17.34v-.382h8.98c2.036 0 3.687-1.628 3.687-3.637 0-2.008-1.651-3.636-3.687-3.636H7.87V7.132c0-1.333 1.097-2.414 2.464-2.414h6.894v8.205c0 .57.463 1.026 1.035 1.026h8.323v10.91c0 1.338-1.1 2.423-2.447 2.423H10.318c-1.352 0-2.447-1.088-2.447-2.415Zm18.716-13.206v.236H19.31V4.911l7.278 6.75ZM5.791 20.848c0-.67.55-1.212 1.229-1.212h9.83a1.22 1.22 0 0 1 1.23 1.212c0 .67-.55 1.212-1.23 1.212H7.02a1.22 1.22 0 0 1-1.229-1.212Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconDocumentBadge32);
export default Memo;
