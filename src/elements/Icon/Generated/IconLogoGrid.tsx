import * as React from "react";
import IconProps from "@elements/Icon/IconProps";
import IconSize from "@elements/Icon/IconSize";
const iconSizeMap = {
    [IconSize.Size8]: "h-2 w-2",
    [IconSize.Size12]: "h-3 w-3",
    [IconSize.Size16]: "h-4 w-4",
    [IconSize.Size20]: "h-5 w-5",
    [IconSize.Size24]: "h-6 w-6",
    [IconSize.Size32]: "h-8 w-8",
};

function IconLogoGrid(props: IconProps): React.ReactElement<IconProps> {
    const customClassName = [
        "flex items-center justify-center fill-current",
        iconSizeMap[props.size || IconSize.Size16],
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
            <path d="M8.343 4.462l-.013-.017a8.519 8.519 0 117.396 14.997 8.519 8.519 0 11-7.383-14.98zm3.736-.138a8.521 8.521 0 016.063 12.182 7.037 7.037 0 00-6.063-12.182zm-1.56 15.413a7.037 7.037 0 100-14.074 7.037 7.037 0 000 14.074zm3.746-10.636c1.333.897 1.347 2.783.489 4.62-.791 1.694-2.865 3.75-4.208 3.793h-.065c-1.334-.042-3.407-2.1-4.198-3.793-.858-1.837-.844-3.723.49-4.62 1.24-.834 2.535-.562 3.746.648 1.21-1.21 2.506-1.482 3.746-.648zm-.853 3.993c.587-1.256.578-2.392.026-2.764-.686-.46-1.39-.217-2.335.996a.74.74 0 01-1.169 0c-.945-1.213-1.65-1.457-2.335-.996-.552.372-.56 1.508.026 2.764.58 1.24 2.27 2.918 2.88 2.94.635-.02 2.327-1.699 2.907-2.94z" />
        </svg>
    );
}

const MemoIconLogoGrid = React.memo(IconLogoGrid);
export default MemoIconLogoGrid;
