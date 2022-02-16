
    import React, { memo } from "react";
    import { GeneratedIconProps } from "@foundation/Icon/IconProps";
    import { IconSize } from "@foundation/Icon/IconSize";

    import IconCaretUp12 from './IconCaretUp12';import IconCaretUp16 from './IconCaretUp16';import IconCaretUp20 from './IconCaretUp20';import IconCaretUp24 from './IconCaretUp24';import IconCaretUp32 from './IconCaretUp32'
    
    function IconCaretUp(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
        const size = props.size || IconSize.Size16;
        return (
            <span>
                {size === IconSize.Size12 && !props.filled && (
                    <IconCaretUp12/>
                )}{size === IconSize.Size16 && !props.filled && (
                    <IconCaretUp16/>
                )}{size === IconSize.Size20 && !props.filled && (
                    <IconCaretUp20/>
                )}{size === IconSize.Size24 && !props.filled && (
                    <IconCaretUp24/>
                )}{size === IconSize.Size32 && !props.filled && (
                    <IconCaretUp32/>
                )}
            </span>
        );
    }
    
    const Memo = memo(IconCaretUp);
    export default Memo;
    