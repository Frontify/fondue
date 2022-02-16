
    import React, { memo } from "react";
    import { GeneratedIconProps } from "@foundation/Icon/IconProps";
    import { IconSize } from "@foundation/Icon/IconSize";

    import IconCrossCircle12Filled from './IconCrossCircle12Filled';import IconCrossCircle12 from './IconCrossCircle12';import IconCrossCircle16Filled from './IconCrossCircle16Filled';import IconCrossCircle16 from './IconCrossCircle16';import IconCrossCircle20Filled from './IconCrossCircle20Filled';import IconCrossCircle20 from './IconCrossCircle20';import IconCrossCircle24Filled from './IconCrossCircle24Filled';import IconCrossCircle24 from './IconCrossCircle24';import IconCrossCircle32Filled from './IconCrossCircle32Filled';import IconCrossCircle32 from './IconCrossCircle32'
    
    function IconCrossCircle(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
        const size = props.size || IconSize.Size16;
        return (
            <span>
                {size === IconSize.Size12 && props.filled && (
                    <IconCrossCircle12Filled/>
                )}{size === IconSize.Size12 && !props.filled && (
                    <IconCrossCircle12/>
                )}{size === IconSize.Size16 && props.filled && (
                    <IconCrossCircle16Filled/>
                )}{size === IconSize.Size16 && !props.filled && (
                    <IconCrossCircle16/>
                )}{size === IconSize.Size20 && props.filled && (
                    <IconCrossCircle20Filled/>
                )}{size === IconSize.Size20 && !props.filled && (
                    <IconCrossCircle20/>
                )}{size === IconSize.Size24 && props.filled && (
                    <IconCrossCircle24Filled/>
                )}{size === IconSize.Size24 && !props.filled && (
                    <IconCrossCircle24/>
                )}{size === IconSize.Size32 && props.filled && (
                    <IconCrossCircle32Filled/>
                )}{size === IconSize.Size32 && !props.filled && (
                    <IconCrossCircle32/>
                )}
            </span>
        );
    }
    
    const Memo = memo(IconCrossCircle);
    export default Memo;
    