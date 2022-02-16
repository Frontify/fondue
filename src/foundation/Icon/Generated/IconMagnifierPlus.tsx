
    import React, { memo } from "react";
    import { GeneratedIconProps } from "@foundation/Icon/IconProps";
    import { IconSize } from "@foundation/Icon/IconSize";

    import IconMagnifierPlus12 from './IconMagnifierPlus12';import IconMagnifierPlus16 from './IconMagnifierPlus16';import IconMagnifierPlus20 from './IconMagnifierPlus20';import IconMagnifierPlus24 from './IconMagnifierPlus24';import IconMagnifierPlus32 from './IconMagnifierPlus32'
    
    function IconMagnifierPlus(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
        const size = props.size || IconSize.Size16;
        return (
            <span>
                {size === IconSize.Size12 && !props.filled && (
                    <IconMagnifierPlus12/>
                )}{size === IconSize.Size16 && !props.filled && (
                    <IconMagnifierPlus16/>
                )}{size === IconSize.Size20 && !props.filled && (
                    <IconMagnifierPlus20/>
                )}{size === IconSize.Size24 && !props.filled && (
                    <IconMagnifierPlus24/>
                )}{size === IconSize.Size32 && !props.filled && (
                    <IconMagnifierPlus32/>
                )}
            </span>
        );
    }
    
    const Memo = memo(IconMagnifierPlus);
    export default Memo;
    