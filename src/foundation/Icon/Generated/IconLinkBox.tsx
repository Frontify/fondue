
    import React, { memo } from "react";
    import { GeneratedIconProps } from "@foundation/Icon/IconProps";
    import { IconSize } from "@foundation/Icon/IconSize";

    import IconLinkBox12 from './IconLinkBox12';import IconLinkBox16 from './IconLinkBox16';import IconLinkBox20 from './IconLinkBox20';import IconLinkBox24 from './IconLinkBox24';import IconLinkBox32 from './IconLinkBox32'
    
    function IconLinkBox(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
        const size = props.size || IconSize.Size16;
        return (
            <span>
                {size === IconSize.Size12 && !props.filled && (
                    <IconLinkBox12/>
                )}{size === IconSize.Size16 && !props.filled && (
                    <IconLinkBox16/>
                )}{size === IconSize.Size20 && !props.filled && (
                    <IconLinkBox20/>
                )}{size === IconSize.Size24 && !props.filled && (
                    <IconLinkBox24/>
                )}{size === IconSize.Size32 && !props.filled && (
                    <IconLinkBox32/>
                )}
            </span>
        );
    }
    
    const Memo = memo(IconLinkBox);
    export default Memo;
    