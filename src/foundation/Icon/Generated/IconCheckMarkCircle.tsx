
    import React, { memo } from "react";
    import { GeneratedIconProps } from "@foundation/Icon/IconProps";
    import { IconSize } from "@foundation/Icon/IconSize";

    import IconCheckMarkCircle12Filled from './IconCheckMarkCircle12Filled';import IconCheckMarkCircle12 from './IconCheckMarkCircle12';import IconCheckMarkCircle16Filled from './IconCheckMarkCircle16Filled';import IconCheckMarkCircle16 from './IconCheckMarkCircle16';import IconCheckMarkCircle20Filled from './IconCheckMarkCircle20Filled';import IconCheckMarkCircle20 from './IconCheckMarkCircle20';import IconCheckMarkCircle24Filled from './IconCheckMarkCircle24Filled';import IconCheckMarkCircle24 from './IconCheckMarkCircle24';import IconCheckMarkCircle32Filled from './IconCheckMarkCircle32Filled';import IconCheckMarkCircle32 from './IconCheckMarkCircle32'
    
    function IconCheckMarkCircle(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
        const size = props.size || IconSize.Size16;
        return (
            <span>
                {size === IconSize.Size12 && props.filled && (
                    <IconCheckMarkCircle12Filled/>
                )}{size === IconSize.Size12 && !props.filled && (
                    <IconCheckMarkCircle12/>
                )}{size === IconSize.Size16 && props.filled && (
                    <IconCheckMarkCircle16Filled/>
                )}{size === IconSize.Size16 && !props.filled && (
                    <IconCheckMarkCircle16/>
                )}{size === IconSize.Size20 && props.filled && (
                    <IconCheckMarkCircle20Filled/>
                )}{size === IconSize.Size20 && !props.filled && (
                    <IconCheckMarkCircle20/>
                )}{size === IconSize.Size24 && props.filled && (
                    <IconCheckMarkCircle24Filled/>
                )}{size === IconSize.Size24 && !props.filled && (
                    <IconCheckMarkCircle24/>
                )}{size === IconSize.Size32 && props.filled && (
                    <IconCheckMarkCircle32Filled/>
                )}{size === IconSize.Size32 && !props.filled && (
                    <IconCheckMarkCircle32/>
                )}
            </span>
        );
    }
    
    const Memo = memo(IconCheckMarkCircle);
    export default Memo;
    