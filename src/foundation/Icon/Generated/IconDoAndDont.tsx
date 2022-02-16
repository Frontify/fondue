
    import React, { memo } from "react";
    import { GeneratedIconProps } from "@foundation/Icon/IconProps";
    import { IconSize } from "@foundation/Icon/IconSize";

    import IconDoAndDont12 from './IconDoAndDont12';import IconDoAndDont16 from './IconDoAndDont16';import IconDoAndDont20 from './IconDoAndDont20';import IconDoAndDont24 from './IconDoAndDont24';import IconDoAndDont32 from './IconDoAndDont32'
    
    function IconDoAndDont(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
        const size = props.size || IconSize.Size16;
        return (
            <span>
                {size === IconSize.Size12 && !props.filled && (
                    <IconDoAndDont12/>
                )}{size === IconSize.Size16 && !props.filled && (
                    <IconDoAndDont16/>
                )}{size === IconSize.Size20 && !props.filled && (
                    <IconDoAndDont20/>
                )}{size === IconSize.Size24 && !props.filled && (
                    <IconDoAndDont24/>
                )}{size === IconSize.Size32 && !props.filled && (
                    <IconDoAndDont32/>
                )}
            </span>
        );
    }
    
    const Memo = memo(IconDoAndDont);
    export default Memo;
    