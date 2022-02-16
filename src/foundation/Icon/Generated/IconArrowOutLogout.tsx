
    import React, { memo } from "react";
    import { GeneratedIconProps } from "@foundation/Icon/IconProps";
    import { IconSize } from "@foundation/Icon/IconSize";

    import IconArrowOutLogout12 from './IconArrowOutLogout12';import IconArrowOutLogout16 from './IconArrowOutLogout16';import IconArrowOutLogout20 from './IconArrowOutLogout20';import IconArrowOutLogout24 from './IconArrowOutLogout24';import IconArrowOutLogout32 from './IconArrowOutLogout32'
    
    function IconArrowOutLogout(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
        const size = props.size || IconSize.Size16;
        return (
            <span>
                {size === IconSize.Size12 && !props.filled && (
                    <IconArrowOutLogout12/>
                )}{size === IconSize.Size16 && !props.filled && (
                    <IconArrowOutLogout16/>
                )}{size === IconSize.Size20 && !props.filled && (
                    <IconArrowOutLogout20/>
                )}{size === IconSize.Size24 && !props.filled && (
                    <IconArrowOutLogout24/>
                )}{size === IconSize.Size32 && !props.filled && (
                    <IconArrowOutLogout32/>
                )}
            </span>
        );
    }
    
    const Memo = memo(IconArrowOutLogout);
    export default Memo;
    