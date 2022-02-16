
    import React, { memo } from "react";
    import { GeneratedIconProps } from "@foundation/Icon/IconProps";
    import { IconSize } from "@foundation/Icon/IconSize";

    import IconImageWithText12 from './IconImageWithText12';import IconImageWithText16 from './IconImageWithText16';import IconImageWithText20 from './IconImageWithText20';import IconImageWithText24 from './IconImageWithText24';import IconImageWithText32 from './IconImageWithText32'
    
    function IconImageWithText(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
        const size = props.size || IconSize.Size16;
        return (
            <span>
                {size === IconSize.Size12 && !props.filled && (
                    <IconImageWithText12/>
                )}{size === IconSize.Size16 && !props.filled && (
                    <IconImageWithText16/>
                )}{size === IconSize.Size20 && !props.filled && (
                    <IconImageWithText20/>
                )}{size === IconSize.Size24 && !props.filled && (
                    <IconImageWithText24/>
                )}{size === IconSize.Size32 && !props.filled && (
                    <IconImageWithText32/>
                )}
            </span>
        );
    }
    
    const Memo = memo(IconImageWithText);
    export default Memo;
    