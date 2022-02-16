
    import React, { memo } from "react";
    import { GeneratedIconProps } from "@foundation/Icon/IconProps";
    import { IconSize } from "@foundation/Icon/IconSize";

    import IconArrowSync12 from './IconArrowSync12';import IconArrowSync16 from './IconArrowSync16';import IconArrowSync20 from './IconArrowSync20';import IconArrowSync24 from './IconArrowSync24';import IconArrowSync32 from './IconArrowSync32'
    
    function IconArrowSync(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
        const size = props.size || IconSize.Size16;
        return (
            <span>
                {size === IconSize.Size12 && !props.filled && (
                    <IconArrowSync12/>
                )}{size === IconSize.Size16 && !props.filled && (
                    <IconArrowSync16/>
                )}{size === IconSize.Size20 && !props.filled && (
                    <IconArrowSync20/>
                )}{size === IconSize.Size24 && !props.filled && (
                    <IconArrowSync24/>
                )}{size === IconSize.Size32 && !props.filled && (
                    <IconArrowSync32/>
                )}
            </span>
        );
    }
    
    const Memo = memo(IconArrowSync);
    export default Memo;
    