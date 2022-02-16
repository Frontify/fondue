
    import React, { memo } from "react";
    import { GeneratedIconProps } from "@foundation/Icon/IconProps";
    import { IconSize } from "@foundation/Icon/IconSize";

    import IconCap12 from './IconCap12';import IconCap16 from './IconCap16';import IconCap20 from './IconCap20';import IconCap24 from './IconCap24';import IconCap32 from './IconCap32'
    
    function IconCap(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
        const size = props.size || IconSize.Size16;
        return (
            <span>
                {size === IconSize.Size12 && !props.filled && (
                    <IconCap12/>
                )}{size === IconSize.Size16 && !props.filled && (
                    <IconCap16/>
                )}{size === IconSize.Size20 && !props.filled && (
                    <IconCap20/>
                )}{size === IconSize.Size24 && !props.filled && (
                    <IconCap24/>
                )}{size === IconSize.Size32 && !props.filled && (
                    <IconCap32/>
                )}
            </span>
        );
    }
    
    const Memo = memo(IconCap);
    export default Memo;
    