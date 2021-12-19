import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconLogoGrid(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = [
        "tw-flex tw-items-center tw-justify-center tw-fill-current",
        IconSizeMap[props.size || IconSize.Size16],
    ].join(" ");
    return (
        <svg
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="100%"
            height="100%"
            className={customClassName}
            name="IconLogoGrid"
            {...props}
        >
            <path d="m8.343 4.462-.013-.017a8.519 8.519 0 1 1 7.396 14.997 8.519 8.519 0 1 1-7.383-14.98Zm3.736-.138a8.521 8.521 0 0 1 6.063 12.182 7.037 7.037 0 0 0-6.063-12.182Zm-1.56 15.413a7.037 7.037 0 1 0 0-14.074 7.037 7.037 0 0 0 0 14.074Zm3.746-10.636c1.333.897 1.347 2.783.489 4.62-.791 1.694-2.865 3.75-4.208 3.793h-.065c-1.334-.042-3.407-2.1-4.198-3.793-.858-1.837-.844-3.723.49-4.62 1.24-.834 2.535-.562 3.746.648 1.21-1.21 2.506-1.482 3.746-.648Zm-.853 3.993c.587-1.256.578-2.392.026-2.764-.686-.46-1.39-.217-2.335.996a.74.74 0 0 1-1.169 0c-.945-1.213-1.65-1.457-2.335-.996-.552.372-.56 1.508.026 2.764.58 1.24 2.27 2.918 2.88 2.94.635-.02 2.327-1.699 2.907-2.94Z" />
        </svg>
    );
}

const Memo = memo(IconLogoGrid);
export default Memo;
