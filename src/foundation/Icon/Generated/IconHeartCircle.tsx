
    import React, { memo } from "react";
    import { GeneratedIconProps } from "@foundation/Icon/IconProps";
    import { IconSize } from "@foundation/Icon/IconSize";

    import IconHeartCircle12 from './IconHeartCircle12';import IconHeartCircle16 from './IconHeartCircle16';import IconHeartCircle20 from './IconHeartCircle20';import IconHeartCircle24 from './IconHeartCircle24';import IconHeartCircle32 from './IconHeartCircle32'
    
    function IconHeartCircle(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
        const size = props.size || IconSize.Size16;
        return (
            <span>
                {size === IconSize.Size12 && !props.filled && (
                    <IconHeartCircle12/>
                )}{size === IconSize.Size16 && !props.filled && (
                    <IconHeartCircle16/>
                )}{size === IconSize.Size20 && !props.filled && (
                    <IconHeartCircle20/>
                )}{size === IconSize.Size24 && !props.filled && (
                    <IconHeartCircle24/>
                )}{size === IconSize.Size32 && !props.filled && (
                    <IconHeartCircle32/>
                )}
            </span>
        );
    }
    
    const Memo = memo(IconHeartCircle);
    export default Memo;
    