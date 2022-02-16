
    import React, { memo } from "react";
    import { GeneratedIconProps } from "@foundation/Icon/IconProps";
    import { IconSize } from "@foundation/Icon/IconSize";

    import IconCalendarChecked12 from './IconCalendarChecked12';import IconCalendarChecked16 from './IconCalendarChecked16';import IconCalendarChecked20 from './IconCalendarChecked20';import IconCalendarChecked24 from './IconCalendarChecked24';import IconCalendarChecked32 from './IconCalendarChecked32'
    
    function IconCalendarChecked(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
        const size = props.size || IconSize.Size16;
        return (
            <span>
                {size === IconSize.Size12 && !props.filled && (
                    <IconCalendarChecked12/>
                )}{size === IconSize.Size16 && !props.filled && (
                    <IconCalendarChecked16/>
                )}{size === IconSize.Size20 && !props.filled && (
                    <IconCalendarChecked20/>
                )}{size === IconSize.Size24 && !props.filled && (
                    <IconCalendarChecked24/>
                )}{size === IconSize.Size32 && !props.filled && (
                    <IconCalendarChecked32/>
                )}
            </span>
        );
    }
    
    const Memo = memo(IconCalendarChecked);
    export default Memo;
    