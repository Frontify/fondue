
    import React, { memo } from "react";
    import { GeneratedIconProps } from "@foundation/Icon/IconProps";
    import { IconSize } from "@foundation/Icon/IconSize";

    import IconLockOpen12Filled from './IconLockOpen12Filled';import IconLockOpen12 from './IconLockOpen12';import IconLockOpen16Filled from './IconLockOpen16Filled';import IconLockOpen16 from './IconLockOpen16';import IconLockOpen20Filled from './IconLockOpen20Filled';import IconLockOpen20 from './IconLockOpen20';import IconLockOpen24Filled from './IconLockOpen24Filled';import IconLockOpen24 from './IconLockOpen24';import IconLockOpen32Filled from './IconLockOpen32Filled';import IconLockOpen32 from './IconLockOpen32'
    
    function IconLockOpen(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
        const size = props.size || IconSize.Size16;
        return (
            <span>
                {size === IconSize.Size12 && props.filled && (
                    <IconLockOpen12Filled/>
                )}{size === IconSize.Size12 && !props.filled && (
                    <IconLockOpen12/>
                )}{size === IconSize.Size16 && props.filled && (
                    <IconLockOpen16Filled/>
                )}{size === IconSize.Size16 && !props.filled && (
                    <IconLockOpen16/>
                )}{size === IconSize.Size20 && props.filled && (
                    <IconLockOpen20Filled/>
                )}{size === IconSize.Size20 && !props.filled && (
                    <IconLockOpen20/>
                )}{size === IconSize.Size24 && props.filled && (
                    <IconLockOpen24Filled/>
                )}{size === IconSize.Size24 && !props.filled && (
                    <IconLockOpen24/>
                )}{size === IconSize.Size32 && props.filled && (
                    <IconLockOpen32Filled/>
                )}{size === IconSize.Size32 && !props.filled && (
                    <IconLockOpen32/>
                )}
            </span>
        );
    }
    
    const Memo = memo(IconLockOpen);
    export default Memo;
    