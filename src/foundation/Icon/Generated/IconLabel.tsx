
    import React, { memo } from "react";
    import { GeneratedIconProps } from "@foundation/Icon/IconProps";
    import { IconSize } from "@foundation/Icon/IconSize";

    import IconLabel12 from './IconLabel12';import IconLabel16 from './IconLabel16';import IconLabel20 from './IconLabel20';import IconLabel24 from './IconLabel24';import IconLabel32 from './IconLabel32'
    
    function IconLabel(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
        const size = props.size || IconSize.Size16;
        return (
            <span>
                {size === IconSize.Size12 && !props.filled && (
                    <IconLabel12/>
                )}{size === IconSize.Size16 && !props.filled && (
                    <IconLabel16/>
                )}{size === IconSize.Size20 && !props.filled && (
                    <IconLabel20/>
                )}{size === IconSize.Size24 && !props.filled && (
                    <IconLabel24/>
                )}{size === IconSize.Size32 && !props.filled && (
                    <IconLabel32/>
                )}
            </span>
        );
    }
    
    const Memo = memo(IconLabel);
    export default Memo;
    