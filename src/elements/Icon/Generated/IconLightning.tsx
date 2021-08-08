import * as React from "react";
import { IconProps } from "@elements/Icon/IconProps";
import { IconSize, IconSizeMap } from "@elements/Icon/IconSize";

function IconLightning(props: IconProps): React.ReactElement<IconProps> {
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
            name="IconLightning"
            {...props}
        >
            <path d="M5.438 13.421h5.7l-2.88 7.121 10.702-9.961h-6.051l2.743-7.121L5.438 13.42zm9.553-4.26h3.969c.648 0 1.093.298 1.333.894.24.597.12 1.116-.36 1.557L9.232 21.574c-.558.518-1.148.564-1.77.136-.623-.428-.798-.999-.526-1.712l2.101-5.156h-3.6c-.635 0-1.073-.295-1.313-.886-.24-.59-.132-1.105.321-1.546L14.66 2.448c.545-.532 1.135-.59 1.77-.175.636.415.818.98.545 1.693L14.991 9.16z" />
        </svg>
    );
}

const MemoIconLightning = React.memo(IconLightning);
export default MemoIconLightning;
