
    import React, { memo } from "react";
    import { GeneratedIconProps } from "@foundation/Icon/IconProps";
    import { IconSize } from "@foundation/Icon/IconSize";

    import IconDividerDotted12 from './IconDividerDotted12';import IconDividerDotted16 from './IconDividerDotted16';import IconDividerDotted20 from './IconDividerDotted20';import IconDividerDotted24 from './IconDividerDotted24';import IconDividerDotted32 from './IconDividerDotted32'
    
    function IconDividerDotted(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
        const size = props.size || IconSize.Size16;
        return (
            <span>
                {size === IconSize.Size12 && !props.filled && (
                    <IconDividerDotted12/>
                )}{size === IconSize.Size16 && !props.filled && (
                    <IconDividerDotted16/>
                )}{size === IconSize.Size20 && !props.filled && (
                    <IconDividerDotted20/>
                )}{size === IconSize.Size24 && !props.filled && (
                    <IconDividerDotted24/>
                )}{size === IconSize.Size32 && !props.filled && (
                    <IconDividerDotted32/>
                )}
            </span>
        );
    }
    
    const Memo = memo(IconDividerDotted);
    export default Memo;
    