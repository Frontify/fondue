import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize } from "@foundation/Icon/IconSize";

import IconTrashBinOpen12 from './IconTrashBinOpen12';;
import IconTrashBinOpen16 from './IconTrashBinOpen16';;
import IconTrashBinOpen20 from './IconTrashBinOpen20';;
import IconTrashBinOpen24 from './IconTrashBinOpen24';;
import IconTrashBinOpen32 from './IconTrashBinOpen32';

function IconTrashBinOpen(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconTrashBinOpen12 {...props}/>}
            {size === IconSize.Size16 && !props.filled && <IconTrashBinOpen16 {...props}/>}
            {size === IconSize.Size20 && !props.filled && <IconTrashBinOpen20 {...props}/>}
            {size === IconSize.Size24 && !props.filled && <IconTrashBinOpen24 {...props}/>}
            {size === IconSize.Size32 && !props.filled && <IconTrashBinOpen32 {...props}/>}
        </span>
    );
}

const Memo = memo(IconTrashBinOpen);
export default Memo;