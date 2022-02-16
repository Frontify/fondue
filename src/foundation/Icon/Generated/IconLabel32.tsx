import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconLabel32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconLabel32"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M28.687 20.034c.43-.431.646-.965.646-1.601 0-.596-.215-1.13-.646-1.602L16.092 4.268c-.451-.431-1.046-.8-1.785-1.109-.76-.328-1.448-.492-2.064-.492H4.915a2.09 2.09 0 0 0-1.57.677c-.452.452-.678.985-.678 1.601v7.298c0 .637.154 1.324.462 2.063.308.76.687 1.355 1.139 1.786l12.594 12.595c.431.43.955.646 1.57.646.617 0 1.15-.215 1.602-.646l8.653-8.653ZM14.558 5.875c8.369 8.352 12.555 12.548 12.557 12.587-5.77 5.766-8.664 8.65-8.681 8.653L5.839 14.521c-.243-.233-.454-.565-.651-1.05-.209-.501-.3-.904-.3-1.228-.007-4.859.001-7.31.027-7.354h7.328c.287 0 .683.094 1.181.31.529.22.894.447 1.134.676Zm-.78 4.57c0 .896-.336 1.727-1.008 2.398a3.329 3.329 0 0 1-2.325.935c-.879 0-1.691-.329-2.363-.97a3.295 3.295 0 0 1-.97-2.364c0-.892.339-1.716.97-2.347a3.303 3.303 0 0 1 2.363-.986c.9 0 1.727.35 2.362.986.631.63.97 1.455.97 2.347Zm-2.542-.777c.213.213.32.472.32.776 0 .315-.107.579-.32.792-.223.213-.487.32-.792.32-.304 0-.568-.107-.791-.32a1.075 1.075 0 0 1-.32-.792c0-.304.107-.563.32-.776.223-.223.487-.335.791-.335.305 0 .569.112.792.335Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconLabel32);
export default Memo;
