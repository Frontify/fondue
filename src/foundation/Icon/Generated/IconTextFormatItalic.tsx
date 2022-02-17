import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize } from "@foundation/Icon/IconSize";

import IconTextFormatItalic12 from './IconTextFormatItalic12';;
import IconTextFormatItalic16 from './IconTextFormatItalic16';;
import IconTextFormatItalic20 from './IconTextFormatItalic20';;
import IconTextFormatItalic24 from './IconTextFormatItalic24';;
import IconTextFormatItalic32 from './IconTextFormatItalic32';

function IconTextFormatItalic(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconTextFormatItalic12 {...props}/>}
            {size === IconSize.Size16 && !props.filled && <IconTextFormatItalic16 {...props}/>}
            {size === IconSize.Size20 && !props.filled && <IconTextFormatItalic20 {...props}/>}
            {size === IconSize.Size24 && !props.filled && <IconTextFormatItalic24 {...props}/>}
            {size === IconSize.Size32 && !props.filled && <IconTextFormatItalic32 {...props}/>}
        </span>
    );
}

const Memo = memo(IconTextFormatItalic);
export default Memo;