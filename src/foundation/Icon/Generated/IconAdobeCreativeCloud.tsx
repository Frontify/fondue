
    import React, { memo } from "react";
    import { GeneratedIconProps } from "@foundation/Icon/IconProps";
    import { IconSize } from "@foundation/Icon/IconSize";

    import IconAdobeCreativeCloud12 from './IconAdobeCreativeCloud12';import IconAdobeCreativeCloud16 from './IconAdobeCreativeCloud16';import IconAdobeCreativeCloud20 from './IconAdobeCreativeCloud20';import IconAdobeCreativeCloud24 from './IconAdobeCreativeCloud24';import IconAdobeCreativeCloud32 from './IconAdobeCreativeCloud32'
    
    function IconAdobeCreativeCloud(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
        const size = props.size || IconSize.Size16;
        return (
            <span>
                {size === IconSize.Size12 && !props.filled && (
                    <IconAdobeCreativeCloud12/>
                )}{size === IconSize.Size16 && !props.filled && (
                    <IconAdobeCreativeCloud16/>
                )}{size === IconSize.Size20 && !props.filled && (
                    <IconAdobeCreativeCloud20/>
                )}{size === IconSize.Size24 && !props.filled && (
                    <IconAdobeCreativeCloud24/>
                )}{size === IconSize.Size32 && !props.filled && (
                    <IconAdobeCreativeCloud32/>
                )}
            </span>
        );
    }
    
    const Memo = memo(IconAdobeCreativeCloud);
    export default Memo;
    