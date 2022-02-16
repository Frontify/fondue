
    import React, { memo } from "react";
    import { GeneratedIconProps } from "@foundation/Icon/IconProps";
    import { IconSize } from "@foundation/Icon/IconSize";

    import IconClock12 from './IconClock12';import IconClock16 from './IconClock16';import IconClock20 from './IconClock20';import IconClock24 from './IconClock24';import IconClock32 from './IconClock32'
    
    function IconClock(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
        const size = props.size || IconSize.Size16;
        return (
            <span>
                {size === IconSize.Size12 && !props.filled && (
                    <IconClock12/>
                )}{size === IconSize.Size16 && !props.filled && (
                    <IconClock16/>
                )}{size === IconSize.Size20 && !props.filled && (
                    <IconClock20/>
                )}{size === IconSize.Size24 && !props.filled && (
                    <IconClock24/>
                )}{size === IconSize.Size32 && !props.filled && (
                    <IconClock32/>
                )}
            </span>
        );
    }
    
    const Memo = memo(IconClock);
    export default Memo;
    