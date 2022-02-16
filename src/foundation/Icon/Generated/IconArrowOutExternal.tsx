
    import React, { memo } from "react";
    import { GeneratedIconProps } from "@foundation/Icon/IconProps";
    import { IconSize } from "@foundation/Icon/IconSize";

    import IconArrowOutExternal12 from './IconArrowOutExternal12';import IconArrowOutExternal16 from './IconArrowOutExternal16';import IconArrowOutExternal20 from './IconArrowOutExternal20';import IconArrowOutExternal24 from './IconArrowOutExternal24';import IconArrowOutExternal32 from './IconArrowOutExternal32'
    
    function IconArrowOutExternal(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
        const size = props.size || IconSize.Size16;
        return (
            <span>
                {size === IconSize.Size12 && !props.filled && (
                    <IconArrowOutExternal12/>
                )}{size === IconSize.Size16 && !props.filled && (
                    <IconArrowOutExternal16/>
                )}{size === IconSize.Size20 && !props.filled && (
                    <IconArrowOutExternal20/>
                )}{size === IconSize.Size24 && !props.filled && (
                    <IconArrowOutExternal24/>
                )}{size === IconSize.Size32 && !props.filled && (
                    <IconArrowOutExternal32/>
                )}
            </span>
        );
    }
    
    const Memo = memo(IconArrowOutExternal);
    export default Memo;
    