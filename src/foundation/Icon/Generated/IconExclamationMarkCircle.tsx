
    import React, { memo } from "react";
    import { GeneratedIconProps } from "@foundation/Icon/IconProps";
    import { IconSize } from "@foundation/Icon/IconSize";

    import IconExclamationMarkCircle12Filled from './IconExclamationMarkCircle12Filled';import IconExclamationMarkCircle12 from './IconExclamationMarkCircle12';import IconExclamationMarkCircle16Filled from './IconExclamationMarkCircle16Filled';import IconExclamationMarkCircle16 from './IconExclamationMarkCircle16';import IconExclamationMarkCircle20Filled from './IconExclamationMarkCircle20Filled';import IconExclamationMarkCircle20 from './IconExclamationMarkCircle20';import IconExclamationMarkCircle24Filled from './IconExclamationMarkCircle24Filled';import IconExclamationMarkCircle24 from './IconExclamationMarkCircle24';import IconExclamationMarkCircle32Filled from './IconExclamationMarkCircle32Filled';import IconExclamationMarkCircle32 from './IconExclamationMarkCircle32'
    
    function IconExclamationMarkCircle(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
        const size = props.size || IconSize.Size16;
        return (
            <span>
                {size === IconSize.Size12 && props.filled && (
                    <IconExclamationMarkCircle12Filled/>
                )}{size === IconSize.Size12 && !props.filled && (
                    <IconExclamationMarkCircle12/>
                )}{size === IconSize.Size16 && props.filled && (
                    <IconExclamationMarkCircle16Filled/>
                )}{size === IconSize.Size16 && !props.filled && (
                    <IconExclamationMarkCircle16/>
                )}{size === IconSize.Size20 && props.filled && (
                    <IconExclamationMarkCircle20Filled/>
                )}{size === IconSize.Size20 && !props.filled && (
                    <IconExclamationMarkCircle20/>
                )}{size === IconSize.Size24 && props.filled && (
                    <IconExclamationMarkCircle24Filled/>
                )}{size === IconSize.Size24 && !props.filled && (
                    <IconExclamationMarkCircle24/>
                )}{size === IconSize.Size32 && props.filled && (
                    <IconExclamationMarkCircle32Filled/>
                )}{size === IconSize.Size32 && !props.filled && (
                    <IconExclamationMarkCircle32/>
                )}
            </span>
        );
    }
    
    const Memo = memo(IconExclamationMarkCircle);
    export default Memo;
    