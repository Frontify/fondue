import * as React from "react";
import { IconProps } from "@elements/Icon/IconProps";
import { IconSize, IconSizeMap } from "@elements/Icon/IconSize";

function IconVolumeOff(props: IconProps): React.ReactElement<IconProps> {
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
            name="IconVolumeOff"
            {...props}
        >
            <path d="M13.747 3.562a1 1 0 01.253.665v15.546a1 1 0 01-1.664.748L7.25 16H5a2 2 0 01-2-2v-4a2 2 0 012-2h2.249l5.087-4.52a1 1 0 011.411.082zM12.5 5.34L7.82 9.5H5a.5.5 0 00-.5.5v4a.5.5 0 00.5.5h2.82l4.68 4.16V5.34zm6.854 3.88a.75.75 0 111.149.964L18.979 12l1.524 1.816a.75.75 0 01-.013.98l-.08.077a.75.75 0 01-1.056-.093l-1.355-1.613-1.353 1.613a.75.75 0 01-.966.158l-.09-.065a.75.75 0 01-.093-1.057L17.02 12l-1.523-1.816a.75.75 0 01.013-.98l.08-.077a.75.75 0 011.056.093L18 10.833z" />
        </svg>
    );
}

const MemoIconVolumeOff = React.memo(IconVolumeOff);
export default MemoIconVolumeOff;
