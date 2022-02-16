
    import React, { memo } from "react";
    import { GeneratedIconProps } from "@foundation/Icon/IconProps";
    import { IconSize } from "@foundation/Icon/IconSize";

    import IconArrowRoundClockwise12 from './IconArrowRoundClockwise12';import IconArrowRoundClockwise16 from './IconArrowRoundClockwise16';import IconArrowRoundClockwise20 from './IconArrowRoundClockwise20';import IconArrowRoundClockwise24 from './IconArrowRoundClockwise24';import IconArrowRoundClockwise32 from './IconArrowRoundClockwise32'
    
    function IconArrowRoundClockwise(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
        const size = props.size || IconSize.Size16;
        return (
            <span>
                {size === IconSize.Size12 && !props.filled && (
                    <IconArrowRoundClockwise12/>
                )}{size === IconSize.Size16 && !props.filled && (
                    <IconArrowRoundClockwise16/>
                )}{size === IconSize.Size20 && !props.filled && (
                    <IconArrowRoundClockwise20/>
                )}{size === IconSize.Size24 && !props.filled && (
                    <IconArrowRoundClockwise24/>
                )}{size === IconSize.Size32 && !props.filled && (
                    <IconArrowRoundClockwise32/>
                )}
            </span>
        );
    }
    
    const Memo = memo(IconArrowRoundClockwise);
    export default Memo;
    