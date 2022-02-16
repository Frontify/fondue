import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconLayersSingle20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconLayersSingle20"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="m17.43 9.4-7.096-3.766a.708.708 0 0 0-.665 0L2.571 9.399a.754.754 0 0 0 .009 1.327l7.111 3.645a.707.707 0 0 0 .649 0l7.081-3.644a.754.754 0 0 0 .008-1.327Zm-7.416 3.473-5.51-2.824 5.497-2.916L15.5 10.05l-5.485 2.822Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconLayersSingle20);
export default Memo;
