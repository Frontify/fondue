
    import React, { memo } from "react";
    import { GeneratedIconProps } from "@foundation/Icon/IconProps";
    import { IconSize } from "@foundation/Icon/IconSize";

    import IconCodeBox12 from './IconCodeBox12';import IconCodeBox16 from './IconCodeBox16';import IconCodeBox20 from './IconCodeBox20';import IconCodeBox24 from './IconCodeBox24';import IconCodeBox32 from './IconCodeBox32'
    
    function IconCodeBox(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
        const size = props.size || IconSize.Size16;
        return (
            <span>
                {size === IconSize.Size12 && !props.filled && (
                    <IconCodeBox12/>
                )}{size === IconSize.Size16 && !props.filled && (
                    <IconCodeBox16/>
                )}{size === IconSize.Size20 && !props.filled && (
                    <IconCodeBox20/>
                )}{size === IconSize.Size24 && !props.filled && (
                    <IconCodeBox24/>
                )}{size === IconSize.Size32 && !props.filled && (
                    <IconCodeBox32/>
                )}
            </span>
        );
    }
    
    const Memo = memo(IconCodeBox);
    export default Memo;
    