
    import React, { memo } from "react";
    import { GeneratedIconProps } from "@foundation/Icon/IconProps";
    import { IconSize } from "@foundation/Icon/IconSize";

    import IconLockClosed12 from './IconLockClosed12';import IconLockClosed16 from './IconLockClosed16';import IconLockClosed20 from './IconLockClosed20';import IconLockClosed24 from './IconLockClosed24';import IconLockClosed32 from './IconLockClosed32'
    
    function IconLockClosed(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
        const size = props.size || IconSize.Size16;
        return (
            <span>
                {size === IconSize.Size12 && !props.filled && (
                    <IconLockClosed12/>
                )}{size === IconSize.Size16 && !props.filled && (
                    <IconLockClosed16/>
                )}{size === IconSize.Size20 && !props.filled && (
                    <IconLockClosed20/>
                )}{size === IconSize.Size24 && !props.filled && (
                    <IconLockClosed24/>
                )}{size === IconSize.Size32 && !props.filled && (
                    <IconLockClosed32/>
                )}
            </span>
        );
    }
    
    const Memo = memo(IconLockClosed);
    export default Memo;
    