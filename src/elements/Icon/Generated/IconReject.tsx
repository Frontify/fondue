import * as React from "react";
import { IconProps } from "@elements/Icon/IconProps";
import { IconSize, IconSizeMap } from "@elements/Icon/IconSize";

function IconReject(props: IconProps): React.ReactElement<IconProps> {
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
            name="IconReject"
            {...props}
        >
            <path d="M13.507 12l6.18 6.178c.416.416.417 1.091.003 1.508a1.061 1.061 0 01-1.504.003L12 13.506l-6.186 6.183a1.061 1.061 0 01-1.504-.003 1.069 1.069 0 01.003-1.508L10.493 12l-6.18-6.178a1.069 1.069 0 01-.003-1.508 1.061 1.061 0 011.504-.003L12 10.494l6.186-6.183a1.061 1.061 0 011.504.003 1.069 1.069 0 01-.003 1.508L13.507 12z" />
        </svg>
    );
}

const MemoIconReject = React.memo(IconReject);
export default MemoIconReject;
