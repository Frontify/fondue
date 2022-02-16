
    import React, { memo } from "react";
    import { GeneratedIconProps } from "@foundation/Icon/IconProps";
    import { IconSize } from "@foundation/Icon/IconSize";

    import IconTextBoxStack12 from './IconTextBoxStack12';import IconTextBoxStack16 from './IconTextBoxStack16';import IconTextBoxStack20 from './IconTextBoxStack20';import IconTextBoxStack24 from './IconTextBoxStack24';import IconTextBoxStack32 from './IconTextBoxStack32'
    
    function IconTextBoxStack(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
        const size = props.size || IconSize.Size16;
        return (
            <span>
                {size === IconSize.Size12 && !props.filled && (
                    <IconTextBoxStack12/>
                )}{size === IconSize.Size16 && !props.filled && (
                    <IconTextBoxStack16/>
                )}{size === IconSize.Size20 && !props.filled && (
                    <IconTextBoxStack20/>
                )}{size === IconSize.Size24 && !props.filled && (
                    <IconTextBoxStack24/>
                )}{size === IconSize.Size32 && !props.filled && (
                    <IconTextBoxStack32/>
                )}
            </span>
        );
    }
    
    const Memo = memo(IconTextBoxStack);
    export default Memo;
    