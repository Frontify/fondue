import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconSpinner(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
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
            name="IconSpinner"
            {...props}
        >
            <path d="M6.861 19.36q0 .737-.52 1.258-.521.52-1.257.52-.722 0-1.25-.527-.528-.528-.528-1.25 0-.736.52-1.257.522-.52 1.258-.52t1.256.52q.521.52.521 1.257zm6.917 2.862q0 .736-.521 1.257Q12.736 24 12 24q-.736 0-1.257-.52-.52-.522-.52-1.258t.52-1.257q.521-.52 1.257-.52.736 0 1.257.52.52.521.52 1.257zM4 12.444q0 .736-.52 1.257-.522.521-1.258.521t-1.257-.52q-.52-.522-.52-1.258t.52-1.256q.521-.521 1.257-.521.736 0 1.257.52.521.521.521 1.257zm16.694 6.917q0 .722-.528 1.25t-1.25.528q-.736 0-1.256-.521-.521-.521-.521-1.257 0-.736.52-1.257.521-.52 1.257-.52.736 0 1.257.52.521.52.521 1.257zM7.306 5.528q0 .916-.653 1.57-.652.653-1.57.652-.917 0-1.57-.652-.652-.652-.652-1.57t.653-1.57q.652-.651 1.57-.652.917-.001 1.57.652.652.654.652 1.57zm16.25 6.916q0 .736-.521 1.257-.521.521-1.257.521-.736 0-1.257-.52Q20 13.18 20 12.443t.52-1.256q.522-.521 1.258-.521t1.257.52q.52.521.52 1.257zm-8.89-9.777q0 1.11-.777 1.889-.778.777-1.889.777t-1.889-.777q-.778-.778-.778-1.89 0-1.11.778-1.888Q10.89 0 12 0t1.889.778q.778.778.778 1.889zm7.362 2.861q0 1.292-.917 2.202-.916.91-2.195.91-1.291 0-2.201-.91-.91-.91-.91-2.202 0-1.277.91-2.195.909-.917 2.201-.916 1.278 0 2.195.916.917.917.917 2.195z" />
        </svg>
    );
}

const Memo = memo(IconSpinner);
export default Memo;
