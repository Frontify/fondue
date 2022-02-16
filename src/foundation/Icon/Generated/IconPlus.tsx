
    import React, { memo } from "react";
    import { GeneratedIconProps } from "@foundation/Icon/IconProps";
    import { IconSize } from "@foundation/Icon/IconSize";

    import IconPlus12 from './IconPlus12';import IconPlus16 from './IconPlus16';import IconPlus20 from './IconPlus20';import IconPlus24 from './IconPlus24';import IconPlus32 from './IconPlus32'
    
    function IconPlus(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
        const size = props.size || IconSize.Size16;
        return (
            <span>
                {size === IconSize.Size12 && !props.filled && (
                    <IconPlus12/>
                )}{size === IconSize.Size16 && !props.filled && (
                    <IconPlus16/>
                )}{size === IconSize.Size20 && !props.filled && (
                    <IconPlus20/>
                )}{size === IconSize.Size24 && !props.filled && (
                    <IconPlus24/>
                )}{size === IconSize.Size32 && !props.filled && (
                    <IconPlus32/>
                )}
            </span>
        );
    }
    
    const Memo = memo(IconPlus);
    export default Memo;
    