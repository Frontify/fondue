
    import React, { memo } from "react";
    import { GeneratedIconProps } from "@foundation/Icon/IconProps";
    import { IconSize } from "@foundation/Icon/IconSize";

    import IconLollipop12 from './IconLollipop12';import IconLollipop16 from './IconLollipop16';import IconLollipop20 from './IconLollipop20';import IconLollipop24 from './IconLollipop24';import IconLollipop32 from './IconLollipop32'
    
    function IconLollipop(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
        const size = props.size || IconSize.Size16;
        return (
            <span>
                {size === IconSize.Size12 && !props.filled && (
                    <IconLollipop12/>
                )}{size === IconSize.Size16 && !props.filled && (
                    <IconLollipop16/>
                )}{size === IconSize.Size20 && !props.filled && (
                    <IconLollipop20/>
                )}{size === IconSize.Size24 && !props.filled && (
                    <IconLollipop24/>
                )}{size === IconSize.Size32 && !props.filled && (
                    <IconLollipop32/>
                )}
            </span>
        );
    }
    
    const Memo = memo(IconLollipop);
    export default Memo;
    