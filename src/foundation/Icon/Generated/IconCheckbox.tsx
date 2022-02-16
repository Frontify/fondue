
    import React, { memo } from "react";
    import { GeneratedIconProps } from "@foundation/Icon/IconProps";
    import { IconSize } from "@foundation/Icon/IconSize";

    import IconCheckbox12 from './IconCheckbox12';import IconCheckbox16 from './IconCheckbox16';import IconCheckbox20 from './IconCheckbox20';import IconCheckbox24 from './IconCheckbox24';import IconCheckbox32 from './IconCheckbox32'
    
    function IconCheckbox(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
        const size = props.size || IconSize.Size16;
        return (
            <span>
                {size === IconSize.Size12 && !props.filled && (
                    <IconCheckbox12/>
                )}{size === IconSize.Size16 && !props.filled && (
                    <IconCheckbox16/>
                )}{size === IconSize.Size20 && !props.filled && (
                    <IconCheckbox20/>
                )}{size === IconSize.Size24 && !props.filled && (
                    <IconCheckbox24/>
                )}{size === IconSize.Size32 && !props.filled && (
                    <IconCheckbox32/>
                )}
            </span>
        );
    }
    
    const Memo = memo(IconCheckbox);
    export default Memo;
    