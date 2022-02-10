import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconLeaf12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconLeaf12"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M9.57 6.294c.514-1.523.614-3.372.184-3.807-.433-.44-2.277-.346-3.82.162-2.017.666-3.31 1.906-3.31 3.694 0 .767.271 1.471.723 2.021l-.863.872a.375.375 0 1 0 .532.528l.872-.88a3.172 3.172 0 0 0 1.918.645c1.823.04 3.087-1.227 3.765-3.235ZM4.423 8.345c.394.274.872.434 1.388.434h.009c1.433.033 2.456-.991 3.04-2.725.428-1.265.515-2.885.361-3.04-.154-.156-1.77-.075-3.05.348-1.745.575-2.796 1.583-2.796 2.981 0 .559.188 1.074.505 1.485l.596-.602.001-.012.197-1.737a.375.375 0 0 1 .745.085l-.09.804L6.68 4.999a.375.375 0 1 1 .533.528l-1.328 1.34.815-.107a.375.375 0 0 1 .098.743l-1.774.234-.603.608Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconLeaf12);
export default Memo;
