
    import React, { memo } from "react";
    import { GeneratedIconProps } from "@foundation/Icon/IconProps";
    import { IconSize } from "@foundation/Icon/IconSize";

    import IconBasketball12 from './IconBasketball12';import IconBasketball16 from './IconBasketball16';import IconBasketball20 from './IconBasketball20';import IconBasketball24 from './IconBasketball24';import IconBasketball32 from './IconBasketball32'
    
    function IconBasketball(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
        const size = props.size || IconSize.Size16;
        return (
            <span>
                {size === IconSize.Size12 && !props.filled && (
                    <IconBasketball12/>
                )}{size === IconSize.Size16 && !props.filled && (
                    <IconBasketball16/>
                )}{size === IconSize.Size20 && !props.filled && (
                    <IconBasketball20/>
                )}{size === IconSize.Size24 && !props.filled && (
                    <IconBasketball24/>
                )}{size === IconSize.Size32 && !props.filled && (
                    <IconBasketball32/>
                )}
            </span>
        );
    }
    
    const Memo = memo(IconBasketball);
    export default Memo;
    