import React, { memo } from "react";
import { GeneratedIconProps } from "@components/Icon/IconProps";
import { IconSize, IconSizeMap } from "@components/Icon/IconSize";

function IconAlignMiddle(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = [
        "tw-flex tw-items-center tw-justify-center tw-fill-current",
        IconSizeMap[props.size || IconSize.Size16],
    ].join(" ");
    return (
        <svg
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            className={customClassName}
            name="IconAlignMiddle"
            {...props}
        >
            <path d="M5.04 12.77c-.409 0-.74-.345-.74-.77 0-.425.331-.77.74-.77h13.905c.409 0 .74.345.74.77 0 .425-.331.77-.74.77H5.04Zm7.722 3.136v5.325a.77.77 0 0 1-1.539 0v-5.323l-2.596 2.077a.77.77 0 1 1-.961-1.201l3.757-3.006a.766.766 0 0 1 1.043-.08l3.836 3.078a.77.77 0 0 1 .12 1.08.766.766 0 0 1-1.078.12l-2.582-2.07Zm-1.149-5.544a.775.775 0 0 1-.101-.069L7.666 7.216a.77.77 0 1 1 .96-1.201l2.597 2.077V2.769a.77.77 0 0 1 1.539 0v5.332l2.603-2.082a.77.77 0 0 1 .96 1.2l-3.845 3.078a.77.77 0 0 1-.867.065Z" />
        </svg>
    );
}

const Memo = memo(IconAlignMiddle);
export default Memo;
