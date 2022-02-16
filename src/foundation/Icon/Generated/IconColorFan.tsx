
    import React, { memo } from "react";
    import { GeneratedIconProps } from "@foundation/Icon/IconProps";
    import { IconSize } from "@foundation/Icon/IconSize";

    import IconColorFan12 from './IconColorFan12';import IconColorFan16 from './IconColorFan16';import IconColorFan20 from './IconColorFan20';import IconColorFan24 from './IconColorFan24';import IconColorFan32 from './IconColorFan32'
    
    function IconColorFan(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
        const size = props.size || IconSize.Size16;
        return (
            <span>
                {size === IconSize.Size12 && !props.filled && (
                    <IconColorFan12/>
                )}{size === IconSize.Size16 && !props.filled && (
                    <IconColorFan16/>
                )}{size === IconSize.Size20 && !props.filled && (
                    <IconColorFan20/>
                )}{size === IconSize.Size24 && !props.filled && (
                    <IconColorFan24/>
                )}{size === IconSize.Size32 && !props.filled && (
                    <IconColorFan32/>
                )}
            </span>
        );
    }
    
    const Memo = memo(IconColorFan);
    export default Memo;
    