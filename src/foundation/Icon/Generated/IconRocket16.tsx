import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconRocket16(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconRocket16"
            {...props}
        >
            <g fill="currentColor" fillRule="evenodd" clipRule="evenodd">
                <path d="M9.129 6.927c-.678-.677-.678-1.724 0-2.34.677-.615 1.725-.676 2.341 0 .616.678.678 1.724 0 2.34-.678.615-1.725.677-2.341 0Zm1.663-.677c-.246.307-.678.307-.986 0-.308-.308-.246-.677 0-.985.247-.308.678-.246.986 0 .309.246.309.677 0 .985Z" />
                <path d="M2.597 10.989 3.86 9.113l3.054 3.05L5 13.451l.431.43c1.171 1.047 3.328 1.047 4.93 0 1.577-1.09 2.259-2.956 1.397-4.306 2.268-2.502 3.714-6.468 2.424-7.757-1.294-1.292-5.278.16-7.782 2.435-1.345-.787-3.163-.105-4.235 1.381-1.109 1.6-1.109 3.755 0 4.924l.432.431Zm2.958-6.032-.772 1.149a7.414 7.414 0 0 0-.158.235l-2.09 3.11c-.37-.862-.246-2.217.431-3.201.678-1.047 1.787-1.54 2.589-1.293Zm4.251 8.125c-1.047.677-2.341.8-3.204.43l4.498-3.015c.247.8-.246 1.908-1.294 2.585Zm3.698-10.525c.862.861-.617 4.616-2.773 6.77-.925.923-2.034 1.662-3.081 2.216L4.63 8.527c.432-1.17 1.171-2.277 2.095-3.2 2.095-2.155 5.916-3.632 6.779-2.77Z" />
            </g>
        </svg>
    );
}

const Memo = memo(IconRocket16);
export default Memo;
