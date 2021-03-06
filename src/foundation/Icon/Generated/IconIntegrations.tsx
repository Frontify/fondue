import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconIntegrations(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
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
            name="IconIntegrations"
            {...props}
        >
            <path d="M2.77 6.881a.736.736 0 0 1-.547-.227A.743.743 0 0 1 2 6.116c0-.22.074-.407.223-.559a.736.736 0 0 1 .547-.227h16.596L17.42 3.344a.767.767 0 0 1-.222-.558c0-.22.074-.407.222-.558A.736.736 0 0 1 17.968 2c.216 0 .398.076.547.228l3.262 3.33c.068.082.122.172.162.268.04.097.061.193.061.29 0 .096-.02.193-.06.29-.041.096-.095.186-.163.268l-3.262 3.33a.736.736 0 0 1-.547.228.736.736 0 0 1-.548-.228.827.827 0 0 1-.222-.569c0-.213.074-.396.222-.548l1.966-2.006H2.77ZM4.614 18.65l1.966 2.007a.755.755 0 0 1 .222.548.755.755 0 0 1-.222.548.76.76 0 0 1-.558.248.725.725 0 0 1-.537-.228l-3.262-3.35a.784.784 0 0 1-.162-.248.743.743 0 0 1-.061-.29c0-.11.017-.214.05-.31a.568.568 0 0 1 .173-.248l3.262-3.33a.725.725 0 0 1 .537-.228c.21 0 .395.076.558.228a.755.755 0 0 1 .222.548.827.827 0 0 1-.222.569l-1.946 1.985H21.23c.203 0 .382.076.537.228.155.151.233.33.233.537a.75.75 0 0 1-.233.559.746.746 0 0 1-.537.227H4.614Z" />
        </svg>
    );
}

const Memo = memo(IconIntegrations);
export default Memo;
