import React, { memo } from "react";
import { GeneratedIconProps } from "@components/Icon/IconProps";
import { IconSize, IconSizeMap } from "@components/Icon/IconSize";

function IconStorybook(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
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
            name="IconStorybook"
            {...props}
        >
            <path d="M15.072 2.432 14.976 4.6a.144.144 0 0 0 .232.12l.848-.64.72.56A.144.144 0 0 0 17 4.528l-.08-2.208 1.064-.08a.96.96 0 0 1 1.024.96v17.28a.96.96 0 0 1-1.008.96l-12.88-.576a.96.96 0 0 1-.92-.928l-.6-15.84a.96.96 0 0 1 .904-1.016l10.56-.664.008.016zM12.616 9.68c0 .376 2.528.192 2.872-.064 0-2.56-1.376-3.912-3.888-3.912-2.52 0-3.92 1.376-3.92 3.432 0 3.56 4.8 3.624 4.8 5.568 0 .56-.256.88-.84.88-.768 0-1.08-.392-1.04-1.728 0-.288-2.92-.384-3.016 0-.216 3.224 1.784 4.16 4.08 4.16 2.232 0 3.976-1.192 3.976-3.344 0-3.816-4.88-3.712-4.88-5.6 0-.776.576-.88.904-.88.36 0 1 .056.952 1.496z" />
        </svg>
    );
}

const Memo = memo(IconStorybook);
export default Memo;
